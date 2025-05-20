const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const DropdownPage = require('../pages/dropdownPage');

describe('Dropdown Tests', function() {
    let driver;
    let dropdownPage;
     this.timeout(30000); // Set timeout for the entire suite

    before(async function() { 
        driver = await new Builder().forBrowser('chrome').build();
        dropdownPage = new DropdownPage(driver);
        await driver.get('https://the-internet.herokuapp.com/dropdown');
    });

    after(async function() {
        await driver.quit();
    });

    it('should select an option from the dropdown', async function() {
        await dropdownPage.selectOption('Option 1');
        await new Promise(resolve => setTimeout(resolve, 5000)); // Static wait for manual verification
        assert.strictEqual(await dropdownPage.getSelectedOption(), 'Option 1');
    });

    it('should get the selected option from the dropdown', async function() {
        await dropdownPage.selectOption('Option 2');
        const selectedOption = await dropdownPage.getSelectedOption();
        assert.strictEqual(selectedOption, 'Option 2');
        await new Promise(resolve => setTimeout(resolve, 5000)); // Static wait for manual verification
    });
});