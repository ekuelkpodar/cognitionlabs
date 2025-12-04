interface TableCardProps {
  title: string;
  columns: string[];
  rows: (string | number)[][];
}

export function TableCard({ title, columns, rows }: TableCardProps) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/5 p-4 backdrop-blur-xl">
      <div className="text-lg font-semibold text-white mb-3">{title}</div>
      <div className="overflow-hidden rounded-xl border border-white/5">
        <table className="w-full text-sm text-left">
          <thead className="bg-white/5 text-slate-300">
            <tr>
              {columns.map((col) => (
                <th key={col} className="px-3 py-2 font-medium">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} className="border-t border-white/5 text-slate-200">
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="px-3 py-2">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
