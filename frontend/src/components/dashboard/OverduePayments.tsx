import { overduePayments } from '../../data/mockData';

export default function OverduePayments() {
  const overdueTotal = overduePayments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest m-0">Overdue Payments</h2>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-900/30 text-red-400">
          ${overdueTotal.toFixed(2)} owed
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {overduePayments.map((p, i) => (
          <div key={i} className={`flex justify-between items-center pb-3 ${i < overduePayments.length - 1 ? 'border-b border-gray-800/50' : ''}`}>
            <div>
              <div className="text-xs font-medium text-gray-200">{p.name}</div>
              <div className="text-[10px] text-gray-500">{p.plan} · {p.overdueDays}d overdue</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-red-400">${p.amount}</div>
              <button className="text-[9px] text-blue-500 hover:text-blue-400 bg-transparent border-none p-0 cursor-pointer mt-0.5 transition-colors">
                Send reminder
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}