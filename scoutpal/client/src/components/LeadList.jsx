import LeadCard from './LeadCard';

export default function LeadList({ leads, loading, fetchError, onRetry }) {
  if (fetchError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
        <p className="text-sm font-medium text-red-700">Failed to load leads</p>
        <p className="mt-1 text-sm text-red-500">{fetchError}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-3 rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-200"
          >
            Try again
          </button>
        )}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-32 animate-pulse rounded-xl border border-gray-200 bg-white p-5"
          >
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-gray-200" />
              <div className="min-w-0 flex-1">
                <div className="h-4 w-1/3 rounded bg-gray-200" />
                <div className="mt-2 h-3 w-1/2 rounded bg-gray-100" />
              </div>
            </div>
            <div className="mt-4 h-3 w-full rounded bg-gray-100" />
            <div className="mt-2 h-3 w-2/3 rounded bg-gray-100" />
          </div>
        ))}
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
          <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <p className="text-base font-medium text-gray-500">No leads yet</p>
        <p className="mt-1 text-sm text-gray-400">
          Score your first lead using the form above.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-900">
        Scored Leads <span className="text-sm font-normal text-gray-400">({leads.length})</span>
      </h2>
      {leads.map((lead) => (
        <LeadCard key={lead.id} lead={lead} />
      ))}
    </div>
  );
}
