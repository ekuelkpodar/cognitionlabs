"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/client";

export function NotebookCell({ block }: { block: any }) {
  const [content, setContent] = useState(block?.config?.content ?? "");
  const [output, setOutput] = useState<any>(null);
  return (
    <div className="space-y-2">
      <textarea className="w-full rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs" value={content} onChange={(e) => setContent(e.target.value)} />
      <button
        className="rounded-lg bg-white/10 px-3 py-1 text-xs"
        onClick={async () => {
          const res = await apiFetch(`/api/notebook-run`, { method: "POST", body: JSON.stringify({ aiBlockId: block.id, content, inputSnapshot: { content } }) });
          setOutput(res.run?.outputSnapshot);
        }}
      >
        Run
      </button>
      {output && <pre className="text-xs bg-black/30 p-2 rounded-lg overflow-auto">{JSON.stringify(output, null, 2)}</pre>}
    </div>
  );
}
