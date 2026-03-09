const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const documentsRoutes = require('./routes/documents');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend is running' });
});

app.use('/api/documents', documentsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
