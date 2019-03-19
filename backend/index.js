import express from 'express';
import { getInstagramCount, getTwitterCount } from './lib/scraper';
import db from './lib/db';
import './lib/cron';

const app = express();

const PORT = 3030;

app.get('/scrape', async (req, res, next) => {
  const [iCount, tCount] = await Promise.all([
    getInstagramCount(),
    getTwitterCount()
  ]);
  res.json({
    iCount,
    tCount
  });
});

app.get('/data', async (req, res, next) => {
  const twitter = db.get('twitter').value();
  const instagram = db.get('instagram').value();
  res.json({
    twitter,
    instagram
  });
});

app.listen(PORT, () => {
  console.log(`Scraperoni is running on port http://localhost:${PORT}`);
});
