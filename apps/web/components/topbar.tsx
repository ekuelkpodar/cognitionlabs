import { Bell, ChevronDown, Users } from "lucide-react";

export function Topbar() {
  return (
    <header className="flex items-center justify-between border-b border-white/5 px-8 py-4 bg-[#0d1328]/60 backdrop-blur-xl">
      <div className="flex items-center gap-3 text-sm">
        <div className="text-slate-400">Current org</div>
        <button className="inline-flex items-center gap-1 rounded-lg bg-white/5 px-3 py-2 text-sm font-medium text-white hover:bg-white/10">
          Atlas Robotics
          <ChevronDown className="w-4 h-4" />
        </button>
        <span className="rounded-full border border-emerald-400/30 px-2 py-1 text-xs text-emerald-200 bg-emerald-500/10">Pro</span>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <button className="relative rounded-lg bg-white/5 p-2 hover:bg-white/10">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-amber-400" />
        </button>
        <button className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 hover:bg-white/10">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-500 to-cyan-400 grid place-items-center text-sm font-semibold">
            UE
          </div>
          <div className="text-left text-xs">
            <div className="font-semibold">Uma Engineer</div>
            <div className="text-slate-400">Owner</div>
          </div>
          <ChevronDown className="w-4 h-4" />
        </button>
        <button className="inline-flex items-center gap-2 rounded-lg border border-dashed border-white/10 px-3 py-2 text-xs text-slate-300 hover:border-white/30">
          <Users className="w-4 h-4" /> Invite
        </button>
      </div>
    </header>
  );
}
