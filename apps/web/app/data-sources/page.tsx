import { dataSources } from "@/data/mock";

export default function DataSourcesPage() {
  return (
    <div className="space-y-4">
      <div>
        <div className="text-sm text-slate-400">Pipelines start with trusted connections.</div>
        <div className="text-2xl font-semibold">Data Sources</div>
      </div>
      <div className="rounded-2xl border border-white/5 bg-white/5 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-slate-300">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Last sync</th>
            </tr>
          </thead>
          <tbody>
            {dataSources.map((ds) => (
              <tr key={ds.name} className="border-t border-white/5">
                <td className="px-4 py-2 font-medium">{ds.name}</td>
                <td className="px-4 py-2 text-slate-300">{ds.type}</td>
                <td className="px-4 py-2 text-emerald-200">{ds.status}</td>
                <td className="px-4 py-2 text-slate-400">{ds.lastSync}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
