"use client";

import useSWR from "swr";
import { apiFetch } from "@/lib/client";
import { WorkspaceViewEditor } from "@/components/blocks/workspace-view-editor";
import { useParams } from "next/navigation";

export default function WorkspaceViewPage() {
  const params = useParams();
  const viewId = params?.viewId as string;
  const { data, error } = useSWR(viewId ? `/api/ai-views?id=${viewId}` : null, (url) => apiFetch<{ views: any[] }>(url));
  const view = data?.views?.find((v) => v.id === viewId);
  if (error) return <div className="text-red-300">Failed to load</div>;
  if (!view) return <div className="text-slate-400">Loading...</div>;
  return <WorkspaceViewEditor view={view} />;
}
