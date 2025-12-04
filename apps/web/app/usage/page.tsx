import useSWR from "swr";
import { apiFetch } from "@/lib/client";

export default function UsagePage() {
  const { data, error } = useSWR("/api/usage", (url) => apiFetch<{ metrics: any[] }>(url));
  if (error) return <div className="text-red-300">Failed to load usage</div>;
  const metrics = data?.metrics ?? [];
  return (
    <div className="space-y-4">
      <div>
        <div className="text-sm text-slate-400">Track tokens, requests, and budget guardrails.</div>
        <div className="text-2xl font-semibold">Usage & Cost</div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {metrics.map((m) => (
          <div key={m.id} className="rounded-2xl border border-white/5 bg-white/5 p-4 space-y-2">
            <div className="text-lg font-semibold">{m.metricName}</div>
            <div className="text-2xl font-semibold">{m.value.toLocaleString()}</div>
            <div className="text-sm text-slate-300">
              {new Date(m.periodStart).toLocaleDateString()} → {new Date(m.periodEnd).toLocaleDateString()}
            </div>
          </div>
        ))}
        {metrics.length === 0 && <div className="text-sm text-slate-400">No usage yet</div>}
      </div>
    </div>
  );
}
