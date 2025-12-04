"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/client";

export function BlockConfigPanel({ block }: { block: any }) {
  const [title, setTitle] = useState(block?.title ?? "");
  const [config, setConfig] = useState(() => JSON.stringify(block?.config ?? {}, null, 2));
  if (!block) return <div className="text-xs text-slate-400">Select a block</div>;
  return (
    <div className="rounded-2xl border border-white/5 bg-white/5 p-3 space-y-2">
      <div className="text-sm font-semibold">Block Config</div>
      <input className="w-full rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-sm" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea className="w-full h-40 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs" value={config} onChange={(e) => setConfig(e.target.value)} />
      <button
        className="rounded-lg bg-brand-500 px-3 py-2 text-xs"
        onClick={async () => {
          await apiFetch(`/api/ai-blocks`, {
            method: "POST",
            body: JSON.stringify({ ...block, title, config: JSON.parse(config) })
          });
        }}
      >
        Save
      </button>
      <div className="text-xs text-slate-400">TODO: AI suggestions via UiCopilotService</div>
    </div>
  );
}
