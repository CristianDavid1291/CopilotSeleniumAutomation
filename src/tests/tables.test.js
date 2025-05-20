//Generate a test cases for the tables using the web page https://the-internet.herokuapp.com/tables
const { Builder } = require('selenium-webdriver');
const { expect } = require('chai');
const chrome = require('selenium-webdriver/chrome');
const TablesPage = require('../pages/tablesPage');

describe('Tables Tests', function() {
    let driver;
    let tablesPage;
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
        tablesPage = new TablesPage(driver);
        await driver.get('https://the-internet.herokuapp.com/tables');
    });

    after(async function() {
        await driver.quit();
    });

    it('should get the text from the first row of the first table', async function() {
        const text = await tablesPage.getTextFromFirstRow();
        expect(text).to.equal('Smith  John  jsmith@gmail.com  $50.00  http://www.jsmith.com  edit delete');
    });

    it('should sort the first table by last name descending', async function() {
        
        // Get all last names from the first table after sorting
        const lastNames = await tablesPage.getAllLastNamesFromFirstTable();

        // Check that the array is sorted in descending order
        const sorted = [...lastNames].sort((a, b) => b.localeCompare(a));
        expect(lastNames).to.deep.equal(sorted);
    });

});
