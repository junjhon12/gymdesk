
interface ZoneData {
  name: string;
  current: number;
  max: number;
  color: string;
}

export default function LiveOccupancyZone() {
  const peakHours = [15, 20, 25, 45, 90, 60, 35, 20];
  
  const zones: ZoneData[] = [
    { name: 'Free Weights', current: 31, max: 40, color: 'bg-amber-500' },
    { name: 'Cardio', current: 18, max: 60, color: 'bg-emerald-500' },
    { name: 'Spin Studio A', current: 20, max: 20, color: 'bg-rose-500' },
    { name: 'Yoga Studio B', current: 0, max: 20, color: 'bg-slate-600' },
    { name: 'Pool', current: 7, max: 20, color: 'bg-emerald-500' },
  ];

  return (
    <div className="bg-[#13161c] border border-slate-800/60 rounded-xl p-5 flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Live Occupancy</h3>
          <span className="bg-emerald-950/80 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-800/40">
            47 Inside
          </span>
        </div>
        
        <div className="mb-4">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-emerald-400">47</span>
            <span className="text-slate-500 text-sm">/ 120 cap</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '39%' }}></div>
          </div>
        </div>

        {/* Peak Hours Histogram */}
        <div className="mb-5">
          <h4 className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Peak Hours Today</h4>
          <div className="flex items-end justify-between h-10 px-1 bg-slate-900/40 rounded-lg py-1">
            {peakHours.map((val, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1">
                <div 
                  className={`w-4 rounded-t-sm transition-all duration-300 ${idx === 4 ? 'bg-indigo-500' : 'bg-slate-700'}`}
                  style={{ height: `${val}%` }}
                ></div>
                <span className="text-[8px] text-slate-600 scale-90 mt-1">
                  {idx === 0 ? '8a' : idx === 2 ? '10a' : idx === 4 ? '12p' : idx === 6 ? '2p' : ''}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Zone Capacity Breakdowns */}
      <div className="space-y-2.5 pt-2 border-t border-slate-800/50">
        {zones.map((zone) => (
          <div key={zone.name} className="text-xs">
            <div className="flex justify-between text-slate-400 mb-1 text-[11px]">
              <span>{zone.name}</span>
              <span className="font-medium text-slate-200">{zone.current}/{zone.max}</span>
            </div>
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${zone.color}`} 
                style={{ width: `${(zone.current / zone.max) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}