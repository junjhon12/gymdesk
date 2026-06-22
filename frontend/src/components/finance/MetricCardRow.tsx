import { mockSummary } from "../../data/mockData";

export default function MetricCardRow() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-[#0f1117] border border-gray-800/60 rounded-xl p-5 bg-gradient-to-br from-[#0f1117] to-green-950/5">
        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
          Total Revenue
        </div>
        <div className="text-3xl font-bold text-green-500 mt-2">
          ${mockSummary.totalRevenue.toLocaleString()}
        </div>
        <div className="text-[11px] text-green-500/80 mt-1 flex items-center gap-1">
          ↑ {mockSummary.growthPct}% <span className="text-gray-500">This Month</span>
        </div>
      </div>

      <div className="bg-[#0f1117] border border-gray-800/60 rounded-xl p-5 bg-gradient-to-br from-[#0f1117] to-blue-950/5">
        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
          Collected
        </div>
        <div className="text-3xl font-bold text-blue-400 mt-2">
          ${mockSummary.collected.toLocaleString()}
        </div>
        <div className="text-[11px] text-gray-500 mt-1">successfully processed</div>
      </div>

      <div className="bg-[#0f1117] border border-gray-800/60 rounded-xl p-5 bg-gradient-to-br from-[#0f1117] to-amber-950/5">
        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
          Outstanding
        </div>
        <div className="text-3xl font-bold text-amber-500 mt-2">
          ${mockSummary.outstanding}
        </div>
        <div className="text-[11px] text-gray-500 mt-1">awaiting payment</div>
      </div>

      <div className="bg-[#0f1117] border border-gray-800/60 rounded-xl p-5 bg-gradient-to-br from-[#0f1117] to-purple-950/5">
        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
          Transactions
        </div>
        <div className="text-3xl font-bold text-purple-400 mt-2">
          {mockSummary.transactionsCount}
        </div>
        <div className="text-[11px] text-gray-500 mt-1">this month</div>
      </div>
    </div>
  );
}