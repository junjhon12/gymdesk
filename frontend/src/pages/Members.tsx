import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { Member, MemberCreate } from "../types";
import { membersApi } from "../services/api";
import Avatar from "../components/ui/Avatar";
import AddMemberModal from "../components/members/AddMemberModal";

// ─── HELPER FUNCTIONS & MINI-COMPONENTS ──────────────────────────────────────

function getDaysUntil(dateStr?: string | null) {
  if (!dateStr) return null;
  const diff = new Date(dateStr).getTime() - new Date().getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function StatusBadge({ status, expiryDate }: { status: string; expiryDate?: string | null }) {
  const daysLeft = getDaysUntil(expiryDate);
  const isActive = status.toLowerCase() === "active";
  const isExpiringSoon = isActive && daysLeft !== null && daysLeft <= 14;

  if (isExpiringSoon) return (
    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-orange-950 text-orange-400 border border-orange-900 whitespace-nowrap">
      ⚠ Expires in {daysLeft}d
    </span>
  );
  if (isActive) return (
    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-green-950 text-green-400 border border-green-900 whitespace-nowrap">
      ● Active
    </span>
  );
  return (
    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-red-950 text-red-400 border border-red-900 whitespace-nowrap">
      ● Inactive
    </span>
  );
}

function PlanBadge({ type }: { type: string }) {
  const isAnnual = type.toLowerCase().includes("annual");
  return (
    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full capitalize whitespace-nowrap border ${
      isAnnual ? "bg-purple-950/30 text-purple-400 border-purple-900" : "bg-blue-950/30 text-blue-400 border-blue-900"
    }`}>
      {type}
    </span>
  );
}

function StatPill({ label, value, colorClass, borderClass, bgClass }: {
  label: string;
  value: string | number;
  colorClass: string;
  borderClass: string;
  bgClass: string;
}) {
  return (
    <div className={`bg-[#0f1117] border ${borderClass} rounded-xl p-3 md:p-4 text-center bg-linear-to-br from-[#0f1117] to-transparent ${bgClass}`}>
      <div className={`text-2xl font-bold ${colorClass}`}>{value}</div>
      <div className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest">{label}</div>
    </div>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function Members() {
  const navigate = useNavigate();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatus] = useState("all");
  const [planFilter, setPlan] = useState("all");
  const [sortBy, setSortBy] = useState("joined");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [showAddModal, setShowAdd] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const data = await membersApi.getAll();
        setMembers(data);
      } catch {
        setError("Failed to load members.");
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const handleAddMember = async (data: MemberCreate) => {
    try {
      const newMember = await membersApi.create(data);
      setMembers(prev => [newMember, ...prev]);
      setShowAdd(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      alert("Failed to add member");
    }
  };

  const filtered = useMemo(() => {
    return members
      .filter(m => {
        const matchSearch = m.full_name.toLowerCase().includes(search.toLowerCase()) ||
                            m.email.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === "all" || m.status.toLowerCase() === statusFilter.toLowerCase();
        const isAnnual = m.membership_type.toLowerCase().includes("annual");
        const planCategory = isAnnual ? "annual" : "monthly";
        const matchPlan = planFilter === "all" || planCategory === planFilter;
        
        return matchSearch && matchStatus && matchPlan;
      })
      .sort((a, b) => {
        if (sortBy === "name") return a.full_name.localeCompare(b.full_name);
        if (sortBy === "joined") return new Date(b.join_date).getTime() - new Date(a.join_date).getTime();
        // Fallback for last_payment_date safely
        if (sortBy === "payment") {
          const dateA = a.last_payment_date ? new Date(a.last_payment_date).getTime() : 0;
          const dateB = b.last_payment_date ? new Date(b.last_payment_date).getTime() : 0;
          return dateB - dateA;
        }
        return 0;
      });
  }, [members, search, statusFilter, planFilter, sortBy]);

  const activeCount = members.filter(m => m.status === "active").length;
  const inactiveCount = members.filter(m => m.status === "inactive").length;
  const annualCount = members.filter(m => m.membership_type.toLowerCase().includes("annual")).length;
  const manualCount = members.filter(m => m.membership_type.toLowerCase().includes("monthly")).length;
  const expiringSoon = members.filter(m => {
    const expiryDate = (m as { expiry_date?: string | null }).expiry_date;
    const d = getDaysUntil(expiryDate);
    return d !== null && d <= 14;
  }).length;

  return (
    <div className="h-full flex flex-col relative pb-10">
      
      {/* ── Page Header ── */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white m-0">Members</h1>
          <p className="text-xs text-gray-400 mt-1 m-0">
            {members.length} total members · {filtered.length} shown
          </p>
        </div>
        <button 
          onClick={() => setShowAdd(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-blue-900/20 flex items-center gap-2"
        >
          + Add Member
        </button>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatPill label="Active" value={activeCount} colorClass="text-green-500" borderClass="border-green-900/30" bgClass="to-green-900/5" />
        <StatPill label="Inactive" value={inactiveCount} colorClass="text-red-500" borderClass="border-red-900/30" bgClass="to-red-900/5" />
        <StatPill label="Annual Plan" value={annualCount} colorClass="text-purple-400" borderClass="border-purple-900/30" bgClass="to-purple-900/5" />
        <StatPill label="Monthly Plan" value={manualCount} colorClass="text-purple-400" borderClass="border-purple-900/30" bgClass="to-purple-900/5" />
        <StatPill label="Expiring Soon" value={expiringSoon} colorClass="text-orange-400" borderClass="border-orange-900/30" bgClass="to-orange-900/5" />
      </div>

      {/* ── Filters & Controls ── */}
      <div className="flex flex-wrap items-center gap-3 bg-[#0f1117] border border-gray-800 rounded-xl p-3 mb-5">
        
        {/* Search */}
        <div className="relative flex-1 min-w-50">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">🔍</span>
          <input 
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-8 pr-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Status Toggle Buttons */}
        <div className="flex gap-1 bg-gray-800 rounded-lg p-1">
          {["all", "active", "inactive"].map(s => (
            <button 
              key={s} onClick={() => setStatus(s)}
              className={`px-3 py-1.5 rounded-md text-[11px] font-medium capitalize transition-colors ${
                statusFilter === s ? "bg-gray-700 text-white" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Plan Toggle Buttons */}
        <div className="flex gap-1 bg-gray-800 rounded-lg p-1">
          {["all", "monthly", "annual"].map(p => (
            <button 
              key={p} onClick={() => setPlan(p)}
              className={`px-3 py-1.5 rounded-md text-[11px] font-medium capitalize transition-colors ${
                planFilter === p ? "bg-gray-700 text-white" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <select 
          value={sortBy} onChange={e => setSortBy(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-[11px] text-gray-300 focus:outline-none focus:border-blue-500 cursor-pointer appearance-none"
        >
          <option value="joined">Sort: Newest</option>
          <option value="name">Sort: Name (A-Z)</option>
          <option value="payment">Sort: Last Payment</option>
        </select>

        {/* View Mode Toggle */}
        <div className="flex gap-1 bg-gray-800 rounded-lg p-1">
          {[
            { mode: "table", icon: "☰" },
            { mode: "grid", icon: "⊞" },
          ].map(({ mode, icon }) => (
            <button 
              key={mode} onClick={() => setViewMode(mode as any)}
              className={`w-7 h-7 flex items-center justify-center rounded-md text-sm transition-colors ${
                viewMode === mode ? "bg-gray-700 text-white" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>

      {/* ── Content Area ── */}
      {loading ? (
        <div className="text-gray-500 text-center py-12">Loading members...</div>
      ) : error ? (
        <div className="text-red-400 text-center py-12">{error}</div>
      ) : filtered.length === 0 ? (
        <div className="text-gray-500 text-center py-16 bg-[#0f1117] border border-dashed border-gray-800 rounded-xl">
          <div className="text-3xl mb-2">🔍</div>
          <div className="text-sm">No members match your current filters.</div>
        </div>
      ) : viewMode === "table" ? (
        /* TABLE VIEW */
        <div className="bg-[#0f1117] border border-gray-800 rounded-xl overflow-x-auto shadow-sm animate-in fade-in duration-300">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-800 bg-gray-900/30">
                {["Member", "Contact", "Plan", "Status", "Joined", "Last Payment", ""].map(h => (
                  <th key={h} className="px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {filtered.map((m) => (
                <tr 
                  key={m.id} 
                  onClick={() => navigate(`/members/${m.id}`)}
                  className="hover:bg-gray-800/40 cursor-pointer transition-colors group"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar initials={m.full_name.split(" ").map(n => n[0]).join("")} colorHex="#3b82f6" size={32} />
                      <div>
                        <div className="font-semibold text-gray-100">{m.full_name}</div>
                        <div className="text-[10px] text-gray-500">#{String(m.id).padStart(4, "0")}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-400">
                    <div>{m.email}</div>
                    <div className="text-[10px] mt-0.5">{m.phone || "—"}</div>
                  </td>
                  <td className="px-4 py-3"><PlanBadge type={m.membership_type} /></td>
                  <td className="px-4 py-3"><StatusBadge status={m.status} expiryDate={(m as { expiry_date?: string | null }).expiry_date} /></td>
                  <td className="px-4 py-3 text-gray-400">{m.join_date}</td>
                  <td className={`px-4 py-3 ${m.last_payment_date ? "text-gray-400" : "text-gray-600"}`}>
                    {m.last_payment_date || "—"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-[10px] px-2.5 py-1.5 rounded-md bg-gray-800 text-gray-400 hover:text-white transition-colors">
                      View →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-in fade-in duration-300">
          {filtered.map(m => (
            <div
              key={m.id}
              onClick={() => navigate(`/members/${m.id}`)}
              className="bg-[#0f1117] border border-gray-800 hover:border-gray-600 rounded-xl p-5 cursor-pointer transition-colors group flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <Avatar initials={m.full_name.split(" ").map(n => n[0]).join("")} colorHex="#3b82f6" size={42} />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-white truncate">{m.full_name}</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">#{String(m.id).padStart(4, "0")}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <StatusBadge status={m.status} expiryDate={(m as { expiry_date?: string | null }).expiry_date} />
                <PlanBadge type={m.membership_type} />
              </div>

              <div className="flex flex-col gap-1.5 mt-auto text-[11px]">
                <div className="flex justify-between text-gray-500">
                  <span>Email</span>
                  <span className="text-gray-400 truncate max-w-35">{m.email}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Joined</span>
                  <span className="text-gray-400">{m.join_date}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Last Payment</span>
                  <span className={m.last_payment_date ? "text-gray-400" : "text-gray-600"}>
                    {m.last_payment_date || "—"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddModal && (
        <AddMemberModal
          onClose={() => setShowAdd(false)}
          onSubmit={handleAddMember}
        />
      )}
    </div>
  );
}