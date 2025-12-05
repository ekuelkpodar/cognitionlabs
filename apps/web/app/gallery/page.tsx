"use client";

import useSWR from "swr";
import { apiFetch } from "@/lib/client";
import Link from "next/link";

export default function GalleryPage() {
  const { data, error } = useSWR("/api/gallery/items", (url) => apiFetch<{ items: any[] }>(url));
  if (error) return <div className="text-red-300">Failed to load gallery</div>;
  const items = data?.items ?? [];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-slate-400">Community apps, templates, agents, and plugins.</div>
          <div className="text-2xl font-semibold">Gallery</div>
        </div>
        <Link href="/gallery/publish" className="rounded-lg bg-brand-500 px-3 py-2 text-xs">Publish</Link>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {items.map((item) => (
          <Link key={item.id} href={`/gallery/${item.id}`} className="rounded-2xl border border-white/5 bg-white/5 p-4 space-y-1 hover:border-white/20">
            <div className="text-sm text-slate-400">{item.type}</div>
            <div className="text-lg font-semibold">{item.title}</div>
            <div className="text-xs text-slate-400">{item.shortDescription}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
