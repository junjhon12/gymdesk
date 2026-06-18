import React from 'react';

interface PanelProps {
  children: React.ReactNode;
  className?: string;
}

export default function Panel({ children, className = '' }: PanelProps) {
  return (
    <div className={`bg-[#0f1117] border border-gray-800 rounded-xl p-5 ${className}`}>
      {children}
    </div>
  );
}