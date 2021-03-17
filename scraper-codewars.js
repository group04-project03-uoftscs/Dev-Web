const puppeteer = require('puppeteer');

// This is to scrape codewars challenges ID that we then copied over to codewareChallenges.json file
// It gets all the challenges that are first loaded on the page that correspond to the kyu level and most completed.

const scrape = async () => {

    const chromeOptions = {
        headless: true,
        defaultViewport: null,
        args: [
            "--incognito",
            "--no-sandbox",
            "--single-process",
            "--no-zygote",
        ],
    };

    const kyu = 4; // We have used 4 to 8 kyu
    const url =`https://www.codewars.com/kata/search/?q=&r[]=-${kyu}&order_by=total_completed%20desc`

    const browser = await puppeteer.launch(chromeOptions);
    const page = await browser.newPage();
    let challenges_info = [];
    
    await page.goto(url, {waitUntil: 'load'});
    
    try{
       challenges_info = await page.$$eval("div.kata", am => am.map(e => e.id))
    }

    catch{
      console.log('not found')
    }

    console.log(challenges_info)

    await browser.close();
}

scrape();
module.exports = scrape;

