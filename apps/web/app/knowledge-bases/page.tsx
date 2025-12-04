import { knowledgeBases } from "@/data/mock";

export default function KnowledgeBasesPage() {
  return (
    <div className="space-y-3">
      <div>
        <div className="text-sm text-slate-400">Documents, embeddings, and RAG controls.</div>
        <div className="text-2xl font-semibold">Knowledge Bases</div>
      </div>
      <div className="rounded-2xl border border-white/5 bg-white/5 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-slate-300">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Docs</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Vector store</th>
            </tr>
          </thead>
          <tbody>
            {knowledgeBases.map((kb) => (
              <tr key={kb.name} className="border-t border-white/5">
                <td className="px-4 py-2 font-medium">{kb.name}</td>
                <td className="px-4 py-2 text-slate-300">{kb.docs}</td>
                <td className="px-4 py-2 text-emerald-200">{kb.status}</td>
                <td className="px-4 py-2 text-slate-300">{kb.vectorStore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
