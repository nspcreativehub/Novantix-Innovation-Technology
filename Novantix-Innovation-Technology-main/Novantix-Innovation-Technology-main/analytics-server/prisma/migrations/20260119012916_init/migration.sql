-- CreateTable
CREATE TABLE "Visitor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "visitorId" TEXT NOT NULL,
    "startTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" DATETIME,
    "duration" INTEGER DEFAULT 0,
    CONSTRAINT "Session_visitorId_fkey" FOREIGN KEY ("visitorId") REFERENCES "Visitor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PageView" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "visitorId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "referrer" TEXT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duration" INTEGER DEFAULT 0,
    CONSTRAINT "PageView_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "visitorId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT,
    "payload" TEXT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Event_visitorId_fkey" FOREIGN KEY ("visitorId") REFERENCES "Visitor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Event_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
