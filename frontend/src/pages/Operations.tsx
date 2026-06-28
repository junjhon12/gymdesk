import LiveOccupancyZone from '../components/operations/LiveOccupancyZone';
import ClassRostersCard from '../components/operations/ClassRostersCard';
import BookingsCard from '../components/operations/BookingsCard';

export default function Operations() {
  return (
    <div className="min-h-screen bg-[#0d0f12] text-slate-100 p-6 font-sans">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Operations</h1>
        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
          Sunday, June 28, 2026 · Good morning <span className="text-amber-400">☀️</span>
        </p>
      </div>

      {/* ================= SECTION 1: OPERATIONS & SCHEDULING ================= */}
      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
        -- Operations & Scheduling
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <LiveOccupancyZone />
        <ClassRostersCard />
        <BookingsCard />
      </div>

      {/* ================= SECTION 2: STAFF & MAINTENANCE STAFF PLACEHOLDER ================= */}
      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
        -- Staff & Maintenance (Awaiting Componentization...)
      </div>
      
      <div className="text-slate-500 text-xs italic p-4 border border-dashed border-slate-800 rounded-xl">
        Remaining content section active below...
      </div>
    </div>
  );
}