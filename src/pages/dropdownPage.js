const { By, Select } = require('selenium-webdriver');

class DropdownPage {
    constructor(driver) {
        this.driver = driver;
        this.dropdownSelector = '#dropdown';
    }

    async selectOption(optionText) {
        const dropdown = await this.driver.findElement(By.css(this.dropdownSelector));
        const select = new Select(dropdown);
        await select.selectByVisibleText(optionText);
    }

    async getSelectedOption() {
        const dropdown = await this.driver.findElement(By.css(this.dropdownSelector));
        const select = new Select(dropdown);
        const selected = await select.getFirstSelectedOption();
        return await selected.getText();
    }
}

module.exports = DropdownPage;