const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const analyticsRoutes = require('./routes/analytics');
const { PrismaClient } = require('@prisma/client');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:5500',
    'https://novantix-innovation-technology.vercel.app'
  ],
  credentials: true
}));
app.use(bodyParser.json());
app.use(express.static('public')); // Serve dashboard if placed here

// Routes
app.use('/analytics', analyticsRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('Analytics Server is running');
});

// Start Server (Only if run directly, not when imported by Vercel)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export for Vercel Serverless
module.exports = app;
