import { checkIns } from '../../data/mockData';
import Avatar from '../ui/Avatar';

export default function CheckInLog() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest m-0">Check-In Log</h2>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-900/30 text-green-400">
          Live
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {checkIns.map((c, i) => (
          <div key={i} className="flex items-center gap-3">
            <Avatar initials={c.initials} colorHex={c.color} />
            <div className="flex-1">
              <div className="text-xs font-medium text-gray-200">{c.name}</div>
              <div className="text-[10px] text-gray-500">{c.time}</div>
            </div>
            <span className={`text-[9px] px-2 py-0.5 rounded-full ${
              c.status === "active" ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"
            }`}>
              {c.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}