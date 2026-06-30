const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

function buildPrompt({ companyName, contactName, email, context, icpCriteria }) {
  return `You are a B2B sales qualification agent. Your job is to evaluate a lead against a given Ideal Customer Profile (ICP) and return a structured assessment.

Ideal Customer Profile (provided by user):
${icpCriteria}

Lead information (provided by user):
Company: ${companyName}
Contact: ${contactName}
Email: ${email}
Context: ${context}

Evaluate the fit and intent of this lead against the ICP above.

Return STRICTLY a JSON object with this exact shape, and nothing else (no markdown fences, no preamble):

{
  "score": <integer 0-100>,
  "tier": "<Hot | Warm | Cold>",
  "reasoning": "<2-3 sentence explanation>",
  "nextAction": "<one concrete suggested next step>"
}`;
}

function parseModelResponse(text) {
  let cleaned = text.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?```\s*$/, '');
  }
  return JSON.parse(cleaned);
}

export async function scoreLeadWithAI({ companyName, contactName, email, context, icpCriteria }) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY is not set');
  }

  const prompt = buildPrompt({ companyName, contactName, email, context, icpCriteria });

  const response = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'openrouter/auto',
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`OpenRouter API error ${response.status}: ${body}`);
  }

  const data = await response.json();
  const choice = data.choices?.[0];
  if (!choice?.message?.content) {
    throw new Error('OpenRouter returned an empty response');
  }

  const modelUsed = data.model || 'unknown';
  const parsed = parseModelResponse(choice.message.content);

  return {
    score: parsed.score,
    tier: parsed.tier,
    reasoning: parsed.reasoning,
    nextAction: parsed.nextAction,
    modelUsed,
  };
}
