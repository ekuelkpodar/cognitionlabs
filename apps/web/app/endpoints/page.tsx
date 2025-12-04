import { endpoints } from "@/data/mock";

export default function EndpointsPage() {
  return (
    <div className="space-y-3">
      <div>
        <div className="text-sm text-slate-400">Deploy APIs with champion/challenger splits.</div>
        <div className="text-2xl font-semibold">Endpoints</div>
      </div>
      <div className="rounded-2xl border border-white/5 bg-white/5 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-slate-300">
            <tr>
              <th className="px-4 py-2 text-left">Endpoint</th>
              <th className="px-4 py-2 text-left">Traffic</th>
              <th className="px-4 py-2 text-left">Latency</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {endpoints.map((ep) => (
              <tr key={ep.name} className="border-t border-white/5">
                <td className="px-4 py-2 font-medium">{ep.name}</td>
                <td className="px-4 py-2 text-slate-300">{ep.traffic}</td>
                <td className="px-4 py-2 text-slate-300">{ep.latency}</td>
                <td className="px-4 py-2 text-emerald-200">{ep.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
