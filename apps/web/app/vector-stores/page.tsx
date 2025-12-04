import { vectorStores } from "@/data/mock";

export default function VectorStoresPage() {
  return (
    <div className="space-y-4">
      <div>
        <div className="text-sm text-slate-400">Ground your agents with collections and embeddings.</div>
        <div className="text-2xl font-semibold">Vector Stores</div>
      </div>
      <div className="rounded-2xl border border-white/5 bg-white/5 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-slate-300">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Backend</th>
              <th className="px-4 py-2 text-left">Collections</th>
              <th className="px-4 py-2 text-left">Items</th>
            </tr>
          </thead>
          <tbody>
            {vectorStores.map((vs) => (
              <tr key={vs.name} className="border-t border-white/5">
                <td className="px-4 py-2 font-medium">{vs.name}</td>
                <td className="px-4 py-2 text-slate-300">{vs.backend}</td>
                <td className="px-4 py-2 text-slate-300">{vs.collections}</td>
                <td className="px-4 py-2 text-slate-300">{vs.items}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
