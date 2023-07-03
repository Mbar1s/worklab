import { useState, useEffect } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { format, parseISO, subDays } from "date-fns";
interface Progress {
  date: string;
  completed: boolean;
  _id: string;
  timeWorked: string;
}
interface ChartProps {
  progress: Progress[];
}
export default function Chart({ progress }: ChartProps): JSX.Element {
  console.log(progress);

  const data: { date: string; value: string }[] = [];

  for (let i = 0; i < 7; i++) {
    if (progress[progress.length - i] !== undefined) {
      data.push({
        date: subDays(parseISO(progress[progress.length - i]?.date), 1)
          .toISOString()
          .substring(0, 10),
        value: progress[progress.length - i]?.timeWorked,
      });
    } else {
      data.push({
        date: "0",
        value: "0",
      });
    }
  }
  data.reverse();

  return (
    <div className="mt-10">
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#03fc88" stopOpacity={0.4} />
              <stop offset="75%" stopColor="#03fc88" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <Area dataKey="value" stroke="#03fc88" fill="url(#color)" />
          <XAxis dataKey="date" axisLine={false} tickLine={false} />
          <YAxis
            dataKey="value"
            axisLine={false}
            tickLine={false}
            tickCount={5}
            domain={[0, 180]}
          />
          <Tooltip />
          <CartesianGrid opacity={0.2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
