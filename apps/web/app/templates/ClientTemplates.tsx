"use client";

import useSWR from "swr";
import { apiFetch } from "@/lib/client";

export function ClientTemplates() {
  const { data, error } = useSWR("/api/templates", (url) => apiFetch<{ templates: any[] }>(url));
  if (error) return <div className="text-red-300">Failed to load templates</div>;
  const templates = data?.templates ?? [];
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {templates.map((t) => (
        <div key={t.id} className="rounded-2xl border border-white/5 bg-white/5 p-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">{t.name}</div>
            <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-slate-300">{t.type}</span>
          </div>
          <div className="text-sm text-slate-300 leading-snug">{t.description}</div>
        </div>
      ))}
    </div>
  );
}
