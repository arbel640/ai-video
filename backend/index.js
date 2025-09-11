const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// רשימת Jobs זמנית
let jobs = {};

// ראוט ראשי לבדיקה
app.get('/', (req, res) => {
    res.send('🚀 השרת פעיל ועובד בהצלחה!');
});

app.post('/create-video', (req, res) => {
    const jobId = Object.keys(jobs).length + 1;
    jobs[jobId] = { text: req.body.text, status: 'pending', video_url: null };
    res.json({ jobId });
});

app.get('/status/:jobId', (req, res) => {
    const job = jobs[req.params.jobId];
    res.json(job || { error: 'Job not found' });
});

app.listen(3001, () => console.log('✅ השרת רץ על http://localhost:3001'));
