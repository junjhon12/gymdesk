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