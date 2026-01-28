const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('--- DB Verification ---');

    const visitors = await prisma.visitor.findMany();
    console.log(`Visitors: ${visitors.length}`);

    const sessions = await prisma.session.findMany();
    console.log(`Sessions: ${sessions.length}`);

    const events = await prisma.event.findMany({
        orderBy: { timestamp: 'desc' },
        take: 5
    });
    console.log(`Events: ${events.length} (showing last 5)`);
    events.forEach(e => {
        console.log(`[${e.type}] ${e.url} at ${e.timestamp}`);
    });

    const pageViews = await prisma.pageView.findMany();
    console.log(`PageViews: ${pageViews.length}`);
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
