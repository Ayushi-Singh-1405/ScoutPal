import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { scoreLeadWithAI } from '../services/openrouter.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(leads);
  } catch (err) {
    console.error('Error fetching leads:', err.message);
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const lead = await prisma.lead.findUnique({ where: { id: req.params.id } });
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    res.json(lead);
  } catch (err) {
    console.error('Error fetching lead:', err.message);
    res.status(500).json({ error: 'Failed to fetch lead' });
  }
});

router.post('/', async (req, res) => {
  const { companyName, contactName, email, context, icpCriteria } = req.body;

  const missing = [];
  if (!companyName?.trim()) missing.push('companyName');
  if (!contactName?.trim()) missing.push('contactName');
  if (!email?.trim()) missing.push('email');
  if (!context?.trim()) missing.push('context');
  if (!icpCriteria?.trim()) missing.push('icpCriteria');

  if (missing.length > 0) {
    return res.status(400).json({
      error: `Missing required fields: ${missing.join(', ')}`,
    });
  }

  let aiResult;
  try {
    aiResult = await scoreLeadWithAI({ companyName, contactName, email, context, icpCriteria });
  } catch (err) {
    return res.status(502).json({ error: `AI scoring failed: ${err.message}` });
  }

  try {
    const lead = await prisma.lead.create({
      data: {
        companyName: companyName.trim(),
        contactName: contactName.trim(),
        email: email.trim(),
        context: context.trim(),
        icpCriteria: icpCriteria.trim(),
        score: aiResult.score,
        tier: aiResult.tier,
        reasoning: aiResult.reasoning,
        nextAction: aiResult.nextAction,
        modelUsed: aiResult.modelUsed,
      },
    });
    res.status(201).json(lead);
  } catch (err) {
    console.error('Error saving lead:', err.message);
    res.status(500).json({ error: 'Failed to save lead to database' });
  }
});

export default router;
