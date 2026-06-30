import express from 'express';
import cors from 'cors';
import leadRoutes from './routes/leads.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/leads', leadRoutes);

app.listen(PORT, () => {
  console.log(`ScoutPal server running on port ${PORT}`);
});
