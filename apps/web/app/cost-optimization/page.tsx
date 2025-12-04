"use client";

import useSWR from "swr";
import { apiFetch } from "@/lib/client";

export default function CostOptimizationPage() {
  const { data, error } = useSWR("/api/costs", (url) => apiFetch<{ estimate: any }>(url));
  if (error) return <div className="text-red-300">Failed to load costs</div>;
  const estimate = data?.estimate;
  return (
    <div className="space-y-4">
      <div>
        <div className="text-sm text-slate-400">Cost awareness and suggestions.</div>
        <div className="text-2xl font-semibold">Cost & Optimization</div>
      </div>
      <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
        <div className="text-lg font-semibold">Estimated Cost</div>
        <div className="text-3xl font-semibold">${estimate?.estimateCents ? (estimate.estimateCents / 100).toFixed(2) : "0.00"}</div>
      </div>
      <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
        <div className="text-lg font-semibold">Suggestions (Cost Copilot)</div>
        <div className="text-xs text-slate-300">TODO: generate suggestions from internal agent</div>
      </div>
    </div>
  );
}
