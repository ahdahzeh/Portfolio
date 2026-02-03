"use client";

import { useState } from "react";
import { Card } from "@/components/ui";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { engagementTrend, activityData } from "@/lib/mock/admin";

const COLORS = ["#0d9488", "#14b8a6", "#2dd4bf"];

export default function KPIAnalyticsPage() {
  const [dateRange, setDateRange] = useState("6m");

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-900">KPI Analytics</h2>
        <select
          className="px-3 py-2 border border-[var(--border)] rounded-lg"
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="3m">Last 3 months</option>
          <option value="6m">Last 6 months</option>
          <option value="1y">Last year</option>
        </select>
      </div>

      <section>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Engagement Over Time</h3>
        <Card className="p-6">
          <div className="h-64 min-h-[256px]">
            <ResponsiveContainer width="100%" height={256}>
              <LineChart data={engagementTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="engagement"
                  stroke="#0d9488"
                  strokeWidth={2}
                  dot={{ fill: "#0d9488" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Registrations</h3>
          <Card className="p-6">
            <div className="h-64 min-h-[256px]">
              <ResponsiveContainer width="100%" height={256}>
                <BarChart data={engagementTrend} layout="vertical" margin={{ left: 30 }}>
                  <XAxis type="number" />
                  <YAxis dataKey="month" type="category" width={40} />
                  <Tooltip />
                  <Bar dataKey="engagement" fill="#0d9488" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </section>
        <section>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Completions by Category</h3>
          <Card className="p-6">
            <div className="h-64 min-h-[256px]">
              <ResponsiveContainer width="100%" height={256}>
                <PieChart>
                  <Pie
                    data={activityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name }) => name}
                  >
                    {activityData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
