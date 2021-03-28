const puppeteer = require('puppeteer');

// this function uses puppeteer to search for the meta tag property og: image to find the associated image to an article
const scrape = async (scrapeURL) => {

    const chromeOptions = {
        headless: true,
        defaultViewport: null,
        args: [
            "--incognito",
            "--no-sandbox",
            "--single-process",
            "--no-zygote", 
            '--disable-setuid-sandbox'
        ],
        'ignoreHTTPSErrors': true
    };
    let image = "";

    const browser = await puppeteer.launch(chromeOptions);
    const page = await browser.newPage();
    await page.setRequestInterception(true)
    await page.goto(scrapeURL, {waitUntil: 'networkidle2'});
    page.on('request', (request) => {
        if (request.resourceType() === 'document') {
            request.continue();
        } else {
            request.abort();
        }
    });
    try{
      image = await page.$eval('meta[property="og:image"]', el => el.content);
    }

    catch{
      console.log('not found')
    }

    await browser.close();
    return image.startsWith("http") ? image : "";
}

module.exports = scrape;

