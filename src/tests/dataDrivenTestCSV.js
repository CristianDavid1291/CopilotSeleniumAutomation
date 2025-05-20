//implement a data driven test to validate the login functionality of the page https://the-internet.herokuapp.com/login
const { Builder, By } = require('selenium-webdriver');
const assert = require('assert');
const LoginPage = require('../pages/loginPage');
const { expect } = require('chai');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

describe('Login Tests', function() {
    let driver;
    let loginPage;
    let testData;
    this.timeout(30000); // Set timeout for the entire suite

    async function readCSV(filePath) {
        return new Promise((resolve, reject) => {
            let results = [];
            fs.createReadStream(filePath) 
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', () => {
                    resolve(results);
                })
                .on('error', (error) => {
                    reject(error);
                });
        });
    }

    before(async function() {
        const filePath = path.join(__dirname, 'credentials.csv');
        testData = await readCSV(filePath);
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

    it('Data Driven Test for Login with CSV', async function() {
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