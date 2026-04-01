"use client";

import { FormEvent, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const initialAssistantMessage: ChatMessage = {
  role: "assistant",
  content:
    "Hi, I am Tomás's Digital Twin. Ask me anything about his career journey, technical strengths, or leadership approach.",
};

const starterPrompts = [
  "What is Tomás currently working on at Backbase?",
  "How did his career evolve into AI-native developer enablement?",
  "What leadership style does he bring to engineering organisations?",
];

export function DigitalTwinChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([initialAssistantMessage]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSend = input.trim().length > 0 && !isSending;

  const visibleMessages = useMemo(
    () => messages.filter((entry) => entry.content.trim().length > 0),
    [messages],
  );

  async function sendMessage(content: string) {
    const userMessage: ChatMessage = { role: "user", content };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setError(null);
    setIsSending(true);

    try {
      const response = await fetch("/api/digital-twin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
        }),
      });

      const data = (await response.json()) as { reply?: string; error?: string };

      if (!response.ok || !data.reply) {
        throw new Error(data.error || "Unable to get a response from the digital twin.");
      }

      setMessages((current) => [...current, { role: "assistant", content: data.reply as string }]);
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "Something went wrong while contacting the digital twin.";

      setError(message);
    } finally {
      setIsSending(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isSending) {
      return;
    }

    await sendMessage(trimmed);
  }

  async function handlePromptClick(prompt: string) {
    if (isSending) {
      return;
    }
    await sendMessage(prompt);
  }

  return (
    <div className="section-card">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="section-kicker">Digital twin chat</p>
          <h3 className="mt-2 text-xl font-semibold text-zinc-100">
            Ask direct questions about my career
          </h3>
        </div>
        <span
          suppressHydrationWarning
          className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-200"
        >
          Powered by Google Gemini
        </span>
      </div>

      <div className="mt-5 grid gap-2 md:grid-cols-3">
        {starterPrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => void handlePromptClick(prompt)}
            className="rounded-xl border border-zinc-700 bg-zinc-900/70 px-3 py-2 text-left text-xs text-zinc-200 transition hover:border-cyan-300/40 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isSending}
          >
            {prompt}
          </button>
        ))}
      </div>

      <div className="mt-5 max-h-[420px] space-y-3 overflow-y-auto rounded-2xl border border-zinc-700/70 bg-zinc-950/80 p-4">
        {visibleMessages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              message.role === "user"
                ? "ml-auto border border-cyan-300/40 bg-cyan-400/15 text-cyan-100"
                : "border border-zinc-700 bg-zinc-900/80 text-zinc-200"
            }`}
          >
            {message.role === "assistant" ? (
              <div className="markdown-answer">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {message.content}
                </ReactMarkdown>
              </div>
            ) : (
              message.content
            )}
          </div>
        ))}
        {isSending && (
          <div className="max-w-[92%] rounded-2xl border border-zinc-700 bg-zinc-900/70 px-4 py-3 text-sm text-zinc-300">
            Thinking...
          </div>
        )}
      </div>

      <form className="mt-5 flex flex-col gap-3" onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          rows={3}
          placeholder="Ask about career milestones, AI strategy, leadership style, or technical depth..."
          className="w-full resize-none rounded-xl border border-zinc-700/80 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-cyan-300/60"
        />
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-zinc-400">
            Model: <span suppressHydrationWarning className="font-mono">gemini-2.5-flash</span>
          </p>
          <button className="cta-primary disabled:cursor-not-allowed disabled:opacity-50" type="submit" disabled={!canSend}>
            {isSending ? "Sending..." : "Send"}
          </button>
        </div>
      </form>

      {error && <p className="mt-3 text-sm text-rose-300">{error}</p>}
    </div>
  );
}
