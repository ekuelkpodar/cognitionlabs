"use client";

import useSWR from "swr";
import { apiFetch } from "@/lib/client";

export default function ModerationPage() {
  const { data, error } = useSWR("/api/moderation", (url) => apiFetch<{ reports: any[] }>(url));
  if (error) return <div className="text-red-300">Failed to load reports</div>;
  const reports = data?.reports ?? [];
  return (
    <div className="space-y-3">
      <div className="text-sm text-slate-400">Review abuse reports and take actions.</div>
      <div className="text-2xl font-semibold">Moderation</div>
      <div className="rounded-2xl border border-white/5 bg-white/5 p-4 space-y-2 max-h-96 overflow-auto text-sm">
        {reports.map((r) => (
          <div key={r.id} className="border-b border-white/10 pb-2">
            <div className="font-semibold">{r.subjectType}</div>
            <div className="text-xs text-slate-400">Reason: {r.reason}</div>
            <div className="text-xs text-slate-400">Status: {r.status}</div>
          </div>
        ))}
        {reports.length === 0 && <div className="text-xs text-slate-400">No reports</div>}
      </div>
    </div>
  );
}
