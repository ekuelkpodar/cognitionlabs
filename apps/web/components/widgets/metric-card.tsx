import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  delta: string;
}

export function MetricCard({ icon: IconComponent, label, value, delta }: MetricCardProps) {
  return (
    <div className="flex-1 min-w-[220px] rounded-2xl border border-white/5 bg-white/5 backdrop-blur-xl px-4 py-4 shadow-lg shadow-brand-900/30">
      <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
        <span>{label}</span>
        <IconComponent className="w-4 h-4 text-brand-200" />
      </div>
      <div className="text-2xl font-semibold text-white">{value}</div>
      <div className="text-xs text-emerald-200 mt-1">{delta}</div>
    </div>
  );
}
