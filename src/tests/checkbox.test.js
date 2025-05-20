const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Checkbox Tests', function() {
    this.timeout(30000); // Set timeout for the entire suite
    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://the-internet.herokuapp.com/checkboxes');
    });

    after(async function() {
        await driver.quit();
    });

    it('should check the first checkbox', async function() {
        const checkbox1 = await driver.findElement(By.css('input[type="checkbox"]:nth-of-type(1)'));
        await checkbox1.click();
        await driver.sleep(5000); // Static wait for manual verification
        const isChecked = await checkbox1.isSelected();
        assert.strictEqual(isChecked, true, 'Checkbox 1 should be checked');
    });

    it('should uncheck the second checkbox', async function() {
        const checkbox2 = await driver.findElement(By.css('input[type="checkbox"]:nth-of-type(2)'));
        await checkbox2.click();
        await driver.sleep(5000); // Static wait for manual verification
        const isChecked = await checkbox2.isSelected();
        assert.strictEqual(isChecked, false, 'Checkbox 2 should be unchecked');
    });
});