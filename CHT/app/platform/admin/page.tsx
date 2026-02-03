"use client";

import Link from "next/link";
import { Card } from "@/components/ui";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  kpiMetrics,
  activityData,
  engagementTrend,
  topContent,
} from "@/lib/mock/admin";

const COLORS = ["#0d9488", "#14b8a6", "#2dd4bf"];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-900">Admin Dashboard</h2>
        <div className="flex gap-2">
          <Link href="/platform/admin/explorer">
            <span className="text-sm text-teal-600 hover:underline">HCP Explorer</span>
          </Link>
          <span className="text-gray-400">|</span>
          <Link href="/platform/admin/analytics">
            <span className="text-sm text-teal-600 hover:underline">KPI Analytics</span>
          </Link>
        </div>
      </div>

      <section>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Activity Overview</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="h-48 min-h-[192px]">
              <ResponsiveContainer width="100%" height={192}>
                <PieChart>
                  <Pie
                    data={activityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {activityData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card className="p-6 col-span-2">
            <h4 className="font-medium text-gray-900 mb-4">Engagement Trend</h4>
            <div className="h-48 min-h-[192px]">
              <ResponsiveContainer width="100%" height={192}>
                <BarChart data={engagementTrend}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="engagement" fill="#0d9488" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-medium text-gray-900 mb-4">User Engagement Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {kpiMetrics.map((kpi) => (
            <Card key={kpi.label} className="p-6 rounded-xl">
              <p className="text-sm text-gray-500">{kpi.label}</p>
              <div className="flex items-end gap-2 mt-1">
                <p className="text-2xl font-bold text-gray-900">{kpi.value.toLocaleString()}</p>
                <span
                  className={`flex items-center text-sm font-medium mb-1 ${
                    kpi.change >= 0 ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  {kpi.change >= 0 ? (
                    <svg className="w-4 h-4 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  )}
                  {Math.abs(kpi.change)}%
                </span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Top Content</h3>
        <Card>
          <div className="divide-y divide-[var(--border)]">
            {topContent.map((item, i) => (
              <div key={i} className="px-4 py-3 flex justify-between items-center">
                <span className="font-medium text-gray-900">{item.title}</span>
                <span className="text-gray-500">{item.views.toLocaleString()} views</span>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
