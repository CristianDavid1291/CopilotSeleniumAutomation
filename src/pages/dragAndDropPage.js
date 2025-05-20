const { By } = require('selenium-webdriver');

class DragAndDropPage {
    constructor(driver) {
        this.driver = driver;
    }

    async dragAndDropElement(sourceId, targetId) {
        const source = await this.driver.findElement(By.id(sourceId));
        const target = await this.driver.findElement(By.id(targetId));

        await this.driver.actions({ bridge: true })
            .move({ origin: source })
            .press()
            .move({ origin: target })
            .release()
            .perform();
    }

    async getColumnText(columnId) {
        const column = await this.driver.findElement(By.id(columnId));
        return await column.getText();
    }
}

module.exports = DragAndDropPage;