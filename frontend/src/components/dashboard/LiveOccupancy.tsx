import { peakHours, peakLabels } from '../../data/mockData';

export default function LiveOccupancy() {
  const max = Math.max(...peakHours);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest m-0">Live Occupancy</h2>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-900/30 text-green-400">
          47 inside
        </span>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="text-center">
          <div className="text-4xl font-bold text-green-500 leading-none">47</div>
          <div className="text-[10px] text-gray-500 mt-1">/ 120 cap</div>
        </div>
        <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div className="w-[39%] h-full bg-green-500 rounded-full" />
        </div>
      </div>

      <div className="text-[11px] text-gray-500 mb-2">Peak Hours Today</div>
      
      {/* Peak Hours Bar Chart */}
      <div>
        <div className="flex items-end gap-1 h-14 mb-1">
          {peakHours.map((v, i) => {
            const pct = v / max;
            const isCurrent = i === 6; // Mocking current time as index 6
            return (
              <div key={i} className="flex-1 flex flex-col justify-end h-full">
                <div 
                  className={`rounded-t-[3px] transition-all duration-300 min-h-[4px] ${isCurrent ? 'bg-blue-600 border border-blue-500' : 'bg-gray-800'}`}
                  style={{ height: `${pct * 100}%` }} 
                />
              </div>
            );
          })}
        </div>
        <div className="flex gap-1">
          {peakLabels.map((l, i) => (
            <div key={i} className={`flex-1 text-center text-[9px] ${i === 6 ? 'text-blue-500 font-bold' : 'text-gray-600'}`}>
              {l}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}