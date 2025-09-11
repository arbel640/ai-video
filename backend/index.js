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

// יצירת Job חדש
app.post('/create-video', (req, res) => {
    const jobId = Object.keys(jobs).length + 1;
    jobs[jobId] = { text: req.body.text, status: 'pending', video_url: null };
    console.log(`Job ${jobId} נוצר`);
    res.json({ jobId });
});

// בדיקת סטטוס Job
app.get('/status/:jobId', (req, res) => {
    const job = jobs[req.params.jobId];
    res.json(job || { error: 'Job not found' });
});

// --------- פונקציה שמדמה Worker ---------
function processJobs() {
    for (const jobId in jobs) {
        const job = jobs[jobId];
        if (job.status === 'pending') {
            console.log(`Worker מתחיל Job ${jobId}`);
            job.status = 'in_progress';

            // מדמה יצירת וידאו עם delay של 5 שניות
            setTimeout(() => {
                job.status = 'done';
                job.video_url = `https://example.com/video_${jobId}.mp4`;
                console.log(`Job ${jobId} סיים, URL: ${job.video_url}`);
            }, 5000); // מחקה זמן יצירת וידאו
        }
    }
}

// מריץ את ה־Worker כל 3 שניות כדי לבדוק אם יש Jobs חדשים
setInterval(processJobs, 3000);

app.listen(3001, () => console.log('✅ השרת רץ על http://localhost:3001'));
