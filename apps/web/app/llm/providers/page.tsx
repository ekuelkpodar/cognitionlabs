export default function LlmProvidersPage() {
  return (
    <div className="space-y-3">
      <div>
        <div className="text-sm text-slate-400">Bring your own keys. Keys stored as secure references only.</div>
        <div className="text-2xl font-semibold">LLM Providers</div>
      </div>
      <div className="rounded-2xl border border-white/5 bg-white/5 p-4 space-y-3">
        {["OpenAI", "Anthropic", "Custom HTTP"].map((provider) => (
          <div key={provider} className="flex items-center justify-between rounded-xl border border-white/5 p-3">
            <div>
              <div className="font-semibold">{provider}</div>
              <div className="text-xs text-slate-400">Key stored in secret manager placeholder</div>
            </div>
            <button className="rounded-lg bg-white/10 px-3 py-2 text-xs">Configure</button>
          </div>
        ))}
      </div>
    </div>
  );
}
