"use client";

import useSWR from "swr";
import { apiFetch } from "@/lib/client";

export default function ObservabilityPage() {
  const { data, error } = useSWR("/api/observability", (url) => apiFetch<{ endpointCounts: number; recentLogs: any[] }>(url));
  if (error) return <div className="text-red-300">Failed to load observability</div>;
  const logs = data?.recentLogs ?? [];
  return (
    <div className="space-y-4">
      <div>
        <div className="text-sm text-slate-400">Operational metrics and recent inference logs.</div>
        <div className="text-2xl font-semibold">Observability</div>
      </div>
      <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
        <div className="text-lg font-semibold">Endpoints</div>
        <div className="text-3xl font-semibold">{data?.endpointCounts ?? 0}</div>
      </div>
      <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
        <div className="text-lg font-semibold mb-2">Recent Logs</div>
        <div className="max-h-80 overflow-auto text-sm">
          <table className="w-full">
            <thead className="text-slate-300">
              <tr>
                <th className="text-left">Endpoint</th>
                <th className="text-left">Status</th>
                <th className="text-left">Latency</th>
                <th className="text-left">At</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((l) => (
                <tr key={l.id} className="border-t border-white/5">
                  <td className="py-1">{l.endpointId}</td>
                  <td className="py-1 text-slate-300">{l.statusCode}</td>
                  <td className="py-1 text-slate-300">{l.latencyMs} ms</td>
                  <td className="py-1 text-slate-400">{new Date(l.createdAt).toLocaleTimeString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
