// write a test to take a screenshot of the page in the internet page https://the-internet.herokuapp.com/ home page
const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const chrome = require('selenium-webdriver/chrome');
const ScreenshotPage = require('../pages/screenshotPage');
const { expect } = require('chai');
const { By } = require('selenium-webdriver');

describe('Screenshot Tests', function() {
    let driver;
    let screenshotPage;
    this.timeout(30000); // Set timeout for the entire suite

    before(async function() {
        const chromeOptions = new chrome.Options();
        chromeOptions.addArguments(
            '--disable-save-password-bubble',
            '--disable-infobars',
            '--disable-notifications',
            '--disable-extensions',
            '--guest'
        );
        driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
        screenshotPage = new ScreenshotPage(driver);
        await driver.get('https://the-internet.herokuapp.com/');
    });

    after(async function() {
        await driver.quit();
    });

    it('should take a screenshot of the page', async function() {
        const screenshotPath = path.join(__dirname, '../screenshoots/homepage.png');
        await screenshotPage.takeScreenshot(screenshotPath);
        const fileExists = fs.existsSync(screenshotPath);
        expect(fileExists).to.be.true;
    });
});
