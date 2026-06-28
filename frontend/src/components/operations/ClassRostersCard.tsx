
export default function ClassRostersCard() {
  const classes = [
    { name: 'HIIT Blast', time: '9:00 AM', coach: 'Coach Dana', count: '18/20', wait: '+3 wait', fill: 90, barColor: 'bg-indigo-500' },
    { name: 'Yoga Flow', time: '10:30 AM', coach: 'Coach Mia', count: '12/15', wait: null, fill: 80, barColor: 'bg-indigo-500' },
    { name: 'Spin Cycle', time: '12:00 PM', coach: 'Coach Ray', count: '20/20', wait: '+7 wait', fill: 100, barColor: 'bg-rose-500' },
    { name: 'Strength 101', time: '5:30 PM', coach: 'Coach Dana', count: '8/12', wait: null, fill: 66, barColor: 'bg-indigo-500' },
  ];

  return (
    <div className="bg-[#13161c] border border-slate-800/60 rounded-xl p-5 h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Class Rosters</h3>
        <span className="text-indigo-400 text-[11px] font-medium bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-900/30">Today</span>
      </div>
      
      <div className="space-y-3.5">
        {classes.map((cls, i) => (
          <div key={i}>
            <div className="flex justify-between items-start mb-1.5">
              <div>
                <h4 className="text-xs font-bold text-slate-200">
                  {cls.name} 
                  <span className="text-[10px] font-normal text-slate-400 ml-1">
                    {cls.time} · {cls.coach}
                  </span>
                </h4>
              </div>
              <div className="flex items-center gap-1.5 text-right">
                <span className="text-xs font-semibold text-slate-300">{cls.count}</span>
                {cls.wait && (
                  <span className="bg-amber-950 text-amber-400 text-[9px] font-bold px-1.5 py-0.5 rounded border border-amber-800/30">
                    {cls.wait}
                  </span>
                )}
              </div>
            </div>
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${cls.barColor}`} style={{ width: `${cls.fill}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}