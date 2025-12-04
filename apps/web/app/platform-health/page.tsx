"use client";

import useSWR from "swr";
import { apiFetch } from "@/lib/client";

export default function PlatformHealthPage() {
  const { data, error } = useSWR("/api/observability", (url) => apiFetch<{ endpointCounts: number; recentLogs: any[] }>(url));
  if (error) return <div className="text-red-300">Failed to load</div>;
  return (
    <div className="space-y-4">
      <div>
        <div className="text-sm text-slate-400">Self-healing & alerts overview.</div>
        <div className="text-2xl font-semibold">Platform Health</div>
      </div>
      <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
        <div className="text-lg font-semibold">Endpoints</div>
        <div className="text-3xl font-semibold">{data?.endpointCounts ?? 0}</div>
      </div>
      <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
        <div className="text-lg font-semibold">Recent Errors (sample)</div>
        <div className="text-xs text-slate-300">Extend to platform alerts & stuck jobs (TODO)</div>
      </div>
    </div>
  );
}
