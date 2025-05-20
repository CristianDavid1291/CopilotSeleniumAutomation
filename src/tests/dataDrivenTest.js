//implement a data driven test to validate the login functionality of the page https://the-internet.herokuapp.com/login
const { Builder, By } = require('selenium-webdriver');
const assert = require('assert');
const LoginPage = require('../pages/loginPage');
const { expect } = require('chai');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const { json } = require('stream/consumers');

describe('Login Tests', function() {
    let driver;
    let loginPage;
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
        loginPage = new LoginPage(driver);
        await driver.get('https://the-internet.herokuapp.com/login');
    });

    after(async function() {
        await driver.quit();
    });

    it('Data Driven Test for Login', async function() {
        const testData = JSON.parse(fs.readFileSync('src/tests/credentials.json', 'utf8'));
        for (const data of testData) {
            await loginPage.enterUsername(data.username);
            await loginPage.enterPassword(data.password);
            await loginPage.submitLogin();
            await driver.sleep(1000);
            const resultText = await loginPage.getResultText();
            expect(resultText).to.contain(data.expected);
            await driver.navigate().back(); // Navigate back to the login page for the next iteration
           
        }
  });
});