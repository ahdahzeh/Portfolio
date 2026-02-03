"use client";

import { useState } from "react";
import { Card } from "@/components/ui";
import { Input } from "@/components/ui";
import { hcpList } from "@/lib/mock/admin";

export default function HCPExplorerPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = hcpList.filter((hcp) => {
    const matchSearch =
      hcp.name.toLowerCase().includes(search.toLowerCase()) ||
      hcp.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "all" || hcp.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">HCP Portal Explorer</h2>
      <div className="flex flex-wrap gap-4">
        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <select
          className="px-3 py-2 border border-[var(--border)] rounded-lg"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left px-4 py-3 font-medium text-gray-900">Name</th>
                <th className="text-left px-4 py-3 font-medium text-gray-900">Email</th>
                <th className="text-left px-4 py-3 font-medium text-gray-900">Status</th>
                <th className="text-right px-4 py-3 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((hcp) => (
                <tr key={hcp.id} className="border-b border-[var(--border)] hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-900">{hcp.name}</td>
                  <td className="px-4 py-3 text-gray-600">{hcp.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        hcp.status === "active"
                          ? "bg-green-100 text-green-800"
                          : hcp.status === "inactive"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {hcp.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-[var(--primary)] hover:underline text-sm">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
