import { auditLogs } from "@/data/mock";

export default function AuditLogsPage() {
  return (
    <div className="space-y-4">
      <div>
        <div className="text-sm text-slate-400">Track who changed what and when.</div>
        <div className="text-2xl font-semibold">Audit Logs</div>
      </div>
      <div className="rounded-2xl border border-white/5 bg-white/5 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-slate-300">
            <tr>
              <th className="px-4 py-2 text-left">Actor</th>
              <th className="px-4 py-2 text-left">Action</th>
              <th className="px-4 py-2 text-left">Resource</th>
              <th className="px-4 py-2 text-left">When</th>
            </tr>
          </thead>
          <tbody>
            {auditLogs.map((log, idx) => (
              <tr key={idx} className="border-t border-white/5">
                <td className="px-4 py-2">{log.actor}</td>
                <td className="px-4 py-2 text-slate-300">{log.action}</td>
                <td className="px-4 py-2 text-slate-300">{log.resource}</td>
                <td className="px-4 py-2 text-slate-400">{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
