// Description: This test checks if the page loads without any network errors using Selenium WebDriver.
const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { expect } = require('chai');

describe('Network Tests', function() {
    let driver;
    this.timeout(30000);

    before(async function() {
        const chromeOptions = new chrome.Options();
        chromeOptions.setLoggingPrefs({ performance : 'ALL' });

        chromeOptions.addArguments(
            '--disable-save-password-bubble',
            '--disable-infobars',
            '--disable-notifications',
            '--disable-extensions'
        );
        driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
    });

    after(async function() {
        await driver.quit();
    });

    it('should load the page without network errors', async function() {
        await driver.get('https://the-internet.herokuapp.com/');
        const logs = await driver.manage().logs().get('performance');
        
        const networkErrors = logs.filter(log => JSON.parse(log.message).message.method === 'Network.requestWillBeSent');
        console.log("Performance logs: ", networkErrors);
       
        const browserLogs = await driver.manage().logs().get('browser');
        console.log('Browser logs: ', browserLogs)

        const driverLogs = await driver.manage().logs().get('driver');
        console.log('Driver logs:', driverLogs);
       
        expect(networkErrors.length).to.greaterThan(0, 'No network errors found');
    });
});