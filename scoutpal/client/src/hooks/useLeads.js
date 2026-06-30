import { useState, useEffect, useCallback } from 'react';
import { fetchLeads, createLead } from '../services/api';

export function useLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setFetchError(null);
      const data = await fetchLeads();
      setLeads(data);
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const addLead = async (leadData) => {
    const saved = await createLead(leadData);
    setLeads((prev) => [saved, ...prev]);
    return saved;
  };

  return { leads, loading, fetchError, addLead, refresh: load };
}
