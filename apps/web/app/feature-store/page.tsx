import { featureTables } from "@/data/mock";

export default function FeatureStorePage() {
  return (
    <div className="space-y-4">
      <div>
        <div className="text-sm text-slate-400">Offline + online features ready for serving.</div>
        <div className="text-2xl font-semibold">Feature Store</div>
      </div>
      <div className="rounded-2xl border border-white/5 bg-white/5 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-slate-300">
            <tr>
              <th className="px-4 py-2 text-left">Table</th>
              <th className="px-4 py-2 text-left">Keys</th>
              <th className="px-4 py-2 text-left">Features</th>
              <th className="px-4 py-2 text-left">Updated</th>
            </tr>
          </thead>
          <tbody>
            {featureTables.map((table) => (
              <tr key={table.name} className="border-t border-white/5">
                <td className="px-4 py-2 font-medium">{table.name}</td>
                <td className="px-4 py-2 text-slate-300">{table.keys}</td>
                <td className="px-4 py-2 text-slate-400">{table.features}</td>
                <td className="px-4 py-2 text-slate-400">{table.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
