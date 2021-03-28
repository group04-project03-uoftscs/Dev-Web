const puppeteer = require('puppeteer');

// this function uses puppeteer to search for the meta tag property og: image to find the associated image to an article
const scrape = async (scrapeURL) => {

    const chromeOptions = {
        headless: true,
        args: [
            "--no-sandbox", 
            '--disable-setuid-sandbox'
        ],
        'ignoreHTTPSErrors': true
    };
    let image = "";

    const browser = await puppeteer.launch(chromeOptions);
    const page = await browser.newPage();
    
    try{
      
      await page.goto(scrapeURL, {waitUntil: 'load'});
      image = await page.$eval('meta[property="og:image"]', el => el.content);
    }

    catch{
      console.log('not found')
    }

    await browser.close();
    return image.startsWith("http") ? image : "";
}

module.exports = scrape;

