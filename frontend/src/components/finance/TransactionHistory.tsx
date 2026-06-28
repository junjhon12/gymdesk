import { useState, useMemo } from "react";
import Panel from "../dashboard/Panel";
import { mockTransactions } from "../../data/mockData";

// Mini Status Badge for individual ledger entries
function TxnStatusBadge({ status }: { status: string }) {
  const s = status.toLowerCase();
  if (s === "paid") {
    return (
      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-green-950/80 text-green-400 border border-green-900/60 whitespace-nowrap">
        Paid
      </span>
    );
  }
  if (s === "overdue") {
    return (
      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-950/80 text-amber-500 border border-amber-900/60 whitespace-nowrap">
        Overdue
      </span>
    );
  }
  return (
    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-red-950/80 text-red-400 border border-red-900/60 whitespace-nowrap">
      Failed
    </span>
  );
}

export default function TransactionHistory() {
  const [txSearch, setTxSearch] = useState("");
  const [txStatusFilter, setTxStatusFilter] = useState("all");

  // Filter master ledger rows purely based on user selections
  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter((tx) => {
      const matchesSearch =
        tx.member.toLowerCase().includes(txSearch.toLowerCase()) ||
        tx.id.toLowerCase().includes(txSearch.toLowerCase()) ||
        tx.description.toLowerCase().includes(txSearch.toLowerCase());
      const matchesStatus =
        txStatusFilter === "all" || tx.status.toLowerCase() === txStatusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [txSearch, txStatusFilter]);

  return (
    <div className="space-y-3">
      <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">
        Transaction History
      </div>
      
      <Panel className="p-0! overflow-hidden">
        {/* Search & Filter Top bar */}
        <div className="p-4 flex flex-wrap items-center justify-between gap-3 border-b border-gray-800/50 bg-gray-900/10">
          
          {/* Search bar input */}
          <div className="relative min-w-60">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">🔍</span>
            <input 
              value={txSearch} 
              onChange={e => setTxSearch(e.target.value)}
              placeholder="Search transactions..."
              className="w-full bg-gray-800/70 border border-gray-700/80 rounded-lg py-1.5 pl-8 pr-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Status filtering pills */}
          <div className="flex items-center gap-4">
            <div className="flex gap-1 bg-gray-800/70 rounded-lg p-1 border border-gray-700/40">
              {["all", "paid", "overdue", "failed"].map((st) => (
                <button
                  key={st}
                  onClick={() => setTxStatusFilter(st)}
                  className={`px-3 py-1 rounded-md text-[11px] font-medium capitalize transition-colors ${
                    txStatusFilter === st ? "bg-gray-700 text-white" : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
            <span className="text-[11px] text-gray-500 font-medium">
              {filteredTransactions.length} transactions
            </span>
          </div>
        </div>

        {/* Core Ledger Table Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-800 bg-gray-900/20">
                {["ID", "Member", "Description", "Amount", "Method", "Status", "Date"].map((h) => (
                  <th key={h} className="px-5 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/40">
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-800/10 transition-colors">
                  <td className="px-5 py-3.5 text-gray-500 font-medium">{tx.id}</td>
                  <td className="px-5 py-3.5 font-bold text-gray-100">{tx.member}</td>
                  <td className="px-5 py-3.5 text-gray-400">{tx.description}</td>
                  <td className={`px-5 py-3.5 font-bold ${tx.status === 'Failed' ? 'text-red-400' : 'text-green-500'}`}>
                    ${tx.amount.toFixed(2)}
                  </td>
                  <td className="px-5 py-3.5 text-gray-400 font-medium">{tx.method}</td>
                  <td className="px-5 py-3.5"><TxnStatusBadge status={tx.status} /></td>
                  <td className="px-5 py-3.5 text-gray-500 font-medium">{tx.date}</td>
                </tr>
              ))}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-gray-500 py-12 bg-gray-900/5">
                    No transactions match your current search parameters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}