import { payrollData } from '../../data/mockData';

export default function PayrollCommissions() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest m-0">Payroll & Commissions</h2>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-900/30 text-indigo-400">
          June 2026
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {payrollData.map((p, i) => {
          const earned = (p.sessions * p.rate) + p.bonus;
          
          return (
            <div key={i} className={`pb-3 ${i < payrollData.length - 1 ? 'border-b border-gray-800/50' : ''}`}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium text-gray-200">{p.name}</span>
                <span className="text-sm font-bold text-indigo-400">${earned}</span>
              </div>
              <div className="flex gap-3">
                <span className="text-[10px] text-gray-500">{p.sessions} sessions</span>
                {p.bonus > 0 && (
                  <span className="text-[10px] text-orange-400">+${p.bonus} bonus</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}