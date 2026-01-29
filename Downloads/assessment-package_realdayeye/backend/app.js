const express = require('express');

const app = express();
app.use(express.json());

// Mount routes if present
try {
  const buildingRoutes = require('./routes/buildingRoutes');
  app.use('/api/buildings', buildingRoutes);
} catch (err) {
  console.warn('Building routes not mounted:', err.message);
}

try {
  const complianceRoutes = require('./routes/complianceRoutes');
  app.use('/api/compliance', complianceRoutes);
} catch (err) {
  console.warn('Compliance routes not mounted:', err.message);
}

app.get('/api/health', (req, res) => {
  res.json({ success: true, status: 'ok' });
});

module.exports = app;
