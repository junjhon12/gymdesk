// src/data/mockData.ts

export const peakHours = [6, 7, 8, 5, 4, 9, 10, 6, 3, 2, 4, 8];
export const peakLabels = ["6a", "7a", "8a", "9a", "10a", "11a", "12p", "1p", "2p", "3p", "4p", "5p"];

export const classes = [
  { name: "HIIT Blast", time: "9:00 AM", trainer: "Coach Dana", enrolled: 18, capacity: 20, waitlist: 3 },
  { name: "Yoga Flow", time: "10:30 AM", trainer: "Coach Mia", enrolled: 12, capacity: 15, waitlist: 0 },
  { name: "Spin Cycle", time: "12:00 PM", trainer: "Coach Ray", enrolled: 20, capacity: 20, waitlist: 7 },
  { name: "Strength 101", time: "5:30 PM", trainer: "Coach Dana", enrolled: 8, capacity: 12, waitlist: 0 },
];

export const bookings = [
  { type: "PT", member: "Marcus Webb", trainer: "Coach Ray", time: "8:00 AM", status: "confirmed" },
  { type: "PT", member: "Lena Cho", trainer: "Coach Dana", time: "11:00 AM", status: "confirmed" },
  { type: "Room", member: "Spin Studio A", trainer: "—", time: "12:00 PM", status: "booked" },
  { type: "PT", member: "Tyler Brooks", trainer: "Coach Mia", time: "3:00 PM", status: "pending" },
];

export const checkIns = [
  { name: "Lena Cho", status: "active", time: "2 min ago", initials: "LC", color: "#2563eb" }, // blue
  { name: "Marcus Webb", status: "active", time: "8 min ago", initials: "MW", color: "#7c3aed" }, // purple
  { name: "Fatima Al-Rashid", status: "expired", time: "12 min ago", initials: "FA", color: "#dc2626" }, // red
  { name: "Tyler Brooks", status: "active", time: "21 min ago", initials: "TB", color: "#059669" }, // emerald
  { name: "Yuki Tanaka", status: "active", time: "34 min ago", initials: "YT", color: "#d97706" }, // amber
];

export const alerts = [
  { type: "expired", message: "Carlos Rivera's membership expired 2 days ago", urgent: true },
  { type: "billing", message: "Declined payment — Aisha Patel ($49.99)", urgent: true },
  { type: "waiver", message: "Tom Nguyen hasn't signed liability waiver", urgent: false },
  { type: "contact", message: "Sara Kim missing emergency contact", urgent: false },
];

export const birthdays = [
  { name: "James Okafor", date: "Today 🎂", milestone: null },
  { name: "Priya Mehta", date: "Tomorrow", milestone: "100th visit 🏆" },
  { name: "Ben Carter", date: "Jun 22", milestone: null },
];

export const expiringMembers = [
  { name: "Carlos Rivera", plan: "Monthly", expiry: "Jun 21", daysLeft: 3 },
  { name: "Aisha Patel", plan: "Annual", expiry: "Jun 25", daysLeft: 7 },
  { name: "Tom Nguyen", plan: "Monthly", expiry: "Jun 28", daysLeft: 10 },
  { name: "Sara Kim", plan: "Monthly", expiry: "Jun 30", daysLeft: 12 },
];

export const initialTasks = [
  { id: 1, text: "Follow up with Derek Liu (no visit in 30 days)", priority: "high", done: false },
  { id: 2, text: "Call Carlos Rivera about expired membership", priority: "high", done: false },
  { id: 3, text: "Send welcome email to new members this week", priority: "medium", done: false },
  { id: 4, text: "Review guest leads from Saturday", priority: "medium", done: true },
  { id: 5, text: "Update class schedule for July", priority: "low", done: true },
];

export const staff = [
  { name: "Coach Dana", role: "Trainer", shift: "7AM – 3PM", status: "on" },
  { name: "Coach Mia", role: "Trainer", shift: "9AM – 5PM", status: "on" },
  { name: "Coach Ray", role: "Trainer", shift: "11AM – 7PM", status: "off" },
  { name: "Alex Front", role: "Front Desk", shift: "6AM – 2PM", status: "on" },
];

export const payrollData = [
  { name: "Coach Dana", sessions: 38, rate: 25, bonus: 150 },
  { name: "Coach Mia", sessions: 24, rate: 25, bonus: 0 },
  { name: "Coach Ray", sessions: 31, rate: 25, bonus: 75 },
];

export const overduePayments = [
  { name: "Carlos Rivera", amount: 49.99, overdueDays: 5, plan: "Monthly" },
  { name: "Aisha Patel", amount: 49.99, overdueDays: 2, plan: "Monthly" },
  { name: "Greg Mason", amount: 499.99, overdueDays: 14, plan: "Annual" },
];

export const dailySales = [
  { item: "Day Pass", qty: 4, total: 60 },
  { item: "Protein Shake", qty: 7, total: 49 },
  { item: "New Monthly Membership", qty: 2, total: 99.98 },
  { item: "Resistance Bands", qty: 3, total: 44.97 },
];

// Re-exporting the comprehensive mockStats we used at the very beginning
export const revenueStats = {
  week: { revenue: 420 },
  month: { revenue: 3840 },
  year: { revenue: 38200 },
};

export const recentActivity = [
  { name: "James Okafor", action: "joined", plan: "Annual", time: "2h ago", type: "join" },
  { name: "Maria Santos", action: "renewed", plan: "Monthly", time: "5h ago", type: "renew" },
  { name: "Derek Liu", action: "deactivated", plan: "Monthly", time: "Yesterday", type: "cancel" },
  { name: "Priya Mehta", action: "joined", plan: "Monthly", time: "Yesterday", type: "join" },
  { name: "Ben Carter", action: "renewed", plan: "Annual", time: "2 days ago", type: "renew" },
];

// Finance
export const mockSummary = {
  totalRevenue: 3840,
  growthPct: 2.4,
  collected: 3240,
  outstanding: 599.97,
  transactionsCount: 55,
};

export const mockOverduePayments = [
  { id: 1, name: "Carlos Rivera", plan: "Monthly", amount: 49.99, daysOverdue: 5, lastContacted: "Never contacted" },
  { id: 2, name: "Aisha Patel", plan: "Monthly", amount: 49.99, daysOverdue: 2, lastContacted: "Jun 14" },
  { id: 3, name: "Greg Mason", plan: "Annual", amount: 499.99, daysOverdue: 14, lastContacted: "Jun 02" },
];

export const mockTransactions = [
  { id: "TXN-0041", member: "James Okafor", description: "Membership Renewal", amount: 499.99, method: "Card", status: "Paid", date: "2026-06-01" },
  { id: "TXN-0042", member: "Maria Santos", description: "Membership Renewal", amount: 49.99, method: "Card", status: "Paid", date: "2026-06-10" },
  { id: "TXN-0043", member: "Walk-in", description: "Day Pass", amount: 15.00, method: "Cash", status: "Paid", date: "2026-06-11" },
  { id: "TXN-0044", member: "Aisha Patel", description: "Membership Renewal", amount: 49.99, method: "Card", status: "Failed", date: "2026-06-12" },
  { id: "TXN-0045", member: "Priya Mehta", description: "Membership Renewal", amount: 49.99, method: "Card", status: "Paid", date: "2026-06-15" },
  { id: "TXN-0046", member: "Walk-in", description: "Protein Shake x3", amount: 20.97, method: "Cash", status: "Paid", date: "2026-06-15" },
  { id: "TXN-0047", member: "Tyler Brooks", description: "Membership Renewal", amount: 49.99, method: "Card", status: "Paid", date: "2026-06-05" },
  { id: "TXN-0048", member: "Carlos Rivera", description: "Membership Renewal", amount: 49.99, method: "Card", status: "Overdue", date: "2026-06-01" },
  { id: "TXN-0049", member: "Walk-in", description: "Resistance Bands x2", amount: 29.98, method: "Cash", status: "Paid", date: "2026-06-16" },
  { id: "TXN-0050", member: "Greg Mason", description: "Membership Renewal", amount: 499.99, method: "Card", status: "Overdue", date: "2026-06-01" },
  { id: "TXN-0051", member: "Ben Carter", description: "Membership Renewal", amount: 499.99, method: "Card", status: "Paid", date: "2026-05-30" },
  { id: "TXN-0052", member: "Lena Cho", description: "Membership Renewal", amount: 49.99, method: "Card", status: "Paid", date: "2026-06-12" },
  { id: "TXN-0053", member: "Walk-in", description: "Day Pass", amount: 15.00, method: "Cash", status: "Paid", date: "2026-06-17" },
  { id: "TXN-0054", member: "Marcus Webb", description: "PT Session x4", amount: 200.00, method: "Card", status: "Paid", date: "2026-06-01" },
  { id: "TXN-0055", member: "Fatima Al-Rashid", description: "Membership Renewal", amount: 49.99, method: "Card", status: "Overdue", date: "2026-06-01" },
];

export const mockMonthlyTrend = [
  { month: "Jan", amount: 3100, heightPct: "70%" },
  { month: "Feb", amount: 3250, heightPct: "75%" },
  { month: "Mar", amount: 3400, heightPct: "82%" },
  { month: "Apr", amount: 3600, overTarget: 100, heightPct: "88%" },
  { month: "May", amount: 3750, overTarget: 250, heightPct: "92%" },
  { month: "Jun", amount: 3840, overTarget: 340, heightPct: "100%", isCurrent: true },
];

export const mockRevenueTypes = [
  { label: "Monthly Memberships", share: 46, amount: 1749.65, color: "bg-blue-500", textDot: "text-blue-500" },
  { label: "Annual Memberships", share: 39, amount: 1499.97, color: "bg-purple-500", textDot: "text-purple-500" },
  { label: "PT Sessions", share: 10, amount: 400.00, color: "bg-amber-500", textDot: "text-amber-500" },
  { label: "POS / Day Passes", share: 5, amount: 195.93, color: "bg-green-500", textDot: "text-green-500" },
];