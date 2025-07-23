const { trace } = require('joi');
const SeleniumManager = require('./seleniumManager');


async function scrape() {
    const scraper = new SeleniumManager(true);
    await scraper.init();

    try{
        scraper.goTo("https://www.combank.lk/personal-banking/savings-accounts");

        
    }
}

module.exports = scrape

