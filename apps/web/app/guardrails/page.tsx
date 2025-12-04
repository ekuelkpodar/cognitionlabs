import { ClientGuardrails } from "./ClientGuardrails";

export default function GuardrailsPage() {
  return (
    <div className="space-y-4">
      <div>
        <div className="text-sm text-slate-400">Content safety, PII redaction, prompt injection checks.</div>
        <div className="text-2xl font-semibold">Guardrails</div>
      </div>
      <ClientGuardrails />
    </div>
  );
}
