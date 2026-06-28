import { useState } from "react";
import MetricCardRow from "../components/finance/MetricCardRow";
import RevenueOverviewZone from "../components/finance/RevenueOverviewZone";
import OverdueCollections from "../components/finance/OverdueCollections";
import TransactionHistory from "../components/finance/Transactionhistory";

export default function Finance() {
  const [timeTab, setTimeTab] = useState("month");

  return (
    <div className="h-full flex flex-col relative pb-10 space-y-6">
      
      {/* ── Page Header ── */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-white m-0">Finance</h1>
          <p className="text-xs text-gray-400 mt-1 m-0">
            Revenue tracking, payments, and transaction history
          </p>
        </div>
        <button className="bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700 px-4 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2">
          ↓ Export Report
        </button>
      </div>

      {/* ── Time Interval Switcher ── */}
      <div className="flex gap-1 bg-[#0f1117] border border-gray-800 rounded-lg p-1 w-fit">
        {["week", "month", "year"].map((t) => (
          <button
            key={t}
            onClick={() => setTimeTab(t)}
            className={`px-4 py-1.5 rounded-md text-xs font-medium capitalize transition-colors ${
              timeTab === t
                ? "bg-gray-800 text-white"
                : "bg-transparent text-gray-500 hover:text-gray-300"
            }`}
          >
            This {t}
          </button>
        ))}
      </div>

      <MetricCardRow />
      <RevenueOverviewZone />
      <OverdueCollections/>
      <TransactionHistory/>

    </div>
  );
}