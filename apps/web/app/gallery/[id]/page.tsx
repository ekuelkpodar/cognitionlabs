"use client";

import useSWR from "swr";
import { apiFetch } from "@/lib/client";
import { useParams } from "next/navigation";

export default function GalleryItemPage() {
  const params = useParams();
  const id = params?.id as string;
  const { data, error } = useSWR(id ? `/api/gallery/items?id=${id}` : null, (url) => apiFetch<{ items: any[] }>(url));
  const item = data?.items?.find((i) => i.id === id);
  if (error) return <div className="text-red-300">Failed to load</div>;
  if (!item) return <div className="text-slate-400">Loading...</div>;
  return (
    <div className="space-y-3">
      <div className="text-xs text-slate-400">{item.type}</div>
      <div className="text-2xl font-semibold">{item.title}</div>
      <div className="text-sm text-slate-300">{item.longDescription || item.shortDescription}</div>
      <button className="rounded-lg bg-brand-500 px-3 py-2 text-xs">Install / Fork</button>
      <div className="text-xs text-slate-400">Ratings and reviews coming soon</div>
    </div>
  );
}
