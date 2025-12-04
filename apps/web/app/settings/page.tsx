export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <div>
        <div className="text-sm text-slate-400">Organization, billing, and API keys.</div>
        <div className="text-2xl font-semibold">Settings</div>
      </div>
      <div className="rounded-2xl border border-white/5 bg-white/5 p-4 space-y-3">
        <div>
          <div className="text-sm text-slate-400">Organization</div>
          <div className="text-lg font-semibold">Atlas Robotics</div>
        </div>
        <div className="text-sm text-slate-300">Plan: Pro (placeholder billing hook for Stripe)</div>
        <div className="text-sm text-slate-300">API Keys managed via /api/api-keys route (hashed storage)</div>
      </div>
    </div>
  );
}
