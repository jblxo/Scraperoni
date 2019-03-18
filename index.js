import {
    getHTML,
    getTwitterFollowers,
    getInstagramFollowers
} from './lib/scraper';

async function go() {
    const tPromise = getHTML('https://twitter.com/HlibaOndra');
    const iPromise = getHTML('https://www.instagram.com/ondrahliba/');
    const [twitterHtml, instaHtml] = await Promise.all([tPromise, iPromise]);
    const twCount = await getTwitterFollowers(twitterHtml);
    const instaCount = await getInstagramFollowers(instaHtml);
    console.log(`You have ${twCount} Twitter followers and ${instaCount} Instagram Followers!`);
}

go();