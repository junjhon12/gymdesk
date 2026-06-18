import { bookings } from '../../data/mockData';

export default function BookingsList() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest m-0">PT & Room Bookings</h2>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-900/30 text-blue-400">
          Today
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {bookings.map((b, i) => (
          <div key={i} className={`flex items-center gap-3 pb-2 ${i < bookings.length - 1 ? 'border-b border-gray-800/50' : ''}`}>
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${b.type === "PT" ? "bg-blue-900/40 text-blue-400" : "bg-indigo-900/40 text-indigo-400"}`}>
              {b.type}
            </span>
            
            <div className="flex-1">
              <div className="text-xs font-medium text-gray-200">{b.member}</div>
              <div className="text-[10px] text-gray-500">
                {b.trainer !== "—" ? `${b.trainer} · ` : ""}{b.time}
              </div>
            </div>
            
            <span className={`text-[9px] px-2 py-0.5 rounded-full ${
              b.status === "confirmed" ? "bg-green-900/30 text-green-400" : 
              b.status === "booked" ? "bg-blue-900/30 text-blue-400" : 
              "bg-orange-900/30 text-orange-400"
            }`}>
              {b.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}