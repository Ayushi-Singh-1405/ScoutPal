const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function fetchLeads() {
  const res = await fetch(`${API_URL}/api/leads`);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || 'Failed to fetch leads');
  }
  return res.json();
}

export async function createLead(data) {
  const res = await fetch(`${API_URL}/api/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || 'Failed to create lead');
  }
  return res.json();
}
