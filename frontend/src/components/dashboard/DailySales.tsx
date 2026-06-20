import { dailySales } from '../../data/mockData';

export default function DailySales() {
  const dailySalesTotal = dailySales.reduce((sum, item) => sum + item.total, 0);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest m-0">Daily Sales</h2>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-900/30 text-green-400">
          ${dailySalesTotal.toFixed(2)} today
        </span>
      </div>

      <div className="flex flex-col gap-2.5">
        {dailySales.map((s, i) => (
          <div key={i} className={`flex justify-between items-center pb-2.5 ${i < dailySales.length - 1 ? 'border-b border-gray-800/50' : ''}`}>
            <div>
              <div className="text-xs font-medium text-gray-200">{s.item}</div>
              <div className="text-[10px] text-gray-500 mt-0.5">Qty: {s.qty}</div>
            </div>
            <span className="text-sm font-bold text-green-500">${s.total.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}