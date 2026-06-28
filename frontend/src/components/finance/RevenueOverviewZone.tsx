import Panel from "../dashboard/Panel";
import { mockMonthlyTrend, mockRevenueTypes } from "../../data/mockData";

export default function RevenueOverviewZone() {
  return (
    <div className="space-y-3">
      <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">
        Revenue Overview
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Left Column: Monthly Revenue Trend Bar Chart */}
        <Panel className="lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider m-0">
                Monthly Revenue Trend
              </h3>
              <span className="bg-gray-800 text-[10px] text-blue-400 font-semibold px-2 py-0.5 rounded border border-gray-700">
                2026
              </span>
            </div>

            {/* Simulated Custom Bar Graph Using Pure Tailwind */}
            <div className="flex items-end justify-between h-28 px-2 border-b border-gray-800/80 pb-1 mb-4 gap-2">
              {mockMonthlyTrend.map((t, i) => (
                <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                  {/* Hover Tooltip */}
                  <div className="absolute -top-6 bg-gray-900 border border-gray-700 text-[9px] px-1.5 py-0.5 rounded text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                    ${t.amount.toLocaleString()}
                  </div>
                  
                  {/* Dynamic Height Bar */}
                  <div 
                    className={`w-full rounded-t-sm transition-all duration-300 ${
                      t.isCurrent 
                        ? "bg-blue-600 border-t border-blue-400 shadow-[0_-2px_10px_rgba(37,99,235,0.2)]" 
                        : "bg-gray-800/70 group-hover:bg-gray-700"
                    }`}
                    style={{ height: t.heightPct }}
                  />
                  <span className={`text-[10px] mt-2 ${t.isCurrent ? "text-blue-500 font-bold" : "text-gray-500"}`}>
                    {t.month}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Legend Indicators */}
            <div className="flex items-center gap-4 text-[10px] text-gray-500 mb-6">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-sm bg-gray-800" /> Revenue stream
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 border-b border-dashed border-gray-600" /> Target ($3,500)
              </div>
            </div>
          </div>

          {/* Sequential Monthly Target Insights Row */}
          <div className="grid grid-cols-3 gap-3">
            {mockMonthlyTrend.filter(m => m.overTarget).map((t, idx) => (
              <div key={idx} className="bg-gray-900/40 border border-gray-800/80 rounded-xl p-3">
                <span className="text-[10px] text-gray-500 font-medium">{t.month}</span>
                <div className="text-sm font-bold text-green-400 mt-1">${t.amount.toLocaleString()}</div>
                <div className="text-[9px] text-green-500/70 mt-0.5">↑ ${t.overTarget} over target</div>
              </div>
            ))}
          </div>
        </Panel>

        {/* Right Column: Revenue By Type Categorization Bars */}
        <Panel className="flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider m-0">
                Revenue By Type
              </h3>
              <span className="bg-green-950/40 text-[10px] text-green-400 font-bold px-2 py-0.5 rounded-full border border-green-900/40">
                $3,845.62 total
              </span>
            </div>

            {/* Categorized Progress Bars Stack */}
            <div className="space-y-4">
              {mockRevenueTypes.map((type, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center text-[11px] mb-1.5">
                    <div className="flex items-center gap-2 text-gray-300">
                      <span className={`text-xs ${type.textDot}`}>●</span>
                      {type.label}
                      <span className="text-gray-500 font-medium">{type.share}%</span>
                    </div>
                    <span className="font-bold text-gray-100">${type.amount.toLocaleString()}</span>
                  </div>
                  <div className="h-1.5 bg-gray-800/80 rounded-full w-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${type.color}`} 
                      style={{ width: `${type.share}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Highest Performing Insight Card */}
          <div className="mt-6 p-3 bg-gray-900/50 border border-gray-800/80 rounded-xl">
            <div className="text-[9px] text-gray-500 uppercase tracking-wider font-semibold">
              Highest earning category
            </div>
            <div className="text-sm font-bold text-blue-400 mt-1">
              Monthly Memberships
            </div>
            <div className="text-[11px] text-gray-400 mt-0.5">
              46% of gross monthly intake
            </div>
          </div>
        </Panel>
        
      </div>
    </div>
  );
}