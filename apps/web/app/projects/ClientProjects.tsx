"use client";

import useSWR from "swr";
import { apiFetch } from "@/lib/client";

export function ClientProjects() {
  const { data, error, mutate } = useSWR("/api/projects", (url) => apiFetch<{ projects: any[] }>(url));

  if (error) return <div className="text-red-300">Failed to load projects</div>;
  const projects = data?.projects ?? [];

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {projects.map((p) => (
        <div key={p.id} className="rounded-2xl border border-white/5 bg-white/5 p-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">{p.name}</div>
            <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-slate-300">{p.status}</span>
          </div>
          <div className="text-sm text-slate-300">Slug: {p.slug}</div>
          <div className="text-xs text-slate-400">Updated: {new Date(p.updatedAt).toLocaleString()}</div>
        </div>
      ))}
      <button
        className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-4 text-left text-sm text-slate-300 hover:border-white/30"
        onClick={async () => {
          await apiFetch("/api/projects", {
            method: "POST",
            body: JSON.stringify({ name: "New Project", slug: `proj-${Date.now()}` })
          });
          mutate();
        }}
      >
        + Create project
      </button>
    </div>
  );
}
