import Panel from "../dashboard/Panel";
import { mockOverduePayments } from "../../data/mockData";

export default function OverdueCollections() {
  // Calculate aggregate sum of outstanding liabilities directly from the mock layer
  const overdueTotal = mockOverduePayments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-3">
      <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">
        Overdue & Collections
      </div>

      <Panel className="p-0! overflow-hidden">
        {/* Table Header Section */}
        <div className="p-4 flex justify-between items-center border-b border-gray-800/50 bg-gray-900/10">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider m-0">
            Overdue Payments
          </h3>
          <span className="bg-red-950/40 text-[10px] text-red-400 font-bold px-2.5 py-0.5 rounded-full border border-red-900/40">
            ${overdueTotal.toFixed(2)} outstanding
          </span>
        </div>

        {/* Responsive Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-800 bg-gray-900/20">
                {["Member", "Plan", "Amount Due", "Days Overdue", "Last Contacted", "Actions"].map((h) => (
                  <th 
                    key={h} 
                    className="px-5 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/40">
              {mockOverduePayments.map((p) => (
                <tr key={p.id} className="hover:bg-gray-800/10 transition-colors">
                  {/* Member Name */}
                  <td className="px-5 py-3.5 font-bold text-gray-100">{p.name}</td>
                  
                  {/* Plan Tier Badge */}
                  <td className="px-5 py-3.5">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950/40 text-blue-400 border border-blue-900/30 font-medium">
                      {p.plan}
                    </span>
                  </td>
                  
                  {/* Outstanding Balance */}
                  <td className="px-5 py-3.5 font-bold text-red-400">${p.amount}</td>
                  
                  {/* Aging Interval */}
                  <td className="px-5 py-3.5 text-amber-500 font-medium">{p.daysOverdue} days</td>
                  
                  {/* Communication History Warning Flags */}
                  <td className="px-5 py-3.5 text-gray-400">
                    {p.lastContacted.toLowerCase().includes("never") ? (
                      <span className="text-red-400/90 flex items-center gap-1 font-medium">
                        ⚠️ {p.lastContacted}
                      </span>
                    ) : (
                      p.lastContacted
                    )}
                  </td>
                  
                  {/* Call-to-Action Quick Triggers */}
                  <td className="px-5 py-3.5">
                    <div className="flex gap-2">
                      <button className="text-[10px] font-semibold bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 px-2.5 py-1.5 rounded-md border border-blue-500/10 transition-colors">
                        Send Reminder
                      </button>
                      <button className="text-[10px] font-semibold bg-green-600/10 text-green-400 hover:bg-green-600/20 px-2.5 py-1.5 rounded-md border border-green-500/10 transition-colors">
                        Mark Paid
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}