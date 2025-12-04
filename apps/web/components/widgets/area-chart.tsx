"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface Series {
  name: string;
  color: string;
  data: number[];
}

interface AreaChartWidgetProps {
  title: string;
  subtitle?: string;
  metric: string;
  categories: string[];
  series: Series[];
}

export function AreaChartWidget({ title, subtitle, metric, categories, series }: AreaChartWidgetProps) {
  const data = categories.map((cat, idx) => {
    const entry: Record<string, number | string> = { name: cat };
    series.forEach((s) => {
      entry[s.name] = s.data[idx] ?? 0;
    });
    return entry;
  });

  return (
    <div className="rounded-2xl border border-white/5 bg-white/5 p-4 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-sm text-slate-400">{subtitle}</div>
          <div className="text-lg font-semibold text-white">{title}</div>
        </div>
        <div className="text-2xl font-semibold text-white">{metric}</div>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1b2342" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" tickFormatter={(v) => `${v}`} />
            <Tooltip contentStyle={{ background: "#0d1328", border: "1px solid #1b2342", borderRadius: 12 }} />
            {series.map((s) => (
              <Area key={s.name} type="monotone" dataKey={s.name} stroke={s.color} fill={`${s.color}55`} strokeWidth={2} />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
