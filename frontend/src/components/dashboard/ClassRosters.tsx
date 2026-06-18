import { classes } from '../../data/mockData';

export default function ClassRosters() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest m-0">Class Rosters</h2>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-900/30 text-blue-400">
          Today
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {classes.map((c, i) => {
          const full = c.enrolled >= c.capacity;
          const pct = (c.enrolled / c.capacity) * 100;
          
          return (
            <div key={i} className={`pb-2 ${i < classes.length - 1 ? 'border-b border-gray-800/50' : ''}`}>
              <div className="flex justify-between items-start mb-1">
                <div>
                  <span className="text-xs font-semibold text-gray-200">{c.name}</span>
                  <span className="text-[10px] text-gray-500 ml-2">{c.time} · {c.trainer}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`text-[11px] ${full ? 'text-red-400' : 'text-gray-400'}`}>
                    {c.enrolled}/{c.capacity}
                  </span>
                  {c.waitlist > 0 && (
                    <span className="text-[9px] bg-orange-950 text-orange-400 px-1.5 py-0.5 rounded-full">
                      +{c.waitlist} wait
                    </span>
                  )}
                </div>
              </div>
              <div className="h-1 bg-gray-800 rounded-full mt-1">
                <div 
                  className={`h-full rounded-full ${full ? 'bg-red-500' : 'bg-blue-500'}`} 
                  style={{ width: `${pct}%` }} 
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}