# ScoutPal

Autonomous AI agent for lead qualification and scoring. Paste in lead context and an Ideal Customer Profile (ICP), and ScoutPal returns a structured score, tier, reasoning, and next action.

## Setup

### 1. Environment variables

Copy the example env files:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Fill in `server/.env` with your Neon PostgreSQL connection string and OpenRouter API key.

### 2. Install dependencies

```bash
cd server && npm install
cd ../client && npm install
```

### 3. Run database migrations

```bash
cd server
npx prisma migrate dev --name init
```

### 4. Start development servers

```bash
# Terminal 1 — server
cd server && npm run dev

# Terminal 2 — client
cd client && npm run dev
```

The server runs on `http://localhost:5000` and the client on `http://localhost:5173`.

## Tech Stack

- **Frontend:** React 18 + Vite + Tailwind CSS
- **Backend:** Node.js + Express.js
- **Database:** Neon (PostgreSQL) + Prisma ORM
- **AI:** OpenRouter API
