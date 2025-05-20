const { logging } = require("selenium-webdriver");

class JavaScriptErrorPage {
    constructor(driver) {
        this.driver = driver;
    }

    // Retrieves the browser console logs and returns the first JavaScript error message found
    async getErrorMessage() {
        const logs = await this.driver.manage().logs().get('browser');
        const jsError = logs.filter(log=> log.level === logging.Level.SEVERE && log.message.includes('javascript_error'))[0];
        return jsError ? jsError.message : '';
       
    }


}

module.exports = JavaScriptErrorPage;