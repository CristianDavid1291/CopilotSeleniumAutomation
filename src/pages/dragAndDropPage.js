const { By } = require('selenium-webdriver');

class DragAndDropPage {
    constructor(driver) {
        this.driver = driver;
    }

    async dragAndDropElement(sourceId, targetId) {
        const source = await this.driver.findElement(By.id(sourceId));
        const target = await this.driver.findElement(By.id(targetId));

        const actions = this.driver.actions({ async: true });
        await actions.dragAndDrop(source, target).perform();
    }

    async getColumnText(columnId) {
        const column = await this.driver.findElement(By.id(columnId));
        return await column.getText();
    }
}

module.exports = DragAndDropPage;