//create test cases for JavaScript errors using the web page https://the-internet.herokuapp.com/javascript_error
const { Builder } = require('selenium-webdriver');
const { expect } = require('chai');
const chrome = require('selenium-webdriver/chrome');
const JavaScriptErrorPage = require('../pages/javaScriptErrorPage');
const { By } = require('selenium-webdriver');

describe('JavaScript Error Tests', function() {
    let driver;
    let javaScriptErrorPage;
    this.timeout(30000); // Set timeout for the entire suite

    before(async function() {
        const chromeOptions = new chrome.Options();
        chromeOptions.addArguments(
            '--disable-save-password-bubble',
            '--disable-infobars',
            '--disable-notifications',
            '--disable-extensions'
        );
        driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
        javaScriptErrorPage = new JavaScriptErrorPage(driver);
        await driver.get('https://the-internet.herokuapp.com/javascript_error');
    });

    after(async function() {
        await driver.quit();
    });

    it('should check for JavaScript error message', async function() {
        const errorMessage = await javaScriptErrorPage.getErrorMessage();
        console.log('JavaScript error message:', errorMessage);
        expect(errorMessage).to.be.empty;        
    });

});


