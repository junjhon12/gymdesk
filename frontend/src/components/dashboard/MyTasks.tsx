import { useState } from 'react';
import { initialTasks } from '../../data/mockData';

export default function MyTasks() {
  const [tasks, setTasks] = useState(initialTasks);
  const pendingCount = tasks.filter(t => !t.done).length;

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest m-0">My Tasks</h2>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-900/30 text-blue-400">
          {pendingCount} pending
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {tasks.map((t) => (
          <div 
            key={t.id} 
            onClick={() => toggleTask(t.id)}
            className={`flex items-start gap-3 p-2 rounded-lg cursor-pointer transition-all hover:bg-gray-800/30 ${
              t.done ? "opacity-50" : "opacity-100"
            }`}
          >
            {/* Custom Checkbox */}
            <div className={`w-4 h-4 mt-0.5 rounded shrink-0 border flex items-center justify-center transition-colors ${
              t.done ? "bg-green-500/20 border-green-500 text-green-500" : "border-gray-600"
            }`}>
              {t.done && <span className="text-[10px] font-bold">✓</span>}
            </div>

            <div className={`flex-1 text-[11px] leading-snug ${t.done ? "line-through text-gray-500" : "text-gray-200"}`}>
              {t.text}
            </div>

            <span className={`text-[9px] px-2 py-0.5 rounded-full shrink-0 ${
              t.priority === "high" ? "bg-red-900/30 text-red-400" : 
              t.priority === "medium" ? "bg-orange-900/30 text-orange-400" : 
              "bg-gray-800 text-gray-400"
            }`}>
              {t.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}