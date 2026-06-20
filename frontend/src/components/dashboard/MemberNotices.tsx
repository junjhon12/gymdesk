import { birthdays, expiringMembers } from '../../data/mockData';
import Panel from './Panel';

export default function MemberNotices() {
  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Birthdays Panel */}
      <Panel className="flex-1">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 m-0">
          Birthdays & Milestones
        </h2>
        <div className="flex flex-col gap-3">
          {birthdays.map((b, i) => (
            <div key={i} className="flex justify-between items-center">
              <div>
                <div className="text-xs font-medium text-gray-200">{b.name}</div>
                {b.milestone && <div className="text-[10px] text-orange-400 mt-0.5">{b.milestone}</div>}
              </div>
              <span className="text-[11px] text-gray-500">{b.date}</span>
            </div>
          ))}
        </div>
      </Panel>

      {/* Expiring Soon Panel */}
      <Panel className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest m-0">Expiring Soon</h2>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-orange-900/30 text-orange-400">
            {expiringMembers.length}
          </span>
        </div>
        <div className="flex flex-col gap-3">
          {expiringMembers.map((m, i) => (
            <div key={i} className="flex justify-between items-center">
              <div>
                <div className="text-xs font-medium text-gray-200">{m.name}</div>
                <div className="text-[10px] text-gray-500 mt-0.5">{m.plan} · {m.expiry}</div>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                m.daysLeft <= 5 
                  ? "bg-red-950/40 text-red-400 border-red-900/50" 
                  : "bg-gray-900 text-gray-400 border-gray-800"
              }`}>
                {m.daysLeft}d
              </span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}