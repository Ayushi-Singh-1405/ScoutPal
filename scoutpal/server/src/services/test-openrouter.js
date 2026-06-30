import { scoreLeadWithAI } from './openrouter.js';

const sampleLead = {
  companyName: 'Acme Corp',
  contactName: 'Jane Doe',
  email: 'jane@acme.com',
  context: `Acme Corp is a B2B SaaS company with 200 employees. They recently raised a $10M Series A round and are actively hiring for sales and growth roles. They provide an AI-powered analytics platform used by mid-market companies.`,
  icpCriteria: `B2B SaaS companies, 50-500 employees, recently funded, actively hiring sales/growth roles.`,
};

try {
  const result = await scoreLeadWithAI(sampleLead);
  console.log('Success!');
  console.log(JSON.stringify(result, null, 2));
} catch (err) {
  console.error('Error:', err.message);
}
