import { useState } from 'react';

function ScoreBadge({ score }) {
  const color =
    score >= 70
      ? 'bg-emerald-100 text-emerald-800'
      : score >= 40
        ? 'bg-amber-100 text-amber-800'
        : 'bg-rose-100 text-rose-800';

  return (
    <span
      className={`inline-flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold ${color}`}
    >
      {score}
    </span>
  );
}

const TIER_COLORS = {
  Hot: 'bg-rose-100 text-rose-700 border-rose-200',
  Warm: 'bg-amber-100 text-amber-700 border-amber-200',
  Cold: 'bg-sky-100 text-sky-700 border-sky-200',
};

export default function LeadCard({ lead }) {
  const [expanded, setExpanded] = useState(false);
  const tierClass = TIER_COLORS[lead.tier] || 'bg-gray-100 text-gray-700 border-gray-200';

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start gap-4">
        <ScoreBadge score={lead.score} />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-base font-semibold text-gray-900">{lead.companyName}</h3>
            {lead.tier && (
              <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${tierClass}`}>
                {lead.tier}
              </span>
            )}
          </div>

          <p className="mt-0.5 text-sm text-gray-500">
            {lead.contactName} &middot; {lead.email}
          </p>
        </div>
      </div>

      {lead.reasoning && (
        <p className="mt-3 text-sm leading-relaxed text-gray-700">{lead.reasoning}</p>
      )}

      {lead.nextAction && (
        <div className="mt-2">
          <span className="text-xs font-medium uppercase tracking-wider text-gray-400">Next action</span>
          <p className="text-sm text-gray-600">{lead.nextAction}</p>
        </div>
      )}

      <button
        onClick={() => setExpanded((v) => !v)}
        className="mt-2 text-xs font-medium text-indigo-600 hover:text-indigo-700"
      >
        {expanded ? 'Hide details' : 'Show full details'}
      </button>

      {expanded && (
        <div className="mt-3 space-y-3 border-t border-gray-100 pt-3">
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-gray-400">Context</span>
            <p className="mt-0.5 whitespace-pre-wrap text-sm text-gray-600">{lead.context}</p>
          </div>
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-gray-400">ICP criteria</span>
            <p className="mt-0.5 whitespace-pre-wrap text-sm text-gray-600">{lead.icpCriteria}</p>
          </div>
        </div>
      )}

      {lead.modelUsed && (
        <p className="mt-3 text-right text-xs text-gray-400">Scored by: {lead.modelUsed}</p>
      )}
    </div>
  );
}
