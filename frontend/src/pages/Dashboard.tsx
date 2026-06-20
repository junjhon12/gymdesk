import { useState } from "react";
import ChatBox from "../components/chat/ChatBox";
import Panel from "../components/dashboard/Panel";
import StatCard from "../components/dashboard/StatCard";
import LiveOccupancy from "../components/dashboard/LiveOccupancy";
import ClassRosters from "../components/dashboard/ClassRosters";
import BookingsList from "../components/dashboard/BookingsList";
import CheckInLog from "../components/dashboard/CheckInLog";
import AlertsFlags from "../components/dashboard/AlertsFlags";
import MemberNotices from "../components/dashboard/MemberNotices";
import MyTasks from "../components/dashboard/MyTasks";
import PayrollCommissions from "../components/dashboard/PayrollCommissions";
import StaffRoster from "../components/dashboard/StaffRoster";
import DailySales from "../components/dashboard/DailySales";
import OverduePayments from "../components/dashboard/OverduePayments";
import RevenueSummary from "../components/dashboard/RevenueSummary";
import RecentActivity from "../components/dashboard/RecentActivity";

const mockStats = {
  activeMembers: 187,
  inactiveMembers: 23,
  newMembers: 14,
  revenue: 3840,
  reneweals: 5,
  cancellations: 1,
  expiringSoon: 9,
  retentionRate: 84,
  totalMember: 210,
};

function Dashboard() {
  const [tab, setTab] = useState("month");
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="h-full flex flex-col relative pb-20">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 text-xs mt-1">
          Thursday, June 18, 2026 · Good morning 👋
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-1 bg-[#0f1117] border border-gray-800 rounded-lg p-1 w-fit mb-6">
        {["week", "month", "year"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-md text-xs font-medium transition-colors ${
              tab === t
                ? "bg-gray-800 text-white"
                : "bg-transparent text-gray-500 hover:text-gray-300"
            }`}
          >
            This {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          label="Active Members"
          value={mockStats.activeMembers}
          sub={`${mockStats.inactiveMembers} inactive`}
          colorClass="text-green-500"
          bgGradientClass="bg-gradient-to-br from-[#0f1117] to-green-900/10 border-green-500/20"
        />
        <StatCard
          label="New Members"
          value={mockStats.newMembers}
          sub="joined this month"
          colorClass="text-blue-500"
          bgGradientClass="bg-gradient-to-br from-[#0f1117] to-blue-900/10 border-blue-500/20"
        />
        <StatCard
          label="Renewels"
          value={mockStats.reneweals}
          sub="renewed this month"
          colorClass="text-blue-200"
          bgGradientClass="bg-gradient-to-br from-[#0f1117] to-blue-900/10 border-blue-500/20"
        />
        <StatCard
          label="Cancellations"
          value={mockStats.cancellations}
          sub="deactivated this month"
          colorClass="text-red-400"
          bgGradientClass="bg-gradient-to-br from-[#0f1117] to-red-900/10 border-red-500/20"
        />
        <StatCard
          label="Expiring Soon"
          value={mockStats.expiringSoon}
          sub="memberships expiring"
          colorClass="text-yellow-200"
          bgGradientClass="bg-gradient-to-br from-[#0f1117] to-yellow-900/10 border-yellow-500/20"
        />
        <StatCard
          label="Retention Rate"
          value={`${mockStats.retentionRate}%`}
          sub="members retained"
          colorClass="text-purple-400"
          bgGradientClass="bg-gradient-to-br from-[#0f1117] to-purple-900/10 border-purple-500/20"
        />
        <StatCard
          label="Revenue"
          value={`$${mockStats.revenue}`}
          sub="this month"
          colorClass="text-emerald-500"
          bgGradientClass="bg-gradient-to-br from-[#0f1117] to-emerald-900/10 border-emerald-500/20"
        />
        <StatCard
          label="Total Members"
          value={mockStats.activeMembers + mockStats.inactiveMembers}
          sub="all time"
          colorClass="text-indigo-500"
          bgGradientClass="bg-gradient-to-br from-[#0f1117] to-indigo-900/10 border-indigo-500/20"
        />
      </div>
      <div className="text-amber-50 py-2 text-sm">-- Operations & Scheduling</div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Panel>
          <LiveOccupancy />
        </Panel>
        <Panel>
          <ClassRosters />
        </Panel>
        <Panel>
          <BookingsList />
        </Panel>
      </div>
      <div className="text-amber-50 py-2 text-sm">-- Member Management & Front Desk</div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Panel>
          <CheckInLog/>
        </Panel>
        <Panel>
          {/* Alerts & Flags */}
          <AlertsFlags/>
        </Panel>
        <MemberNotices/>
      </div>
      <div className="text-amber-50 py-2 text-sm">-- Staff & Task Management</div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Panel>
          <MyTasks/>
        </Panel>
        <Panel>
          <StaffRoster/>
        </Panel>
        <Panel>
          <PayrollCommissions/>
        </Panel>
      </div>
      <div className="text-amber-50 py-2 text-sm">-- Sales & Finance</div>
      {/* Staff & Task Management */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Panel>
          <OverduePayments/>
        </Panel>
        <Panel>
          <DailySales/>
        </Panel>
        <Panel>
          <RevenueSummary currentTab={tab}/>
        </Panel>
      </div>
      
      <RecentActivity/>
      
      {/* AI Chat Box & Toggle Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
        {/* Resizable Chat Window */}
        {isChatOpen && (
          <div
            className="bg-[#0a0d14] border border-gray-800 rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.7)] flex flex-col resize overflow-hidden"
            style={{
              width: "320px",
              height: "420px",
              minWidth: "280px", // Prevents shrinking too small
              minHeight: "300px",
              maxWidth: "80vw", // Prevents growing beyond screen width
              maxHeight: "80vh",
            }}
          >
            {/* Optional Window Header (if not already built inside ChatBox) */}
            <div className="bg-[#0f1117] border-b border-gray-800 px-4 py-3 flex justify-between items-center shrink-0">
              <div>
                <p className="m-0 text-sm font-semibold text-white">
                  🤖 GymDesk AI
                </p>
                <p className="m-0 text-[10px] text-gray-400">
                  Ask anything about your members
                </p>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Chat Content Area */}
            <div className="flex-1 relative overflow-hidden bg-[#0a0d14]">
              <ChatBox />
            </div>
          </div>
        )}

        {/* Floating Action Button (Toggle) */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-[0_4px_20px_rgba(29,78,216,0.5)] flex items-center justify-center text-2xl transition-all duration-200 hover:scale-105 active:scale-95"
        >
          {isChatOpen ? "✕" : "🤖"}
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
