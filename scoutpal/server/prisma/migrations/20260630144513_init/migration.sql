-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "context" TEXT NOT NULL,
    "icpCriteria" TEXT NOT NULL,
    "score" INTEGER,
    "tier" TEXT,
    "reasoning" TEXT,
    "nextAction" TEXT,
    "modelUsed" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);
