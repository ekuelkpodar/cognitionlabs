import { Activity, Brain, Cloud, Database, Layers } from "lucide-react";
import { MetricCard } from "@/components/widgets/metric-card";
import { AreaChartWidget } from "@/components/widgets/area-chart";
import { QuickActions } from "@/components/widgets/quick-actions";
import { TableCard } from "@/components/widgets/table-card";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <MetricCard icon={Database} label="Datasets" value="12" delta="3 new this week" />
        <MetricCard icon={Brain} label="Models" value="8" delta="2 training" />
        <MetricCard icon={Cloud} label="Endpoints" value="5" delta="p95 210ms" />
        <MetricCard icon={Layers} label="Feature Tables" value="18" delta="+9% QoQ" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <AreaChartWidget
            title="Requests & Latency"
            subtitle="Rolling 7d"
            metric="28.4k"
            series={[
              { name: "Requests", color: "#6289ff", data: [8, 12, 10, 14, 18, 16, 22] },
              { name: "Latency", color: "#22d3ee", data: [220, 210, 240, 200, 198, 205, 190] }
            ]}
            categories={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
          />
        </div>
        <QuickActions />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <TableCard
          title="Active Endpoints"
          columns={["Name", "Traffic", "p95", "Status"]}
          rows={[
            ["Supply Chain Agent", "12.3k / d", "210ms", "Healthy"],
            ["Forecast API", "8.7k / d", "240ms", "Healthy"],
            ["Churn Predictor", "5.1k / d", "260ms", "Drift watch"],
            ["Recommendations", "3.2k / d", "220ms", "Healthy"]
          ]}
        />
        <TableCard
          title="Latest Runs"
          columns={["Workflow", "Status", "Duration", "When"]}
          rows={[
            ["Daily Feature Refresh", "Success", "4m 12s", "2h ago"],
            ["Demand Forecast", "Training", "--", "1h ago"],
            ["KB Embeddings", "Queued", "--", "6m ago"],
            ["Anomaly Scan", "Failed", "--", "8m ago"]
          ]}
        />
      </div>
    </div>
  );
}
