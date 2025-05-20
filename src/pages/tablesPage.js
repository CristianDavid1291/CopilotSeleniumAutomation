const { By } = require('selenium-webdriver');

class TablesPage {
    constructor(driver) {
        this.driver = driver;
        this.firstTableSelector = '#table1';
        this.secondTableSelector = '#table2';
    }

    async getTextFromFirstRow() {
        const row = await this.driver.findElement(By.css(`${this.firstTableSelector} tbody tr:nth-child(1)`));
        const cells = await row.findElements(By.css('td'));
        const texts = await Promise.all(cells.map(cell => cell.getText()));
        return texts.join('  ');
    }

    async getTextFromSecondRow() {
        const row = await this.driver.findElement(By.css(`${this.firstTableSelector} tbody tr:nth-child(2)`));
        const cells = await row.findElements(By.css('td'));
        const texts = await Promise.all(cells.map(cell => cell.getText()));
        return texts.join('  ');
    }

    async getTextFromFirstRowOfSecondTable() {
        const row = await this.driver.findElement(By.css(`${this.secondTableSelector} tbody tr:nth-child(1)`));
        const cells = await row.findElements(By.css('td'));
        const texts = await Promise.all(cells.map(cell => cell.getText()));
        return texts.join('  ');
    }

    async getTextFromSecondRowOfSecondTable() {
        const row = await this.driver.findElement(By.css(`${this.secondTableSelector} tbody tr:nth-child(2)`));
        const cells = await row.findElements(By.css('td'));
        const texts = await Promise.all(cells.map(cell => cell.getText()));
        return texts.join('  ');
    }


    async getAllLastNamesFromFirstTable() {
        const lastNameCells = await this.driver.findElements(By.css('#table1 tbody tr td:nth-child(1)'));
        const lastNames = [];
        for (const cell of lastNameCells) {
            lastNames.push(await cell.getText());
        }
        return lastNames;
    }
}

module.exports = TablesPage;