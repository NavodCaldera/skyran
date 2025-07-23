const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

class SeleniumManager {
  constructor(headless = true) {
    this.headless = headless;
    this.driver = null;
  }

  async init() {
    const options = new chrome.Options();
    if (this.headless) options.headless();

    this.driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  }

  async goTo(url) {
    await this.driver.get(url);
  }

  async waitForSelector(selector, timeout = 10000) {
    await this.driver.wait(until.elementLocated(By.xpath(selector)), timeout);
  }

  async getText(selector) {
    const element = await this.driver.findElement(By.css(selector));
    return await element.getText();
  }

  async close() {
    if (this.driver) {
      await this.driver.quit();
    }
  }
}

module.exports = SeleniumManager;
