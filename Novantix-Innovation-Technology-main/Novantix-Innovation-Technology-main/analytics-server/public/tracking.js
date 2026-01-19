(function (window) {
    // Auto-detect backend URL from the script tag's src
    const scriptTag = document.currentScript; // "http://localhost:3001/tracking.js" or "https://api.com/tracking.js"
    let API_BASE = 'http://localhost:3001'; // Fallback

    if (scriptTag && scriptTag.src) {
        try {
            const url = new URL(scriptTag.src);
            API_BASE = url.origin; // e.g., "https://my-analytics.onrender.com"
        } catch (e) {
            console.warn('Analytics: Could not parse script origin, using default.');
        }
    }

    const ENDPOINT = `${API_BASE}/analytics/event`;

    // Helpers: UUID generator
    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // Storage wrappers
    const Storage = {
        get: (key) => localStorage.getItem(key),
        set: (key, val) => localStorage.setItem(key, val),
    };

    class Tracker {
        constructor() {
            this.visitorId = this.getVisitorId();
            this.sessionId = this.getSessionId();
            this.init();
        }

        getVisitorId() {
            let vid = Storage.get('analytics_vid');
            if (!vid) {
                vid = uuidv4();
                Storage.set('analytics_vid', vid);
            }
            return vid;
        }

        getSessionId() {
            // Check last activity
            const lastActive = Storage.get('analytics_last_active');
            const now = Date.now();
            let sid = Storage.get('analytics_sid');

            if (!sid || !lastActive || (now - lastActive > 30 * 60 * 1000)) {
                sid = uuidv4();
                Storage.set('analytics_sid', sid);
            }
            // Update activity on access? No, only on event.
            return sid;
        }

        updateActivity() {
            Storage.set('analytics_last_active', Date.now());
        }

        async send(type, payload = {}) {
            this.updateActivity();
            const data = {
                visitorId: this.visitorId,
                sessionId: this.sessionId,
                eventType: type,
                url: window.location.href,
                referrer: document.referrer,
                timestamp: new Date().toISOString(),
                payload: payload
            };

            try {
                await fetch(ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                    keepalive: true
                });
                console.log(`[Analytics] Sent ${type}`);
            } catch (e) {
                console.error('Analytics error', e);
            }
        }

        init() {
            // Track Page View
            this.send('page_view');

            // Heartbeat
            setInterval(() => {
                if (document.visibilityState === 'visible') {
                    this.send('heartbeat');
                }
            }, 10000); // 10s for testing

            // History / SPA support
            const pushState = history.pushState;
            history.pushState = (...args) => {
                pushState.apply(history, args);
                this.send('page_view');
            };

            window.addEventListener('popstate', () => {
                this.send('page_view');
            });

            // Page visibility
            document.addEventListener('visibilitychange', () => {
                this.send('visibility_change', { state: document.visibilityState });
            });
        }
    }

    // Initialize
    window.Analytics = new Tracker();

})(window);
