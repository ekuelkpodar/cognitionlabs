import { ClientTemplates } from "./ClientTemplates";

export default function TemplatesPage() {
  return (
    <div className="space-y-4">
      <div>
        <div className="text-sm text-slate-400">Blueprints for projects, pipelines, and agents.</div>
        <div className="text-2xl font-semibold">Templates & Marketplace</div>
      </div>
      <ClientTemplates />
    </div>
  );
}
