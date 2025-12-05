"use client";

import useSWR from "swr";
import { apiFetch } from "@/lib/client";

export default function WebhooksPage() {
  const { data, error, mutate } = useSWR("/api/webhooks", (url) => apiFetch<{ webhooks: any[] }>(url));
  if (error) return <div className="text-red-300">Failed to load webhooks</div>;
  const hooks = data?.webhooks ?? [];
  return (
    <div className="space-y-4">
      <div className="text-2xl font-semibold">Webhooks</div>
      <div className="rounded-2xl border border-white/5 bg-white/5 p-4 space-y-2">
        {hooks.map((h) => (
          <div key={h.id} className="border-b border-white/10 pb-2">
            <div className="font-semibold">{h.url}</div>
            <div className="text-xs text-slate-400">Events: {(h.eventTypes || []).join(", ")}</div>
          </div>
        ))}
        {hooks.length === 0 && <div className="text-xs text-slate-400">No webhooks yet</div>}
      </div>
    </div>
  );
}
