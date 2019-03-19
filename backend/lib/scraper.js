import axios from 'axios';
import cheerio from 'cheerio';
import db from './db';

async function getHTML(url) {
  const { data: html } = await axios.get(url);
  return html;
}

async function getTwitterFollowers(html) {
  const $ = cheerio.load(html);
  const span = $('[data-nav="followers"] .ProfileNav-value');
  return span.data().count;
}

async function getInstagramFollowers(html) {
  const $ = cheerio.load(html);
  const script = $('script[type="application/ld+json"]');
  const scriptString = script.html();
  const scriptJSON = JSON.parse(scriptString);
  return parseInt(
    scriptJSON.mainEntityofPage.interactionStatistic.userInteractionCount
  );
}

export async function getInstagramCount() {
  const html = await getHTML('https://www.instagram.com/ondrahliba/');
  const count = await getInstagramFollowers(html);
  return count;
}

export async function getTwitterCount() {
  const html = await getHTML('https://twitter.com/HlibaOndra');
  const count = await getTwitterFollowers(html);
  return count;
}

export async function runCron() {
  const [iCount, tCount] = await Promise.all([
    getInstagramCount(),
    getTwitterCount()
  ]);
  db.get('twitter')
    .push({
      date: Date.now(),
      count: tCount
    })
    .write();
  db.get('instagram')
    .push({
      date: Date.now(),
      count: iCount
    })
    .write();
}
