import { ArrowRight, Bot, Cloud, Database, Rocket } from "lucide-react";

const cards = [
  {
    title: "Connect data",
    description: "Upload CSVs, connect Postgres, Snowflake, or S3.",
    icon: Database,
    cta: "Add data source"
  },
  {
    title: "Build an agent",
    description: "Wire a system prompt, attach knowledge base and tools.",
    icon: Bot,
    cta: "Create agent"
  },
  {
    title: "Deploy endpoint",
    description: "Ship a champion/challenger model behind an API.",
    icon: Cloud,
    cta: "Publish endpoint"
  },
  {
    title: "Start a workflow",
    description: "DAG of ingestion, training, evaluations, and deploys.",
    icon: Rocket,
    cta: "New workflow"
  }
];

export function QuickActions() {
  return (
    <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-white/5 to-white/0 p-4 space-y-3">
      <div>
        <div className="text-sm text-slate-400">Get moving fast</div>
        <div className="text-lg font-semibold text-white">Quick actions</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {cards.map((card) => (
          <button
            key={card.title}
            className="group flex items-start gap-3 rounded-xl border border-white/5 bg-white/5 p-3 text-left hover:border-white/20"
          >
            <div className="rounded-lg bg-white/10 p-2 text-brand-100">
              <card.icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-white">{card.title}</div>
              <div className="text-xs text-slate-400 leading-snug">{card.description}</div>
              <div className="mt-1 inline-flex items-center gap-1 text-xs text-brand-100">
                {card.cta} <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
