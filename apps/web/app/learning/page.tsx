"use client";

import useSWR from "swr";
import { apiFetch } from "@/lib/client";
import Link from "next/link";

export default function MyLearningPage() {
  const { data: coursesData } = useSWR("/api/learning/courses", (url) => apiFetch<{ courses: any[] }>(url));
  const { data: progressData } = useSWR("/api/learning/progress/me", (url) => apiFetch<{ courses: any[]; lessons: any[] }>(url));
  const courses = coursesData?.courses ?? [];
  const progresses = progressData?.courses ?? [];
  return (
    <div className="space-y-4">
      <div>
        <div className="text-sm text-slate-400">Courses, labs, challenges, and certifications.</div>
        <div className="text-2xl font-semibold">My Learning</div>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {courses.map((c) => (
          <Link key={c.id} href={`/learning/courses/${c.id}`} className="rounded-2xl border border-white/5 bg-white/5 p-4 space-y-1 hover:border-white/20">
            <div className="text-sm text-slate-400">{c.category}</div>
            <div className="text-lg font-semibold">{c.title}</div>
            <div className="text-xs text-slate-400">{c.shortDescription}</div>
            <div className="text-xs text-slate-400">Progress: {progresses.find((p) => p.courseId === c.id)?.progressPercent ?? 0}%</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
