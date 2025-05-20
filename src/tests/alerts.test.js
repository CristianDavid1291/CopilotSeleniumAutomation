//Write a test for the alerts, confirm and prompt alerts using the page object model and selenium-webdriver with mocha and chai. Using https://the-internet.herokuapp.com/ internet web page
const { Builder, By } = require('selenium-webdriver');
const assert = require('assert');
const AlertPage = require('../pages/alertPage');
const { expect } = require('chai');
const chrome = require('selenium-webdriver/chrome');

describe('Alert Tests', function() {
    let driver;
    let alertPage;
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
        alertPage = new AlertPage(driver);
        await driver.get('https://the-internet.herokuapp.com/javascript_alerts');
    });

    after(async function() {
        await driver.quit();
    });
    
    it('should handle a simple alert', async function() {
        await alertPage.clickSimpleAlert();
        const alertText = await driver.switchTo().alert().getText();
        expect(alertText).to.equal('I am a JS Alert');
        await driver.switchTo().alert().accept();
        const resultText = await alertPage.getResultText();
        expect(resultText).to.equal('You successfully clicked an alert');
    });

    it('should handle a confirm alert', async function() {
        await alertPage.clickConfirmAlert();
        const alertText = await driver.switchTo().alert().getText();
        expect(alertText).to.equal('I am a JS Confirm');
        await driver.switchTo().alert().accept();
        const resultText = await alertPage.getResultText();
        expect(resultText).to.equal('You clicked: Ok');
    });

    it('should handle a prompt alert', async function() {
        await alertPage.clickPromptAlert();
        const alertText = await driver.switchTo().alert().getText();
        expect(alertText).to.equal('I am a JS prompt');
        await driver.switchTo().alert().sendKeys('Hello');
        await driver.switchTo().alert().accept();
        const resultText = await alertPage.getResultText();
        expect(resultText).to.equal('You entered: Hello');
    });

    it('should handle a confirm alert and cancel', async function() {
        await alertPage.clickConfirmAlert();
        const alertText = await driver.switchTo().alert().getText();
        expect(alertText).to.equal('I am a JS Confirm');
        await driver.switchTo().alert().dismiss();
        const resultText = await alertPage.getResultText();
        expect(resultText).to.equal('You clicked: Cancel');
    });

});