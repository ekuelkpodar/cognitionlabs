import { models } from "@/data/mock";

export default function ModelsPage() {
  return (
    <div className="space-y-3">
      <div>
        <div className="text-sm text-slate-400">LLMs and structured ML with versioned registry.</div>
        <div className="text-2xl font-semibold">Models</div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {models.map((model) => (
          <div key={model.name} className="rounded-2xl border border-white/5 bg-white/5 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">{model.name}</div>
              <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-slate-300">{model.type}</span>
            </div>
            <div className="text-sm text-slate-300">Prod: {model.prod}</div>
            <div className="text-sm text-slate-300">Metric: {model.metric}</div>
            <button className="rounded-lg bg-white/10 px-3 py-2 text-xs">View versions</button>
          </div>
        ))}
      </div>
    </div>
  );
}
