const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST /event - Collect analytics data
router.post('/event', async (req, res) => {
    try {
        const {
            visitorId,
            sessionId,
            eventType,
            url,
            referrer,
            timestamp,
            payload, // Additional data like userAgent, screenWidth etc.
        } = req.body;

        // 1. Find or Create Visitor
        let visitor = await prisma.visitor.findUnique({ where: { id: visitorId } });
        if (!visitor) {
            visitor = await prisma.visitor.create({
                data: { id: visitorId },
            });
        }

        // 2. Find or Create Session
        let session = await prisma.session.findUnique({ where: { id: sessionId } });
        if (!session) {
            session = await prisma.session.create({
                data: {
                    id: sessionId,
                    visitorId: visitor.id,
                    startTime: new Date(timestamp),
                },
            });
        }

        // 3. Log Event
        await prisma.event.create({
            data: {
                sessionId: session.id,
                visitorId: visitor.id,
                type: eventType,
                url: url, // Assuming we add this field to Event model or put in payload
                payload: JSON.stringify(payload || {}),
                timestamp: new Date(timestamp),
            },
        });

        // 4. Handle Specific Event Types
        if (eventType === 'page_view') {
            await prisma.pageView.create({
                data: {
                    sessionId: session.id,
                    visitorId: visitor.id,
                    url: url,
                    referrer: referrer,
                    timestamp: new Date(timestamp),
                },
            });
        } else if (eventType === 'heartbeat') {
            // Update session endTime or duration logic could go here
            // For now, we update the session endTime to the current heartbeat
            await prisma.session.update({
                where: { id: session.id },
                data: { endTime: new Date(timestamp) },
            });
        }

        res.status(200).json({ status: 'ok' });
    } catch (error) {
        console.error('Error processing event:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /active - Real-time active users (last 5 mins)
router.get('/active', async (req, res) => {
    try {
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
        // Count sessions active in last 5 mins
        // Session is active if startTime >= 5min ago OR endTime >= 5min ago
        // Since heartbeat updates endTime, checking endTime is best.
        // For very new sessions, endTime might be null? My logic sets endTime to heartbeat.
        // Initial session has startTime. EndTime defaults to null.
        // So (endTime >= 5minAgo) OR (endTime is null AND startTime >= 5minAgo)
        const activeCount = await prisma.session.count({
            where: {
                OR: [
                    { endTime: { gte: fiveMinutesAgo } },
                    { AND: [{ endTime: null }, { startTime: { gte: fiveMinutesAgo } }] }
                ]
            }
        });
        res.json({ activeUsers: activeCount });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
});

// GET /summary - Stats for a time range
router.get('/summary', async (req, res) => {
    try {
        const range = req.query.range || '24h';
        let startTime = new Date();

        switch (range) {
            case '1h': startTime.setHours(startTime.getHours() - 1); break;
            case '24h': startTime.setHours(startTime.getHours() - 24); break;
            case '7d': startTime.setDate(startTime.getDate() - 7); break;
            case '30d': startTime.setDate(startTime.getDate() - 30); break;
            case '12m': startTime.setMonth(startTime.getMonth() - 12); break;
            default: startTime.setHours(startTime.getHours() - 24);
        }

        const [pageViews, uniqueVisitors, sessions] = await Promise.all([
            prisma.pageView.count({ where: { timestamp: { gte: startTime } } }),
            prisma.visitor.count({
                where: {
                    sessions: { some: { startTime: { gte: startTime } } }
                }
            }),
            prisma.session.count({ where: { startTime: { gte: startTime } } })
        ]);

        // Traffic Chart Data (JS Grouping for MongoDB/Aggnostic)
        // Fetch all page views in range (optimize by selecting only timestamp)
        const allViews = await prisma.pageView.findMany({
            where: { timestamp: { gte: startTime } },
            select: { timestamp: true }
        });

        // Group in Memory (efficient enough for <100k records)
        const trafficMap = {};
        const isDayRange = ['7d', '30d', '12m'].includes(range);

        allViews.forEach(view => {
            const date = new Date(view.timestamp);
            let key;
            if (isDayRange) {
                key = date.toISOString().split('T')[0]; // YYYY-MM-DD
            } else {
                key = date.toISOString().slice(0, 13) + ':00:00'; // YYYY-MM-DDTHH:00:00
            }

            trafficMap[key] = (trafficMap[key] || 0) + 1;
        });

        const traffic = Object.keys(trafficMap).sort().map(key => ({
            label: key,
            count: trafficMap[key]
        }));

        res.json({
            pageViews,
            uniqueVisitors,
            sessions,
            range,
            traffic
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
});

// GET /page-metrics - Top pages
router.get('/page-metrics', async (req, res) => {
    try {
        // Group By URL
        const metrics = await prisma.pageView.groupBy({
            by: ['url'],
            _count: {
                url: true,
            },
            orderBy: {
                _count: {
                    url: 'desc',
                },
            },
            take: 20
        });

        res.json(metrics);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;
