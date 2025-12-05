"use client";

import useSWR from "swr";
import { apiFetch } from "@/lib/client";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function CourseDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { data, error } = useSWR(id ? `/api/learning/courses/${id}` : null, (url) => apiFetch<{ course: any }>(url));
  const course = data?.course;
  if (error) return <div className="text-red-300">Failed to load</div>;
  if (!course) return <div className="text-slate-400">Loading...</div>;
  return (
    <div className="space-y-4">
      <div className="text-2xl font-semibold">{course.title}</div>
      <div className="text-sm text-slate-300">{course.longDescription}</div>
      <div className="space-y-2">
        {course.modules?.map((m: any) => (
          <div key={m.id} className="rounded-2xl border border-white/5 bg-white/5 p-3 space-y-1">
            <div className="font-semibold">{m.title}</div>
            <div className="text-xs text-slate-400">{m.description}</div>
            <div className="space-y-1">
              {m.lessons?.map((l: any) => (
                <Link key={l.id} href={`/learning/lessons/${l.id}`} className="block rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-sm hover:border-white/20">
                  {l.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
