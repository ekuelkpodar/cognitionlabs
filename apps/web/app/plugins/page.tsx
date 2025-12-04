"use client";

import useSWR from "swr";
import { apiFetch } from "@/lib/client";

export default function PluginsPage() {
  const { data, error, mutate } = useSWR("/api/plugins", (url) => apiFetch<{ plugins: any[] }>(url));
  if (error) return <div className="text-red-300">Failed to load plugins</div>;
  const plugins = data?.plugins ?? [];

  return (
    <div className="space-y-4">
      <div>
        <div className="text-sm text-slate-400">Extend workflows, endpoints, and agents with remote plugins.</div>
        <div className="text-2xl font-semibold">Plugins</div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {plugins.map((p) => (
          <div key={p.id} className="rounded-2xl border border-white/5 bg-white/5 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">{p.name}</div>
              <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-slate-300">{p.type}</span>
            </div>
            <div className="text-sm text-slate-300">{p.description}</div>
            <div className="text-xs text-slate-400">Location: {p.codeLocation || "remote"}</div>
          </div>
        ))}
        <button
          className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-4 text-left text-sm text-slate-300 hover:border-white/30"
          onClick={async () => {
            await apiFetch("/api/plugins", {
              method: "POST",
              body: JSON.stringify({ type: "WORKFLOW_NODE", name: "HTTP node", description: "Call HTTP", codeLocation: "https://example.com/plugin" })
            });
            mutate();
          }}
        >
          + Register plugin
        </button>
      </div>
    </div>
  );
}
