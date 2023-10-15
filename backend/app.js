const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const patientRoutes = require('./routes/patientRoutes');
app.use('/api', patientRoutes); // Prefix all routes with /api

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
