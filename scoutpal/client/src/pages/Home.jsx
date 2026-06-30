import LeadForm from '../components/LeadForm';
import LeadList from '../components/LeadList';
import { useLeads } from '../hooks/useLeads';

export default function Home() {
  const { leads, loading, fetchError, refresh } = useLeads();

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-6">
      <LeadForm onSuccess={refresh} />
      <LeadList leads={leads} loading={loading} fetchError={fetchError} onRetry={refresh} />
    </div>
  );
}
