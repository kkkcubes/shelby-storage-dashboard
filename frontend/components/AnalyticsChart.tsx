"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    day: "Mon",
    uploads: 2,
  },
  {
    day: "Tue",
    uploads: 5,
  },
  {
    day: "Wed",
    uploads: 7,
  },
  {
    day: "Thu",
    uploads: 4,
  },
  {
    day: "Fri",
    uploads: 9,
  },
];

export default function AnalyticsChart() {
  return (
    <div className="bg-slate-900 p-6 rounded-2xl">
      <h2 className="text-2xl font-bold mb-6">
        Upload Analytics
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <LineChart data={data}>
          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="uploads"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}