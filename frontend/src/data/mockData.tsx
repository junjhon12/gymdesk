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