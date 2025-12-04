import { datasets } from "@/data/mock";

export default function DatasetsPage() {
  return (
    <div className="space-y-4">
      <div>
        <div className="text-sm text-slate-400">Prepared datasets with lineage and refresh.</div>
        <div className="text-2xl font-semibold">Datasets</div>
      </div>
      <div className="rounded-2xl border border-white/5 bg-white/5 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-slate-300">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Source</th>
              <th className="px-4 py-2 text-left">Last refresh</th>
              <th className="px-4 py-2 text-left">Rows</th>
            </tr>
          </thead>
          <tbody>
            {datasets.map((ds) => (
              <tr key={ds.name} className="border-t border-white/5">
                <td className="px-4 py-2 font-medium">{ds.name}</td>
                <td className="px-4 py-2 text-slate-300">{ds.source}</td>
                <td className="px-4 py-2 text-slate-400">{ds.lastRefresh}</td>
                <td className="px-4 py-2 text-slate-300">{ds.rows}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
