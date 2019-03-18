import express from 'express';
import { getInstagramCount, getTwitterCount } from './lib/scraper';
import db from './lib/db';

const app = express();

db();

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

app.listen(PORT, () => {
  console.log(`Scraperoni is running on port ${PORT}!`);
});
