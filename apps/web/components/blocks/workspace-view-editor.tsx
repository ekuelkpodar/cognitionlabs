"use client";

import { useState } from "react";
import { BlockConfigPanel } from "./block-config-panel";
import { NotebookCell } from "../notebook/notebook-cell";

export function WorkspaceViewEditor({ view }: { view: any }) {
  const [selected, setSelected] = useState<any>(null);
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-3 space-y-3">
        <div className="rounded-2xl border border-white/5 bg-white/5 p-3">
          <div className="text-lg font-semibold">{view.name}</div>
          <div className="text-xs text-slate-400">Layout: {view.layoutType}</div>
        </div>
        <div className="space-y-2">
          {(view.viewBlocks || []).map((vb: any) => (
            <div
              key={vb.id}
              className="rounded-xl border border-white/10 bg-white/5 p-3 cursor-pointer hover:border-white/30"
              onClick={() => setSelected(vb.aiBlock)}
            >
              <div className="font-semibold">{vb.aiBlock?.title ?? vb.id}</div>
              {vb.aiBlock?.type === "NOTEBOOK_CELL" ? <NotebookCell block={vb.aiBlock} /> : null}
              <div className="text-xs text-slate-400">Type: {vb.aiBlock?.type}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-1">
        <BlockConfigPanel block={selected} />
      </div>
    </div>
  );
}
