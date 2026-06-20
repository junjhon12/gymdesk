import { revenueStats } from '../../data/mockData';

interface RevenueSummaryProps {
  currentTab: string;
}

export default function RevenueSummary({ currentTab }: RevenueSummaryProps) {
  const rows = [
    { label: "This Week", value: `$${revenueStats.week.revenue.toLocaleString()}`, colorClass: "text-blue-500", dotClass: "bg-blue-500", key: "week" },
    { label: "This Month", value: `$${revenueStats.month.revenue.toLocaleString()}`, colorClass: "text-purple-500", dotClass: "bg-purple-500", key: "month" },
    { label: "This Year", value: `$${revenueStats.year.revenue.toLocaleString()}`, colorClass: "text-green-500", dotClass: "bg-green-500", key: "year" },
  ];

  return (
    <div>
      <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 m-0">Revenue Summary</h2>

      <div className="flex flex-col gap-4">
        {rows.map((r, i) => {
          const isActive = currentTab === r.key;
          
          return (
            <div key={i} className={`flex justify-between items-center transition-opacity duration-300 ${
              isActive ? 'opacity-100' : 'opacity-40'
            } ${i < 2 ? 'pb-4 border-b border-gray-800/50' : ''}`}>
              
              <div className="flex items-center gap-2">
                {/* Active Indicator Bar */}
                <div className={`w-1 h-4 rounded-full ${isActive ? r.dotClass : 'bg-transparent'}`} />
                <span className={`text-xs ${isActive ? 'text-gray-200' : 'text-gray-500'}`}>
                  {r.label}
                </span>
              </div>
              
              <span className={`text-xl font-bold ${r.colorClass}`}>
                {r.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}