"use client";

import useSWR from "swr";
import { apiFetch } from "@/lib/client";

export default function DataPoliciesPage() {
  const { data, error, mutate } = useSWR("/api/data-policies", (url) => apiFetch<{ policies: any[] }>(url));
  if (error) return <div className="text-red-300">Failed to load policies</div>;
  const policies = data?.policies ?? [];

  return (
    <div className="space-y-4">
      <div>
        <div className="text-sm text-slate-400">Restrict access to sensitive datasets and KBs.</div>
        <div className="text-2xl font-semibold">Data Policies</div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {policies.map((p) => (
          <div key={p.id} className="rounded-2xl border border-white/5 bg-white/5 p-4 space-y-2">
            <div className="text-lg font-semibold">{p.name}</div>
            <div className="text-sm text-slate-300">{p.description}</div>
            <div className="text-xs text-slate-400">Applies to: {p.appliesTo}</div>
          </div>
        ))}
        <button
          className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-4 text-left text-sm text-slate-300 hover:border-white/30"
          onClick={async () => {
            await apiFetch("/api/data-policies", {
              method: "POST",
              body: JSON.stringify({ name: "Restricted dataset", appliesTo: "Dataset", description: "Only admins", rules: { allowedRoles: ["canManageProjects"] } })
            });
            mutate();
          }}
        >
          + Add data policy
        </button>
      </div>
    </div>
  );
}
