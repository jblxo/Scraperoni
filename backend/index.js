import express from 'express';
import cors from 'cors';
import { getInstagramCount, getTwitterCount } from './lib/scraper';
import { uniqueCount } from './lib/utils';
import db from './lib/db';
import './lib/cron';

const app = express();
app.use(cors());

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
  const { twitter, instagram } = db.value();

  const uniqueTwitter = uniqueCount(twitter);
  const uniqueInstagram = uniqueCount(instagram);

  res.json({
    twitter: uniqueTwitter,
    instagram: uniqueInstagram
  });
});

app.listen(PORT, () => {
  console.log(`Scraperoni is running on port http://localhost:${PORT}`);
});
