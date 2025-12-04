export default function CopilotsPage() {
  return (
    <div className="space-y-4">
      <div>
        <div className="text-sm text-slate-400">Internal assistants that draft datasets, pipelines, and explanations.</div>
        <div className="text-2xl font-semibold">Copilots</div>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-white/5 bg-white/5 p-4 space-y-2">
          <div className="text-lg font-semibold">Data Copilot</div>
          <div className="text-sm text-slate-300">Suggest datasets, SQL, and feature schemas from a goal.</div>
          <button className="rounded-lg bg-brand-500 px-3 py-2 text-xs">Ask</button>
        </div>
        <div className="rounded-2xl border border-white/5 bg-white/5 p-4 space-y-2">
          <div className="text-lg font-semibold">Pipeline Copilot</div>
          <div className="text-sm text-slate-300">Generate DAG steps for a problem type.</div>
          <button className="rounded-lg bg-brand-500 px-3 py-2 text-xs">Draft pipeline</button>
        </div>
        <div className="rounded-2xl border border-white/5 bg-white/5 p-4 space-y-2">
          <div className="text-lg font-semibold">Explainability Copilot</div>
          <div className="text-sm text-slate-300">Summarize drift/metrics and propose actions.</div>
          <button className="rounded-lg bg-brand-500 px-3 py-2 text-xs">Explain</button>
        </div>
      </div>
    </div>
  );
}
