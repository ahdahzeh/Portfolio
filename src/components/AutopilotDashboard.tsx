'use client';

import { useState } from 'react';

const PURPLE = '#534AB7';
const TEAL = '#1D9E75';
const CORAL = '#D85A30';
const AMBER = '#BA7517';

const COLUMNS = [
  { id: 'new', label: 'New Today', color: PURPLE },
  { id: 'applied', label: 'Applied', color: '#6B7280' },
  { id: 'screening', label: 'Phone Screen', color: AMBER },
  { id: 'interviewing', label: 'Interviewing', color: TEAL },
  { id: 'offer', label: 'Offer', color: '#16A34A' },
  { id: 'rejected', label: 'Rejected', color: CORAL },
];

const JOBS = [
  { id: 1, company: 'Stripe', role: 'Product Designer', location: 'San Francisco, CA', score: 94, column: 'new', date: 'Today 8:04 AM', logo: 'S', logoColor: '#635BFF' },
  { id: 2, company: 'Linear', role: 'Design Engineer', location: 'Remote', score: 91, column: 'new', date: 'Today 8:04 AM', logo: 'L', logoColor: '#5E6AD2' },
  { id: 3, company: 'Vercel', role: 'Product Designer', location: 'Remote', score: 88, column: 'new', date: 'Today 8:05 AM', logo: 'V', logoColor: '#000000' },
  { id: 4, company: 'Figma', role: 'Sr. Product Designer', location: 'San Francisco, CA', score: 85, column: 'new', date: 'Today 8:05 AM', logo: 'F', logoColor: '#F24E1E' },
  { id: 5, company: 'Notion', role: 'Design Engineer', location: 'New York, NY', score: 82, column: 'new', date: 'Today 8:06 AM', logo: 'N', logoColor: '#191919' },
  { id: 6, company: 'Loom', role: 'Product Designer', location: 'Remote', score: 78, column: 'applied', date: 'Mar 31', logo: 'L', logoColor: '#625DF5' },
  { id: 7, company: 'Brex', role: 'Design Engineer', location: 'San Francisco, CA', score: 90, column: 'applied', date: 'Mar 30', logo: 'B', logoColor: '#F26522' },
  { id: 8, company: 'Mercury', role: 'Product Designer', location: 'Remote', score: 87, column: 'applied', date: 'Mar 29', logo: 'M', logoColor: '#5C6BC0' },
  { id: 9, company: 'Arc Browser', role: 'Design Engineer', location: 'New York, NY', score: 93, column: 'screening', date: 'Mar 28', logo: 'A', logoColor: '#E8341D' },
  { id: 10, company: 'Anthropic', role: 'Product Designer', location: 'San Francisco, CA', score: 96, column: 'interviewing', date: 'Mar 25', logo: 'A', logoColor: '#D97706' },
  { id: 11, company: 'OpenAI', role: 'Design Engineer', location: 'San Francisco, CA', score: 89, column: 'interviewing', date: 'Mar 24', logo: 'O', logoColor: '#10A37F' },
  { id: 12, company: 'Cloudflare', role: 'Product Designer', location: 'Austin, TX', score: 72, column: 'rejected', date: 'Mar 26', logo: 'C', logoColor: '#F48120' },
  { id: 13, company: 'Robinhood', role: 'Sr. Product Designer', location: 'Menlo Park, CA', score: 68, column: 'rejected', date: 'Mar 22', logo: 'R', logoColor: '#00C805' },
];

const TODAY_STATS = [
  { label: 'Scraped', value: '47', color: PURPLE },
  { label: 'Matched', value: '23', color: TEAL },
  { label: 'Tailored', value: '8', color: CORAL },
  { label: 'Cost', value: '$0.52', color: AMBER },
];

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 90 ? TEAL : score >= 80 ? AMBER : CORAL;
  const bg = score >= 90 ? '#F0FDF4' : score >= 80 ? '#FFFBEB' : '#FFF1EE';
  return (
    <span
      className="font-mono text-xs font-bold px-2 py-0.5 rounded"
      style={{ color, background: bg }}
    >
      {score}%
    </span>
  );
}

function JobCard({ job }: { job: typeof JOBS[0] }) {
  return (
    <div className="rounded-xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#0f0f0f] p-3.5 space-y-2.5 hover:border-black/20 dark:hover:border-white/20 transition-colors">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style={{ background: job.logoColor }}
          >
            {job.logo}
          </div>
          <div>
            <p className="text-sm font-semibold text-black dark:text-white leading-tight">{job.company}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight mt-0.5">{job.role}</p>
          </div>
        </div>
        <ScoreBadge score={job.score} />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">{job.location}</span>
        <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">{job.date}</span>
      </div>
      <div className="flex gap-2 pt-0.5">
        <button className="text-xs font-medium text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors">
          Resume ↗
        </button>
        <span className="text-gray-300 dark:text-gray-600">·</span>
        <button className="text-xs font-medium text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors">
          Letter ↗
        </button>
      </div>
    </div>
  );
}

function Column({ col, jobs }: { col: typeof COLUMNS[0]; jobs: typeof JOBS }) {
  return (
    <div className="flex-shrink-0 w-[240px]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: col.color }} />
          <span className="text-xs font-semibold text-black dark:text-white tracking-wide">{col.label}</span>
        </div>
        <span className="text-xs font-mono text-gray-400 dark:text-gray-500">{jobs.length}</span>
      </div>
      <div className="space-y-2.5">
        {jobs.length === 0 ? (
          <div className="rounded-xl border border-dashed border-black/10 dark:border-white/10 p-4 text-center">
            <span className="text-xs text-gray-400 dark:text-gray-600">No jobs</span>
          </div>
        ) : (
          jobs.map((job) => <JobCard key={job.id} job={job} />)
        )}
      </div>
    </div>
  );
}

export function AutopilotDashboard() {
  const [activeRun] = useState(true);

  const jobsByColumn = (colId: string) => JOBS.filter((j) => j.column === colId);
  const totalApps = JOBS.filter((j) => j.column !== 'new').length;
  const interviews = JOBS.filter((j) => j.column === 'interviewing' || j.column === 'offer').length;

  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden bg-gray-50 dark:bg-[#0a0a0a]">
      {/* Dashboard top bar */}
      <div className="border-b border-black/8 dark:border-white/8 bg-white dark:bg-black px-5 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-bold text-black dark:text-white tracking-tight">AUTOPILOT</span>
          <span className="text-gray-300 dark:text-gray-700">|</span>
          <span className="text-xs font-mono text-gray-500 dark:text-gray-400">Dashboard</span>
        </div>
        <div className="flex items-center gap-3">
          {activeRun && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-mono text-green-700 dark:text-green-400">Pipeline ran today at 8:04 AM</span>
            </div>
          )}
          <span className="text-xs font-mono text-gray-400 dark:text-gray-500">Apr 2, 2026</span>
        </div>
      </div>

      {/* Stats row */}
      <div className="border-b border-black/8 dark:border-white/8 bg-white dark:bg-black px-5 py-3 flex items-center gap-6 overflow-x-auto">
        <div className="flex items-center gap-6 flex-shrink-0">
          {TODAY_STATS.map((stat) => (
            <div key={stat.label} className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-gray-400 dark:text-gray-500 uppercase tracking-wider">{stat.label}</span>
              <span className="font-mono text-sm font-bold" style={{ color: stat.color }}>{stat.value}</span>
            </div>
          ))}
        </div>
        <div className="h-4 w-px bg-black/10 dark:bg-white/10 flex-shrink-0" />
        <div className="flex items-center gap-6 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-gray-400 dark:text-gray-500 uppercase tracking-wider">Total Applied</span>
            <span className="font-mono text-sm font-bold text-black dark:text-white">{totalApps}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-gray-400 dark:text-gray-500 uppercase tracking-wider">Interviewing</span>
            <span className="font-mono text-sm font-bold" style={{ color: TEAL }}>{interviews}</span>
          </div>
        </div>
      </div>

      {/* Kanban board */}
      <div className="overflow-x-auto p-5">
        <div className="flex gap-4 min-w-max">
          {COLUMNS.map((col) => (
            <Column key={col.id} col={col} jobs={jobsByColumn(col.id)} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-black/8 dark:border-white/8 bg-white dark:bg-black px-5 py-3 flex items-center justify-between">
        <span className="text-xs font-mono text-gray-400 dark:text-gray-500">
          {JOBS.length} total applications tracked · Gmail sync active
        </span>
        <span className="text-xs font-mono text-gray-400 dark:text-gray-500">
          Next run: tomorrow 8:00 AM
        </span>
      </div>
    </div>
  );
}
