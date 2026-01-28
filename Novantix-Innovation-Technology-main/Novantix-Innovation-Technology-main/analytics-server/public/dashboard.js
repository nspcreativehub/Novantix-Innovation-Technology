const API_BASE = 'https://a-nalystics.vercel.app/analytics';

// Elements
const els = {
    activeUsers: document.getElementById('activeUsers'),
    totalVisits: document.getElementById('totalVisits'),
    pageViews: document.getElementById('pageViews'),
    uniqueVisitors: document.getElementById('uniqueVisitors'),
    topPagesTable: document.querySelector('#topPagesTable tbody'),
    timeRange: document.getElementById('timeRange')
};

async function fetchActiveUsers() {
    try {
        const res = await fetch(`${API_BASE}/active`);
        const data = await res.json();
        els.activeUsers.textContent = data.activeUsers;
    } catch (e) {
        console.error('Failed to fetch active users', e);
    }
}

let trafficChart;

async function fetchSummary() {
    try {
        const range = els.timeRange.value;
        const res = await fetch(`${API_BASE}/summary?range=${range}`);
        const data = await res.json();

        els.totalVisits.textContent = data.sessions;
        els.pageViews.textContent = data.pageViews;
        els.uniqueVisitors.textContent = data.uniqueVisitors;

        updateChart(data.traffic);
    } catch (e) {
        console.error('Failed to fetch summary', e);
    }
}

function updateChart(data) {
    const ctx = document.getElementById('trafficChart').getContext('2d');

    if (trafficChart) {
        trafficChart.destroy();
    }

    trafficChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(d => {
                const date = new Date(d.label);
                return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            }),
            datasets: [{
                label: 'Page Views',
                data: data.map(d => d.count),
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}


async function fetchPageMetrics() {
    try {
        const res = await fetch(`${API_BASE}/page-metrics`);
        const data = await res.json(); // Array of { url, _count: { url: N } }

        els.topPagesTable.innerHTML = data.map(item => `
            <tr>
                <td>${item.url}</td>
                <td>${item._count.url}</td>
            </tr>
        `).join('');
    } catch (e) {
        console.error('Failed to fetch page metrics', e);
    }
}

function updateAll() {
    fetchActiveUsers();
    fetchSummary();
    fetchPageMetrics();
}

// Init
updateAll();

// Listeners
els.timeRange.addEventListener('change', updateAll);

// Auto-refresh Active Users every 10s
setInterval(fetchActiveUsers, 10000);
