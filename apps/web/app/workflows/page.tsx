import { workflows } from "@/data/mock";

export default function WorkflowsPage() {
  return (
    <div className="space-y-3">
      <div>
        <div className="text-sm text-slate-400">Orchestrate ingestion, training, evaluation, and deploys.</div>
        <div className="text-2xl font-semibold">Workflows</div>
      </div>
      <div className="rounded-2xl border border-white/5 bg-white/5 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-slate-300">
            <tr>
              <th className="px-4 py-2 text-left">Workflow</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Last run</th>
            </tr>
          </thead>
          <tbody>
            {workflows.map((wf) => (
              <tr key={wf.name} className="border-t border-white/5">
                <td className="px-4 py-2 font-medium">{wf.name}</td>
                <td className="px-4 py-2 text-emerald-200">{wf.status}</td>
                <td className="px-4 py-2 text-slate-300">{wf.lastRun}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
