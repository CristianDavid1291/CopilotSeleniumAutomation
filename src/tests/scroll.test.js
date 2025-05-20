//write selenium test to test scroll functionality
// using the scrollPage.js page object model
// and the scroll.test.js test file
//the page is available at https://the-internet.herokuapp.com/infinite_scroll
const { Builder, By } = require('selenium-webdriver');
const { expect } = require('chai');
const chrome = require('selenium-webdriver/chrome');
const { Options } = require('selenium-webdriver/chrome');
const ScrollPage = require('../pages/scrollPage.js');
const { Actions } = require('selenium-webdriver');

describe('Scroll Tests', function() {
    let driver;
    let scrollPage;
    this.timeout(30000);

    before(async function() {
        const chromeOptions = new Options();
        chromeOptions.addArguments(
            '--disable-save-password-bubble',
            '--disable-infobars',
            '--disable-notifications',
            '--disable-extensions'
        );
        driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
        scrollPage = new ScrollPage(driver);
    });

    after(async function() {
        await driver.quit();
    });

    it('should scroll to the bottom of the page', async function() {
        await driver.get('https://the-internet.herokuapp.com/infinite_scroll');
        await scrollPage.scrollToBottom();

        const lastElement = await scrollPage.getLastElement();
        expect(lastElement).to.not.be.null;

         await scrollPage.scrollToBottom();
    });
}
);

