import { staff } from '../../data/mockData';
import Avatar from '../ui/Avatar';

export default function StaffRoster() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest m-0">Staff Roster</h2>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-900/30 text-blue-400">
          Today
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {staff.map((s, i) => {
          const initials = s.name.split(" ").map(n => n[0]).join("");
          const isOnShift = s.status === "on";
          
          return (
            <div key={i} className="flex items-center gap-3">
              <Avatar 
                initials={initials} 
                colorHex={isOnShift ? "#22c55e" : "#6b7280"} // Green if on, gray if off
                size={30} 
              />
              <div className="flex-1">
                <div className="text-xs font-medium text-gray-200">{s.name}</div>
                <div className="text-[10px] text-gray-500">{s.role} · {s.shift}</div>
              </div>
              <span className={`text-[9px] px-2 py-0.5 rounded-full ${
                isOnShift ? "bg-green-900/30 text-green-400" : "bg-gray-800 text-gray-400"
              }`}>
                {isOnShift ? "On Shift" : "Off"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}