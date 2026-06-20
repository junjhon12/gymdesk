import { recentActivity } from '../../data/mockData';
import Panel from './Panel';

export default function RecentActivity() {
  // Map the action types to specific Tailwind background colors
  const typeColors: Record<string, string> = {
    join: "bg-green-500",
    renew: "bg-blue-500",
    cancel: "bg-red-500"
  };

  return (
    <Panel className="mt-4">
      <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 m-0">
        Recent Member Activity
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {recentActivity.map((activity, index) => (
          <div key={index} className="flex gap-2.5 items-start">
            {/* Status Dot */}
            <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${typeColors[activity.type]}`} />
            
            {/* Activity Details */}
            <div>
              <div className="text-[11px] font-medium text-gray-200">{activity.name}</div>
              <div className="text-[10px] text-gray-400 mt-0.5">{activity.action} · {activity.plan}</div>
              <div className="text-[9px] text-gray-600 mt-1">{activity.time}</div>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}