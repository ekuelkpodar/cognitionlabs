import { experiments } from "@/data/mock";

export default function ExperimentsPage() {
  return (
    <div className="space-y-4">
      <div>
        <div className="text-sm text-slate-400">Compare runs, track metrics, link lineage.</div>
        <div className="text-2xl font-semibold">Experiments</div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {experiments.map((exp) => (
          <div key={exp.name} className="rounded-2xl border border-white/5 bg-white/5 p-4 space-y-2">
            <div className="text-lg font-semibold">{exp.name}</div>
            <div className="text-sm text-slate-300">Runs: {exp.runs}</div>
            <div className="text-sm text-emerald-200">Best: {exp.bestMetric}</div>
            <button className="rounded-lg bg-white/10 px-3 py-2 text-xs">View runs</button>
          </div>
        ))}
      </div>
    </div>
  );
}
