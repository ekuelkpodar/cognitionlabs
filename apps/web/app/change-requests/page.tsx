"use client";

import useSWR from "swr";
import { apiFetch } from "@/lib/client";

export default function ChangeRequestsPage() {
  const { data, error } = useSWR("/api/change-requests", (url) => apiFetch<{ changeRequests: any[] }>(url));
  if (error) return <div className="text-red-300">Failed to load change requests</div>;
  const items = data?.changeRequests ?? [];
  return (
    <div className="space-y-4">
      <div>
        <div className="text-sm text-slate-400">Approvals and change management.</div>
        <div className="text-2xl font-semibold">Change Requests</div>
      </div>
      <div className="rounded-2xl border border-white/5 bg-white/5 p-4 space-y-2">
        {items.map((cr) => (
          <div key={cr.id} className="border-b border-white/5 pb-2">
            <div className="font-semibold text-slate-200">{cr.type}</div>
            <div className="text-xs text-slate-400">Status: {cr.status}</div>
          </div>
        ))}
        {items.length === 0 && <div className="text-xs text-slate-400">No pending requests</div>}
      </div>
    </div>
  );
}
