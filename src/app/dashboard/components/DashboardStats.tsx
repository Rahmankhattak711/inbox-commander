"use client";

import { ReactNode } from "react";

interface Stat {
  label: string;
  value: number;
  icon: ReactNode;
  color: string;
  bg: string;
  borderColor: string;
}

interface DashboardStatsProps {
  stats: Stat[];
  isLoading: boolean;
}

export default function DashboardStats({ stats, isLoading }: DashboardStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="group relative flex items-center justify-between p-5 md:p-6 rounded-3xl transition-all duration-300 overflow-hidden"
          style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}
        >
          {/* Glossy watermark icon */}
          <div
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-28 h-28 opacity-[0.03] pointer-events-none transition-transform duration-500 group-hover:scale-[1.3] group-hover:-rotate-12"
            style={{ color: stat.color }}
          >
            {stat.icon}
          </div>

          <div className="relative z-10 flex flex-col">
            <p
              className="text-[10px] font-bold tracking-widest uppercase mb-1"
              style={{ color: "var(--text-secondary)" }}
            >
              {stat.label}
            </p>
            <p className="text-3xl font-black tracking-tight" style={{ color: stat.color }}>
              {isLoading ? (
                <span
                  className="inline-block w-12 h-8 rounded-lg animate-pulse"
                  style={{ background: stat.bg }}
                />
              ) : (
                stat.value
              )}
            </p>
          </div>

          <div
            className="relative z-10 w-12 h-12 rounded-[1rem] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
            style={{ background: stat.bg, color: stat.color, border: `1px solid ${stat.borderColor}` }}
          >
            {stat.icon}
          </div>
        </div>
      ))}
    </div>
  );
}
