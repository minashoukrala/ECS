const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const filePath = './data.json';

// GET curriculum data
app.get('/api/:grade/:subject', (req, res) => {
  const { grade, subject } = req.params;
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    res.json({ topics: data[grade]?.[subject] || [] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to read data' });
  }
});

// POST to update curriculum
app.post('/api/:grade/:subject', (req, res) => {
  const { grade, subject } = req.params;
  const { topics } = req.body;

  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (!data[grade]) data[grade] = {};
    data[grade][subject] = topics;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save data' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend is running at http://localhost:${PORT}`);
});