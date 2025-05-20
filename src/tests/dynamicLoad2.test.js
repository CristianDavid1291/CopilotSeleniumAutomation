//Create automated tests for the dynamicLoad function
// the page is available at https://the-internet.herokuapp.com/dynamic_loading/1
// the test should check if the page loads without any errors
// and if the text "Hello World!" is present on the page
const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');
const chrome = require('selenium-webdriver/chrome');
const { Options } = require('selenium-webdriver/chrome');
const DynamicLoadPage = require('../pages/dynamicLoadPage.js');

describe('Dynamic Load Tests', function() {
    let driver;
    let dynamicLoadPage;
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
        dynamicLoadPage = new DynamicLoadPage(driver);
    });

    after(async function() {
        await driver.quit();
    });

    it('should load the page without errors and display "Hello World!"', async function() {
        await driver.get('https://the-internet.herokuapp.com/dynamic_loading/2');
        await dynamicLoadPage.clickStartButton2();

        const helloWorldText = await dynamicLoadPage.getHelloWorldText();
        expect(helloWorldText).to.equal('Hello World!');
    });
}
);
