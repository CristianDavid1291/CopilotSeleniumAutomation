class CheckboxPage {
    constructor(driver) {
        this.driver = driver;
        this.checkboxSelector = 'input[type="checkbox"]';
    }

    async checkCheckbox(index) {
        const checkboxes = await this.driver.findElements(By.css(this.checkboxSelector));
        if (checkboxes[index]) {
            await checkboxes[index].click();
        }
    }

    async uncheckCheckbox(index) {
        const checkboxes = await this.driver.findElements(By.css(this.checkboxSelector));
        if (checkboxes[index]) {
            await checkboxes[index].click();
        }
    }

    async isCheckboxChecked(index) {
        const checkboxes = await this.driver.findElements(By.css(this.checkboxSelector));
        if (checkboxes[index]) {
            return await checkboxes[index].isSelected();
        }
        return false;
    }
}

module.exports = CheckboxPage;