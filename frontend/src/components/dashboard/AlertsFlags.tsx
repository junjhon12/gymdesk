import { alerts } from '../../data/mockData';

const ICONS: Record<string, string> = { expired: "⚠️", billing: "💳", waiver: "📄", contact: "📞" };

export default function AlertsFlags() {
  const urgentCount = alerts.filter(a => a.urgent).length;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest m-0">Alerts & Flags</h2>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-900/30 text-red-400">
          {urgentCount} urgent
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {alerts.map((a, i) => (
          <div key={i} className={`flex items-start gap-2 p-2.5 rounded-lg border ${
            a.urgent ? "bg-red-950/20 border-red-900/50" : "bg-gray-800/20 border-gray-800"
          }`}>
            <span className="text-sm shrink-0">{ICONS[a.type]}</span>
            <p className={`m-0 text-[11px] leading-snug ${a.urgent ? "text-red-300" : "text-gray-400"}`}>
              {a.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}