"use client";

import useSWR from "swr";
import { apiFetch } from "@/lib/client";

export default function AdminAnalyticsPage() {
  const { data, error } = useSWR("/api/product-events", (url) => apiFetch<{ events: any[] }>(url));
  if (error) return <div className="text-red-300">Failed to load analytics</div>;
  const events = data?.events ?? [];
  return (
    <div className="space-y-4">
      <div>
        <div className="text-sm text-slate-400">Internal product analytics (admin).</div>
        <div className="text-2xl font-semibold">Product Analytics</div>
      </div>
      <div className="rounded-2xl border border-white/5 bg-white/5 p-4 max-h-96 overflow-auto text-sm">
        {events.map((e) => (
          <div key={e.id} className="border-b border-white/5 py-2">
            <div className="font-semibold">{e.eventName}</div>
            <div className="text-xs text-slate-400">{new Date(e.createdAt).toLocaleString()}</div>
          </div>
        ))}
        {events.length === 0 && <div className="text-xs text-slate-400">No events yet.</div>}
      </div>
    </div>
  );
}
