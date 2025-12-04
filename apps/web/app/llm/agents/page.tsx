import { agents } from "@/data/mock";

export default function AgentsPage() {
  return (
    <div className="space-y-3">
      <div>
        <div className="text-sm text-slate-400">Build chat and operator agents with tools + RAG.</div>
        <div className="text-2xl font-semibold">Agents & Chat</div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {agents.map((agent) => (
          <div key={agent.name} className="rounded-2xl border border-white/5 bg-white/5 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">{agent.name}</div>
              <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-slate-300">{agent.type}</span>
            </div>
            <div className="text-sm text-slate-300">Model: {agent.model}</div>
            <div className="text-sm text-slate-300">Knowledge base: {agent.kb || "None"}</div>
            <button className="rounded-lg bg-brand-500 px-3 py-2 text-xs">Open playground</button>
          </div>
        ))}
      </div>
    </div>
  );
}
