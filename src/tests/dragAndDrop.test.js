//write a selenium test to test drag and drop functionality
// using the dragAndDropPage.js page object model
// and the dragAndDrop.test.js test file
// the drag and drop feature is available at https://the-internet.herokuapp.com/drag_and_drop


const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');
const chrome = require('selenium-webdriver/chrome');
const { Options } = require('selenium-webdriver/chrome');
const DragAndDropPage = require('../pages/dragAndDropPage.js');
const { Actions } = require('selenium-webdriver');

describe('Drag and Drop Tests', function() {
    let driver;
    let dragAndDropPage;
    this.timeout(30000);

    before(async function() {
        const chromeOptions = new Options();
        chromeOptions.addArguments(
            '--disable-save-password-bubble',
            '--disable-infobars',
            '--disable-notifications',
            '--disable-extensions'
        );
        driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
        dragAndDropPage = new DragAndDropPage(driver);
    });

    after(async function() {
        await driver.quit();
    });

    it('should drag and drop an element', async function() {
        await driver.get('https://the-internet.herokuapp.com/drag_and_drop');
        await dragAndDropPage.dragAndDropElement('column-a', 'column-b');

        const columnAText = await dragAndDropPage.getColumnText('column-a');
        expect(columnAText).to.equal('B');
        const columnBText = await dragAndDropPage.getColumnText('column-b');
        expect(columnBText).to.equal('A');
    });
});