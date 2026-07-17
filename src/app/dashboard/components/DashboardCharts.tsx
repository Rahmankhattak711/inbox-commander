import { BarChart3, CalendarDays, Inbox } from "lucide-react";

type PriorityCounts = {
  urgent: number;
  important: number;
  routine: number;
};

type DashboardChartsProps = {
  inboxCount: number;
  draftsCount: number;
  sentCount: number;
  events: Array<{ date: string }>;
  priorityCounts: PriorityCounts;
  todayKey: string;
  isLoading: boolean;
};

const chartWidth = 640;
const chartHeight = 230;
const chartTop = 24;
const chartBottom = 178;
const chartLeft = 48;
const chartRight = 16;
const chartPlotHeight = chartBottom - chartTop;

function getDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getNextSevenDays(todayKey: string) {
  const start = new Date(`${todayKey}T00:00:00`);
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return {
      key: getDateKey(date),
      label: date.toLocaleDateString("en-US", { weekday: "short" }),
    };
  });
}

function ChartLoadingState() {
  return (
    <div className="flex h-52 items-center justify-center text-xs text-[#718077]">
      Loading workspace signals...
    </div>
  );
}

export default function DashboardCharts({
  inboxCount,
  draftsCount,
  sentCount,
  events,
  priorityCounts,
  todayKey,
  isLoading,
}: DashboardChartsProps) {
  const workload = [
    { label: "Inbox", value: inboxCount },
    { label: "Drafts", value: draftsCount },
    { label: "Sent", value: sentCount },
    { label: "Meetings", value: events.length },
  ];
  const workloadMax = Math.max(...workload.map((item) => item.value), 1);
  const days = getNextSevenDays(todayKey);
  const eventCounts = days.map(
    (day) => events.filter((event) => event.date === day.key).length,
  );
  const eventMax = Math.max(...eventCounts, 1);
  const priorityTotal =
    priorityCounts.urgent + priorityCounts.important + priorityCounts.routine;

  return (
    <section className="grid gap-6 xl:grid-cols-[1.15fr_.85fr]">
      <div className="rounded-2xl border border-white/[0.09] bg-white/[0.025] p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium">Workload mix</p>
            <p className="mt-1 text-xs text-[#748178]">
              Live counts across your connected workspace.
            </p>
          </div>
          <BarChart3 className="size-5 text-emerald-200" aria-hidden="true" />
        </div>

        {isLoading ? (
          <ChartLoadingState />
        ) : (
          <svg
            className="mt-6 h-auto w-full"
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            role="img"
            aria-labelledby="workload-chart-title workload-chart-description"
          >
            <title id="workload-chart-title">Workspace workload mix</title>
            <desc id="workload-chart-description">
              Bar chart comparing inbox messages, drafts, sent emails, and
              meetings.
            </desc>
            {[0, 0.5, 1].map((fraction) => {
              const y = chartBottom - fraction * chartPlotHeight;
              return (
                <g key={fraction}>
                  <line
                    x1={chartLeft}
                    x2={chartWidth - chartRight}
                    y1={y}
                    y2={y}
                    stroke="rgba(255,255,255,0.09)"
                    strokeWidth="1"
                  />
                  <text
                    x={chartLeft - 10}
                    y={y + 4}
                    fill="#718077"
                    fontSize="11"
                    textAnchor="end"
                  >
                    {Math.round(workloadMax * fraction)}
                  </text>
                </g>
              );
            })}
            {workload.map((item, index) => {
              const slotWidth =
                (chartWidth - chartLeft - chartRight) / workload.length;
              const barWidth = Math.min(68, slotWidth * 0.55);
              const barHeight = (item.value / workloadMax) * chartPlotHeight;
              const x =
                chartLeft + index * slotWidth + (slotWidth - barWidth) / 2;
              const y = chartBottom - barHeight;

              return (
                <g key={item.label}>
                  <rect
                    x={x}
                    y={chartTop}
                    width={barWidth}
                    height={chartPlotHeight}
                    rx="10"
                    fill="rgba(255,255,255,0.035)"
                  />
                  <rect
                    x={x}
                    y={item.value ? y : chartBottom - 2}
                    width={barWidth}
                    height={item.value ? barHeight : 2}
                    rx="10"
                    fill="#6ee7b7"
                  />
                  <text
                    x={x + barWidth / 2}
                    y={item.value ? y - 9 : chartBottom - 11}
                    fill="#f4f7f5"
                    fontSize="12"
                    fontWeight="600"
                    textAnchor="middle"
                  >
                    {item.value}
                  </text>
                  <text
                    x={x + barWidth / 2}
                    y={chartBottom + 27}
                    fill="#94a199"
                    fontSize="11"
                    textAnchor="middle"
                  >
                    {item.label}
                  </text>
                </g>
              );
            })}
          </svg>
        )}
      </div>

      <div className="rounded-2xl border border-white/[0.09] bg-white/[0.025] p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium">Calendar load</p>
            <p className="mt-1 text-xs text-[#748178]">Next seven days.</p>
          </div>
          <CalendarDays
            className="size-5 text-emerald-200"
            aria-hidden="true"
          />
        </div>

        {isLoading ? (
          <ChartLoadingState />
        ) : (
          <svg
            className="mt-6 h-auto w-full"
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            role="img"
            aria-labelledby="calendar-chart-title calendar-chart-description"
          >
            <title id="calendar-chart-title">
              Calendar load for the next seven days
            </title>
            <desc id="calendar-chart-description">
              Bar chart showing scheduled meetings by day.
            </desc>
            <line
              x1={chartLeft}
              x2={chartWidth - chartRight}
              y1={chartBottom}
              y2={chartBottom}
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1"
            />
            {days.map((day, index) => {
              const slotWidth =
                (chartWidth - chartLeft - chartRight) / days.length;
              const barWidth = Math.min(44, slotWidth * 0.56);
              const barHeight =
                (eventCounts[index] / eventMax) * chartPlotHeight;
              const x =
                chartLeft + index * slotWidth + (slotWidth - barWidth) / 2;
              const y = chartBottom - barHeight;

              return (
                <g key={day.key}>
                  <rect
                    x={x}
                    y={day.key === todayKey ? chartTop : chartBottom - 2}
                    width={barWidth}
                    height={day.key === todayKey ? chartPlotHeight : 2}
                    rx="9"
                    fill={
                      day.key === todayKey
                        ? "rgba(110,231,183,0.12)"
                        : "rgba(255,255,255,0.035)"
                    }
                  />
                  <rect
                    x={x}
                    y={eventCounts[index] ? y : chartBottom - 2}
                    width={barWidth}
                    height={eventCounts[index] ? barHeight : 2}
                    rx="9"
                    fill={day.key === todayKey ? "#a7f3d0" : "#6ee7b7"}
                  />
                  <text
                    x={x + barWidth / 2}
                    y={eventCounts[index] ? y - 9 : chartBottom - 11}
                    fill="#f4f7f5"
                    fontSize="12"
                    fontWeight="600"
                    textAnchor="middle"
                  >
                    {eventCounts[index]}
                  </text>
                  <text
                    x={x + barWidth / 2}
                    y={chartBottom + 27}
                    fill={day.key === todayKey ? "#a7f3d0" : "#94a199"}
                    fontSize="11"
                    textAnchor="middle"
                  >
                    {day.label}
                  </text>
                </g>
              );
            })}
          </svg>
        )}

        <div className="mt-2 flex items-center gap-2 text-[10px] text-[#748178]">
          <span className="size-2 rounded-full bg-emerald-200" />
          Today
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.09] bg-white/[0.025] p-5 sm:p-6 xl:col-span-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium">Inbox priority distribution</p>
            <p className="mt-1 text-xs text-[#748178]">
              AI triage across {priorityTotal} visible inbox messages.
            </p>
          </div>
          <Inbox className="size-5 text-emerald-200" aria-hidden="true" />
        </div>
        <div
          className="mt-6 flex h-4 overflow-hidden rounded-full bg-white/[0.06]"
          role="img"
          aria-label={`Inbox priority distribution: ${priorityCounts.urgent} urgent, ${priorityCounts.important} important, ${priorityCounts.routine} routine`}
        >
          {[
            { label: "Urgent", value: priorityCounts.urgent, color: "#fda4af" },
            {
              label: "Important",
              value: priorityCounts.important,
              color: "#fcd34d",
            },
            {
              label: "Routine",
              value: priorityCounts.routine,
              color: "#6ee7b7",
            },
          ].map((item) => (
            <span
              key={item.label}
              className="transition-all"
              style={{
                width: priorityTotal
                  ? `${(item.value / priorityTotal) * 100}%`
                  : "0%",
                background: item.color,
              }}
            />
          ))}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            { label: "Urgent", value: priorityCounts.urgent, color: "#fda4af" },
            {
              label: "Important",
              value: priorityCounts.important,
              color: "#fcd34d",
            },
            {
              label: "Routine",
              value: priorityCounts.routine,
              color: "#6ee7b7",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-black/15 px-4 py-3"
            >
              <span className="flex items-center gap-2 text-xs text-[#94a199]">
                <span
                  className="size-2 rounded-full"
                  style={{ background: item.color }}
                />
                {item.label}
              </span>
              <span className="text-sm font-semibold text-white">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
