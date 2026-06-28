
export default function BookingsCard() {
  const bookings = [
    { type: 'PT', name: 'Marcus Webb', sub: 'Coach Ray · 8:00 AM', status: 'confirmed', statusColor: 'bg-emerald-950/50 text-emerald-400 border-emerald-900/40' },
    { type: 'PT', name: 'Lena Cho', sub: 'Coach Dana · 11:00 AM', status: 'confirmed', statusColor: 'bg-emerald-950/50 text-emerald-400 border-emerald-900/40' },
    { type: 'Room', name: 'Spin Studio A', sub: '12:00 PM', status: 'booked', statusColor: 'bg-indigo-950/60 text-indigo-400 border-indigo-900/40' },
    { type: 'PT', name: 'Tyler Brooks', sub: 'Coach Mia · 3:00 PM', status: 'pending', statusColor: 'bg-amber-950/60 text-amber-400 border-amber-900/30' },
  ];

  return (
    <div className="bg-[#13161c] border border-slate-800/60 rounded-xl p-5 h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xs font-semibold text-slate-400 tracking-wider uppercase">PT & Room Bookings</h3>
        <span className="text-indigo-400 text-[11px] font-medium bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-900/30">Today</span>
      </div>

      <div className="space-y-3">
        {bookings.map((booking, i) => (
          <div key={i} className="flex justify-between items-center p-2 rounded-lg bg-slate-900/30 border border-slate-800/30 hover:border-slate-800 transition-colors">
            <div className="flex items-center gap-2.5">
              <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded w-11 text-center tracking-wide ${
                booking.type === 'PT' 
                  ? 'bg-indigo-950 text-indigo-300 border border-indigo-900/30' 
                  : 'bg-purple-950 text-purple-300 border border-purple-900/30'
              }`}>
                {booking.type}
              </span>
              <div>
                <div className="text-xs font-bold text-slate-200">{booking.name}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{booking.sub}</div>
              </div>
            </div>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${booking.statusColor}`}>
              {booking.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}