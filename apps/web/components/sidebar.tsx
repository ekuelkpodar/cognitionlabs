import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  Layers,
  BookOpen,
  Box,
  Database,
  Brain,
  Workflow,
  Settings,
  Cloud,
  Bot,
  Bolt,
  Shield,
  Activity
} from "lucide-react";

const sections: { title: string; items: { name: string; href: string; icon: ReactNode }[] }[] = [
  {
    title: "Dashboard",
    items: [
      { name: "Overview", href: "/", icon: <Bolt className="w-4 h-4" /> },
      { name: "Projects", href: "/projects", icon: <Layers className="w-4 h-4" /> }
    ]
  },
  {
    title: "Data",
    items: [
      { name: "Data Sources", href: "/data-sources", icon: <Database className="w-4 h-4" /> },
      { name: "Datasets", href: "/datasets", icon: <Layers className="w-4 h-4" /> },
      { name: "Feature Store", href: "/feature-store", icon: <Box className="w-4 h-4" /> },
      { name: "Vector Stores", href: "/vector-stores", icon: <Cloud className="w-4 h-4" /> }
    ]
  },
  {
    title: "AI Studio",
    items: [
      { name: "LLM Providers", href: "/llm/providers", icon: <Brain className="w-4 h-4" /> },
      { name: "Agents & Chat", href: "/llm/agents", icon: <Bot className="w-4 h-4" /> },
      { name: "Knowledge Bases", href: "/knowledge-bases", icon: <BookOpen className="w-4 h-4" /> },
      { name: "Copilots", href: "/copilots", icon: <Bolt className="w-4 h-4" /> }
    ]
  },
  {
    title: "ML Studio",
    items: [
      { name: "Models", href: "/models", icon: <Brain className="w-4 h-4" /> },
      { name: "Experiments", href: "/experiments", icon: <Workflow className="w-4 h-4" /> },
      { name: "Pipelines & Workflows", href: "/workflows", icon: <Workflow className="w-4 h-4" /> },
      { name: "Endpoints", href: "/endpoints", icon: <Cloud className="w-4 h-4" /> },
      { name: "Apps", href: "/apps", icon: <Layers className="w-4 h-4" /> }
    ]
  },
  {
    title: "Governance",
    items: [
      { name: "Guardrails", href: "/guardrails", icon: <Shield className="w-4 h-4" /> },
      { name: "Audit Logs", href: "/audit-logs", icon: <Workflow className="w-4 h-4" /> },
      { name: "Templates", href: "/templates", icon: <BookOpen className="w-4 h-4" /> },
      { name: "Plugins", href: "/plugins", icon: <Layers className="w-4 h-4" /> },
      { name: "Data Policies", href: "/data-policies", icon: <Shield className="w-4 h-4" /> },
      { name: "Observability", href: "/observability", icon: <Activity className="w-4 h-4" /> },
      { name: "Platform Health", href: "/platform-health", icon: <Activity className="w-4 h-4" /> },
      { name: "Usage & Cost", href: "/usage", icon: <Bolt className="w-4 h-4" /> },
      { name: "Cost Optimization", href: "/cost-optimization", icon: <Bolt className="w-4 h-4" /> },
      { name: "Product Analytics", href: "/admin/analytics", icon: <Bolt className="w-4 h-4" /> },
      { name: "Gallery", href: "/gallery", icon: <BookOpen className="w-4 h-4" /> },
      { name: "Webhooks", href: "/webhooks", icon: <Workflow className="w-4 h-4" /> },
      { name: "Moderation", href: "/moderation", icon: <Shield className="w-4 h-4" /> },
      { name: "Partner Console", href: "/partner-console", icon: <Layers className="w-4 h-4" /> }
    ]
  },
  {
    title: "Settings",
    items: [{ name: "Organization", href: "/settings", icon: <Settings className="w-4 h-4" /> }]
  }
];

export function Sidebar() {
  return (
    <aside className="w-64 shrink-0 border-r border-white/5 bg-[#0d1328]/80 backdrop-blur-xl p-4 space-y-4">
      <div className="flex items-center gap-2 text-lg font-semibold">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-400 grid place-items-center font-bold">
          CL
        </div>
        <div>
          <div>Cognition Labs</div>
          <div className="text-xs text-slate-400">AI Ops Platform</div>
        </div>
      </div>
      <div className="space-y-4 text-sm">
        {sections.map((section) => (
          <div key={section.title} className="space-y-2">
            <div className="text-xs uppercase tracking-wide text-slate-400">{section.title}</div>
            <div className="space-y-1">
              {section.items.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-slate-200 hover:bg-white/5 hover:text-white transition"
                  )}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
