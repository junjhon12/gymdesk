interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  colorClass: string; // e.g., "text-green-500", "border-green-500/20"
  bgGradientClass: string; 
}

export default function StatCard({ label, value, sub, colorClass, bgGradientClass }: StatCardProps) {
  return (
    <div className={`border rounded-xl p-4 ${bgGradientClass}`}>
      <p className="m-0 mb-2 text-[10px] text-gray-500 uppercase tracking-[0.08em] font-semibold">
        {label}
      </p>
      <p className={`m-0 text-3xl font-bold ${colorClass}`}>
        {value}
      </p>
      {sub && <p className="m-0 mt-1 text-xs text-gray-400">{sub}</p>}
    </div>
  );
}