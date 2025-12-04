"use client";

import useSWR from "swr";
import { apiFetch } from "@/lib/client";
import { useState } from "react";

interface Props {
  resourceType: string;
  resourceId: string;
}

export function CommentPanel({ resourceType, resourceId }: Props) {
  const { data, mutate } = useSWR(`/api/comments?resourceType=${resourceType}&resourceId=${resourceId}`, (url) => apiFetch<{ comments: any[] }>(url));
  const [body, setBody] = useState("");
  const comments = data?.comments ?? [];
  return (
    <div className="rounded-2xl border border-white/5 bg-white/5 p-3 space-y-2">
      <div className="text-sm font-semibold">Comments</div>
      <div className="space-y-2 max-h-64 overflow-auto">
        {comments.map((c) => (
          <div key={c.id} className="text-sm text-slate-200">
            <span className="font-semibold">{c.authorId}</span>: {c.body}
          </div>
        ))}
        {comments.length === 0 && <div className="text-xs text-slate-400">No comments yet.</div>}
      </div>
      <div className="flex gap-2">
        <input
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Add a comment"
          className="flex-1 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-sm"
        />
        <button
          className="rounded-lg bg-brand-500 px-3 py-1 text-xs"
          onClick={async () => {
            if (!body) return;
            await apiFetch(`/api/comments`, {
              method: "POST",
              body: JSON.stringify({ resourceType, resourceId, body })
            });
            setBody("");
            mutate();
          }}
        >
          Post
        </button>
      </div>
    </div>
  );
}
