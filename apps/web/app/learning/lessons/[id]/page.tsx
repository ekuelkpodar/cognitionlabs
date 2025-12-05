"use client";

import useSWR from "swr";
import { apiFetch } from "@/lib/client";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useState } from "react";

const Markdown = dynamic(() => import("react-markdown"), { ssr: false });

export default function LessonPage() {
  const params = useParams();
  const id = params?.id as string;
  const { data, error } = useSWR(id ? `/api/learning/lessons/${id}` : null, (url) => apiFetch<{ lesson: any }>(url));
  const lesson = data?.lesson;
  const [message, setMessage] = useState("");
  const [tutorReply, setTutorReply] = useState<string | null>(null);
  if (error) return <div className="text-red-300">Failed to load</div>;
  if (!lesson) return <div className="text-slate-400">Loading...</div>;
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2 space-y-3">
        <div className="text-2xl font-semibold">{lesson.title}</div>
        {lesson.contentType === "MARKDOWN" ? <Markdown className="prose prose-invert max-w-none">{lesson.contentBody}</Markdown> : <div className="text-sm text-slate-300">Content type: {lesson.contentType}</div>}
        <div className="rounded-2xl border border-white/5 bg-white/5 p-3">
          <div className="text-sm font-semibold">Lab</div>
          {lesson.labs?.length ? <div className="text-xs text-slate-400">Start lab from course page (stub)</div> : <div className="text-xs text-slate-400">No lab attached</div>}
        </div>
        <div className="rounded-2xl border border-white/5 bg-white/5 p-3">
          <div className="text-sm font-semibold">Challenge</div>
          {lesson.challenges?.length ? <div className="text-xs text-slate-400">Submit challenge from challenge panel (stub)</div> : <div className="text-xs text-slate-400">No challenge attached</div>}
        </div>
      </div>
      <div className="col-span-1 space-y-3">
        <div className="rounded-2xl border border-white/5 bg-white/5 p-3 space-y-2">
          <div className="font-semibold">Tutor</div>
          <textarea className="w-full rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs" value={message} onChange={(e) => setMessage(e.target.value)} />
          <button
            className="rounded-lg bg-brand-500 px-3 py-1 text-xs"
            onClick={async () => {
              const res = await apiFetch(`/api/tutor/lesson/${id}`, { method: "POST", body: JSON.stringify({ message }) });
              setTutorReply(res.reply?.reply ?? "");
            }}
          >
            Ask
          </button>
          {tutorReply && <div className="text-xs text-slate-300">{tutorReply}</div>}
        </div>
      </div>
    </div>
  );
}
