const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.set('trust proxy', true);

const excuses = JSON.parse(fs.readFileSync('./excuses.json', 'utf-8'));

const stats = {
  totalRequests: 0,
  excuseRequests: 0,
  startTime: Date.now()
};

app.use((req, res, next) => {
  stats.totalRequests++;
  next();
});

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  keyGenerator: (req) => req.headers['cf-connecting-ip'] || req.ip,
  message: { error: 'slow down there buddy (120/min limit)' }
});

app.use(limiter);

app.get('/', (req, res) => {
  res.json({
    name: 'eaas',
    description: 'excuse as a service',
    excuses: excuses.length,
    endpoints: {
      '/excuse': 'random excuse',
      '/excuses': 'all excuses',
      '/count': 'how many excuses',
      '/health': 'health check',
      '/stats': 'api stats'
    },
    example: `${req.protocol}://${req.get('host')}/excuse`
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    uptime: Math.floor((Date.now() - stats.startTime) / 1000),
    excuses: excuses.length
  });
});

app.get('/stats', (req, res) => {
  const uptime = Math.floor((Date.now() - stats.startTime) / 1000);
  res.json({
    totalRequests: stats.totalRequests,
    excuseRequests: stats.excuseRequests,
    totalExcuses: excuses.length,
    uptime: uptime,
    uptimeFormatted: `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m ${uptime % 60}s`
  });
});

app.get('/excuse', (req, res) => {
  stats.excuseRequests++;
  const random = Math.floor(Math.random() * excuses.length);
  res.json({ excuse: excuses[random] });
});

app.get('/excuses', (req, res) => {
  res.json({ excuses, total: excuses.length });
});

app.get('/count', (req, res) => {
  res.json({ count: excuses.length });
});

app.use((req, res) => {
  res.status(404).json({ error: 'not found' });
});

app.listen(PORT, () => {
  console.log(`eaas running on port ${PORT}`);
});

module.exports = app;
