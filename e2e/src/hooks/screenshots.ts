import { browser } from 'protractor';

const {After, Status, BeforeAll, setDefaultTimeout} = require('cucumber');

BeforeAll(() => {
    setDefaultTimeout(60000);
});

After(async function(scenario) {
    if (scenario.result.status === Status.FAILED) {
        const screenShot = await browser.takeScreenshot();
        this.attach(screenShot, 'image/png');
    }
});
