import axios from 'axios';
import cheerio from 'cheerio';

async function getHTML(url) {
    const {
        data: html
    } = await axios.get(url);
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
    return parseInt(scriptJSON.mainEntityofPage.interactionStatistic.userInteractionCount);
}

export {
    getHTML,
    getTwitterFollowers,
    getInstagramFollowers
};