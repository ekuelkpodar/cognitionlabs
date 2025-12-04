"use client";

import useSWR from "swr";
import { apiFetch } from "@/lib/client";

export function ClientGuardrails() {
  const { data, error, mutate } = useSWR("/api/guardrails", (url) => apiFetch<{ guardrails: any[] }>(url));

  if (error) return <div className="text-red-300">Failed to load guardrails</div>;
  const guardrails = data?.guardrails ?? [];

  return (
    <div className="space-y-3">
      <div className="grid gap-3 md:grid-cols-2">
        {guardrails.map((g) => (
          <div key={g.id} className="rounded-2xl border border-white/5 bg-white/5 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">{g.name}</div>
              <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-slate-300">{g.policyType}</span>
            </div>
            <div className="text-xs text-slate-400">Created {new Date(g.createdAt).toLocaleString()}</div>
          </div>
        ))}
      </div>
      <button
        className="rounded-lg bg-brand-500 px-3 py-2 text-xs"
        onClick={async () => {
          await apiFetch("/api/guardrails", {
            method: "POST",
            body: JSON.stringify({ name: "Content filter", policyType: "CONTENT_FILTER", config: { blockAll: false } })
          });
          mutate();
        }}
      >
        + Add guardrail
      </button>
    </div>
  );
}
