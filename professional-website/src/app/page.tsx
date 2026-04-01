import { DigitalTwinChat } from "@/components/DigitalTwinChat";

const careerJourney = [
  {
    period: "2023 - Present",
    role: "Principal Engineer (Frontend & AI - Developer Enablement)",
    company: "Backbase",
    location: "Amsterdam / Remote",
    highlights: [
      "Architected the AI Judge service that pushed API documentation coverage from 34% to 100%.",
      "Designed RAG-backed support systems and agentic tooling used as internal foundations for AI workflows.",
      "Acts as a formal senior-to-staff technical endorser through evidence-based promotion evaluations.",
    ],
  },
  {
    period: "2020 - 2023",
    role: "Product Manager (Web Foundation)",
    company: "Backbase",
    location: "Amsterdam / Remote",
    highlights: [
      "Led the Web Foundation as a product, balancing platform stability with banking business outcomes.",
      "Aligned architecture and priorities across global stakeholders and engineering teams.",
    ],
  },
  {
    period: "2018 - 2020",
    role: "Senior Frontend Engineer",
    company: "Backbase",
    location: "Amsterdam / Remote",
    highlights: [
      "Set core frontend architecture patterns that became the blueprint for hundreds of banking squads.",
    ],
  },
  {
    period: "2017 - 2018",
    role: "Lead Frontend Developer (Internal Platforms)",
    company: "ING",
    location: "Amsterdam",
    highlights: [
      "Directed migration of card-management tools from internal employee systems to secure customer self-service.",
    ],
  },
  {
    period: "2015 - 2017",
    role: "Senior Frontend Consultant and Trainer",
    company: "Backbase",
    location: "Amsterdam",
    highlights: [
      "Created Backbase Academy from scratch to accelerate partner and customer engineering capability.",
    ],
  },
  {
    period: "2010 - 2015",
    role: "Lead Javascript Architect",
    company: "Softonic",
    location: "Barcelona",
    highlights: [
      "Introduced testing standards and debt reduction programmes in a high-traffic environment.",
    ],
  },
];

const focusAreas = [
  "Developer Enablement platforms, CLIs, and migration pathways",
  "Agentic AI workflows, RAG systems, and LLM quality evaluation",
  "Architectural governance for secure multi-service banking systems",
  "Cross-team technical leadership through influence without authority",
];

const technicalStack = [
  "JavaScript",
  "TypeScript",
  "Node.js",
  "Python",
  "OpenAI",
  "Claude",
  "PromptFoo",
  "DeepEval",
  "Vector Databases",
  "GitHub Actions",
];

const communityWork = [
  "Active contributor to Compodoc for Angular and NestJS documentation tooling.",
  "Creator of Koyote.js and Hydra.js for high-performance web architecture foundations.",
  "Frequent conference speaker on AI-native engineering and frontend architecture.",
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#06070b] text-zinc-100">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_12%,rgba(0,117,255,0.33),transparent_42%),radial-gradient(circle_at_78%_18%,rgba(148,57,255,0.26),transparent_34%),radial-gradient(circle_at_52%_74%,rgba(10,186,181,0.18),transparent_44%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:82px_82px] opacity-[0.19]" />

      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8 md:px-10">
        <div className="inline-flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl border border-zinc-700/80 bg-zinc-900/75 text-sm font-semibold tracking-wider">
            TC
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-zinc-400">Professional profile</p>
            <p className="text-sm font-medium text-zinc-200">Tomás Corral</p>
          </div>
        </div>
        <nav className="hidden gap-6 text-sm text-zinc-300 md:flex">
          <a className="nav-link" href="#about">
            About
          </a>
          <a className="nav-link" href="#journey">
            Journey
          </a>
          <a className="nav-link" href="#digital-twin">
            Digital Twin
          </a>
          <a className="nav-link" href="#connect">
            Connect
          </a>
        </nav>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 pb-20 pt-6 md:px-10">
        <section className="relative overflow-hidden rounded-3xl border border-zinc-700/70 bg-zinc-950/65 p-8 shadow-[0_30px_90px_rgba(5,10,25,0.48)] backdrop-blur md:p-12">
          <div className="animated-orb pointer-events-none absolute -top-14 right-10 h-52 w-52 rounded-full bg-cyan-400/14 blur-3xl" />
          <div className="animated-orb animation-delay pointer-events-none absolute -bottom-20 -left-8 h-56 w-56 rounded-full bg-violet-400/14 blur-3xl" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(0,153,255,0.20),transparent_42%),radial-gradient(circle_at_5%_90%,rgba(146,40,255,0.24),transparent_40%)]" />
          <p className="mb-4 inline-flex rounded-full border border-cyan-300/35 bg-cyan-400/10 px-4 py-1 text-xs uppercase tracking-[0.23em] text-cyan-200">
            Technical leadership for AI-first engineering
          </p>
          <h1 className="max-w-4xl text-4xl leading-tight font-semibold tracking-tight text-white md:text-6xl">
            Staff engineer shaping AI-native developer platforms for modern banking.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-zinc-300 md:text-lg">
            Technical authority with 20+ years of experience across architecture, product, and developer enablement.
            From high-traffic systems to AI-first engineering workflows, the focus stays consistent: helping teams
            deliver reliable complex software with speed and precision.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a className="cta-primary" href="https://www.linkedin.com/in/tomascorral" target="_blank" rel="noopener noreferrer">
              View LinkedIn
            </a>
            <a className="cta-secondary" href="mailto:tomas.corral.casas@gmail.com">
              Contact by Email
            </a>
            <a className="cta-secondary" href="https://github.com/tcorral" target="_blank" rel="noopener noreferrer">
              Explore GitHub
            </a>
          </div>
        </section>

        <section id="about" className="grid gap-7 md:grid-cols-[1.2fr_1fr]">
          <article className="section-card">
            <p className="section-kicker">About me</p>
            <h2 className="section-title">Influence without authority, delivered through systems.</h2>
            <p className="section-copy">
              I specialise in platforms that scale the effectiveness of engineering organisations. At Backbase, that
              means architecting internal foundations, AI orchestration services, and quality gates that increase output
              while reducing delivery volatility.
            </p>
            <p className="section-copy">
              My role often sits between deep technical execution and strategic decision-making: part principal engineer,
              part product thinker, always focused on practical outcomes teams can feel in their day-to-day delivery.
            </p>
          </article>

          <article className="section-card">
            <p className="section-kicker">Technical stack</p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {technicalStack.map((item) => (
                <span key={item} className="stack-pill">
                  {item}
                </span>
              ))}
            </div>
          </article>
        </section>

        <section id="journey" className="space-y-6">
          <div>
            <p className="section-kicker">Career journey</p>
            <h2 className="section-title max-w-3xl">From architecture-heavy frontend roots to AI-first engineering leadership.</h2>
          </div>
          <div className="space-y-5">
            {careerJourney.map((entry) => (
              <article key={`${entry.period}-${entry.role}`} className="timeline-card">
                <div className="timeline-meta">
                  <p className="text-xs tracking-[0.23em] text-zinc-400 uppercase">{entry.period}</p>
                  <p className="mt-1 text-sm text-zinc-300">{entry.company}</p>
                  <p className="text-xs text-zinc-500">{entry.location}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-zinc-100">{entry.role}</h3>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-300">
                    {entry.highlights.map((point) => (
                      <li key={point} className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-cyan-300">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <article className="section-card">
            <p className="section-kicker">Core expertise</p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-300">
              {focusAreas.map((area) => (
                <li key={area} className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-violet-300">
                  {area}
                </li>
              ))}
            </ul>
          </article>

          <article className="section-card">
            <p className="section-kicker">Open source and community</p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-300">
              {communityWork.map((item) => (
                <li key={item} className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-emerald-300">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section id="digital-twin" className="space-y-6">
          <div>
            <p className="section-kicker">Interactive layer</p>
            <h2 className="section-title max-w-3xl">
              Talk to a digital twin trained on my professional profile.
            </h2>
            <p className="section-copy max-w-3xl">
              This chat assistant answers career questions using my CV-based profile and runs on Google Gemini.
            </p>
          </div>
          <DigitalTwinChat />
        </section>

        <section id="connect" className="section-card">
          <p className="section-kicker">Connect</p>
          <h2 className="section-title">Building AI-native engineering at scale.</h2>
          <p className="section-copy max-w-3xl">
            If you want to discuss platform architecture, AI-assisted SDLC, or leadership models for high-performing
            engineering organisations, I am open to strategic conversations.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a className="cta-primary" href="mailto:tomas.corral.casas@gmail.com">
              Start a conversation
            </a>
            <a className="cta-secondary" href="https://www.linkedin.com/in/tomascorral" target="_blank" rel="noopener noreferrer">
              Connect on LinkedIn
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
