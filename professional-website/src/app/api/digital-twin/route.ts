import { readFileSync } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { DIGITAL_TWIN_SYSTEM_PROMPT } from "@/lib/digitalTwinProfile";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  role: ChatRole;
  content: string;
};

type GeminiRole = "user" | "model";

type GeminiMessage = {
  role: GeminiRole;
  parts: Array<{ text: string }>;
};

type GeminiSuccessResult = {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
};

type GeminiErrorResult = {
  error?: {
    message?: string;
    status?: string;
    code?: number;
  };
};

export const runtime = "nodejs";

const GEMINI_MODEL = "gemini-2.5-flash";

function getGeminiApiKey(): string | null {
  if (process.env.GEMINI_API_KEY) {
    return process.env.GEMINI_API_KEY;
  }

  try {
    const envPath = path.resolve(process.cwd(), "..", ".env");
    const envRaw = readFileSync(envPath, "utf8");
    const line = envRaw
      .split(/\r?\n/)
      .find((entry) => entry.trim().startsWith("GEMINI_API_KEY="));

    if (!line) {
      return null;
    }

    const separatorIndex = line.indexOf("=");
    if (separatorIndex === -1) {
      return null;
    }

    const value = line.slice(separatorIndex + 1).trim();
    if (!value) {
      return null;
    }

    return value.replace(/^['"]|['"]$/g, "");
  } catch {
    return null;
  }
}

function isValidMessage(candidate: unknown): candidate is ChatMessage {
  if (!candidate || typeof candidate !== "object") {
    return false;
  }

  const message = candidate as Partial<ChatMessage>;
  return (
    (message.role === "user" || message.role === "assistant") &&
    typeof message.content === "string" &&
    message.content.trim().length > 0
  );
}

function getAssistantText(content: unknown): string | null {
  if (!Array.isArray(content)) {
    return null;
  }

  const text = content
    .map((part) => {
      if (!part || typeof part !== "object") {
        return "";
      }
      const typedPart = part as { text?: string };
      if (typeof typedPart.text === "string") {
        return typedPart.text;
      }
      return "";
    })
    .join("")
    .trim();

  return text.length > 0 ? text : null;
}

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

function toGeminiMessages(messages: ChatMessage[]): GeminiMessage[] {
  return messages.map((message) => ({
    role: message.role === "assistant" ? "model" : "user",
    parts: [{ text: message.content }],
  }));
}

async function requestGemini(
  apiKey: string,
  chatHistory: ChatMessage[],
): Promise<
  | { ok: true; reply: string }
  | { ok: false; status: number; error: string }
> {
  const maxAttempts = 3;
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
  const payload = {
    systemInstruction: {
      parts: [{ text: DIGITAL_TWIN_SYSTEM_PROMPT }],
    },
    contents: toGeminiMessages(chatHistory),
    generationConfig: {
      temperature: 0.35,
      maxOutputTokens: 700,
    },
  };

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    let parsed: GeminiSuccessResult | GeminiErrorResult | null = null;

    try {
      parsed = JSON.parse(responseText) as GeminiSuccessResult | GeminiErrorResult;
    } catch {
      parsed = null;
    }

    if (response.ok) {
      const assistantText = getAssistantText(
        (parsed as GeminiSuccessResult | null)?.candidates?.[0]?.content?.parts,
      );
      if (!assistantText) {
        return {
          ok: false,
          status: 502,
          error: "Gemini returned an empty response.",
        };
      }

      return { ok: true, reply: assistantText };
    }

    const parsedError = parsed as GeminiErrorResult | null;
    const code = Number(parsedError?.error?.code ?? response.status);
    const isRateLimit = response.status === 429 || code === 429;

    if (isRateLimit && attempt < maxAttempts) {
      await wait(750 * attempt);
      continue;
    }

    const upstreamMessage = parsedError?.error?.message || responseText || "Gemini returned an unexpected error.";

    return { ok: false, status: response.status, error: upstreamMessage };
  }

  return {
    ok: false,
    status: 502,
    error: "The Gemini request failed after several retries.",
  };
}

export async function POST(request: Request) {
  const apiKey = getGeminiApiKey();

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "GEMINI_API_KEY not found. Add it to professional-website/.env.local or the parent .env file.",
      },
      { status: 500 },
    );
  }

  let body: { messages?: unknown };

  try {
    body = (await request.json()) as { messages?: unknown };
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const incomingMessages = Array.isArray(body.messages)
    ? body.messages.filter(isValidMessage).slice(-12)
    : [];

  if (incomingMessages.length === 0) {
    return NextResponse.json({ error: "At least one user message is required." }, { status: 400 });
  }

  try {
    const geminiResponse = await requestGemini(apiKey, incomingMessages);

    if (!geminiResponse.ok) {
      return NextResponse.json(
        { error: geminiResponse.error },
        { status: geminiResponse.status },
      );
    }

    return NextResponse.json({ reply: geminiResponse.reply });
  } catch {
    return NextResponse.json(
      { error: "Failed to reach Gemini. Please try again." },
      { status: 502 },
    );
  }
}
