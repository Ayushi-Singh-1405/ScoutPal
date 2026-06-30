import { useState } from 'react';
import { createLead } from '../services/api';

const INITIAL = { companyName: '', contactName: '', email: '', context: '', icpCriteria: '' };

export default function LeadForm({ onSuccess }) {
  const [form, setForm] = useState(INITIAL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const valid = Object.values(form).every((v) => v.trim());

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!valid) return;
    setLoading(true);
    setError(null);

    try {
      await createLead(form);
      setForm(INITIAL);
      onSuccess?.();
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-1 text-lg font-semibold text-gray-900">Score a New Lead</h2>
      <p className="mb-5 text-sm text-gray-500">
        Paste your lead information and define your Ideal Customer Profile.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="companyName" className="mb-1 block text-sm font-medium text-gray-700">
              Company name
            </label>
            <input
              id="companyName"
              name="companyName"
              type="text"
              value={form.companyName}
              onChange={handleChange}
              required
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm outline-none transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="contactName" className="mb-1 block text-sm font-medium text-gray-700">
              Contact name
            </label>
            <input
              id="contactName"
              name="contactName"
              type="text"
              value={form.contactName}
              onChange={handleChange}
              required
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm outline-none transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm outline-none transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="context" className="mb-1 block text-sm font-medium text-gray-700">
            Lead context
          </label>
          <textarea
            id="context"
            name="context"
            rows={5}
            value={form.context}
            onChange={handleChange}
            required
            placeholder="Paste website copy, LinkedIn summary, news, or notes about this lead..."
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm outline-none transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="icpCriteria" className="mb-1 block text-sm font-medium text-gray-700">
            Ideal Customer Profile (ICP)
          </label>
          <textarea
            id="icpCriteria"
            name="icpCriteria"
            rows={3}
            value={form.icpCriteria}
            onChange={handleChange}
            required
            placeholder="e.g. B2B SaaS companies, 50-500 employees, recently funded, actively hiring sales/growth roles"
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm outline-none transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={!valid || loading}
          className="inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              ScoutPal is researching and scoring this lead...
            </span>
          ) : (
            'Score Lead'
          )}
        </button>
      </form>
    </div>
  );
}
