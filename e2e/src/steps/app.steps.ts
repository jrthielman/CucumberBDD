import { Before, When, Given} from 'cucumber';
import { expect } from 'chai';

import { SubscribeFormPage } from '../pages/subscribeform';
import { browser } from 'protractor';

let subscribeFormPage: SubscribeFormPage;

Before(() =>{
    subscribeFormPage = new SubscribeFormPage();
});

Given('I am on the subscribe page', async () => {
    await subscribeFormPage.navigateTo();
})

When("I fill in everything except my email", async () => {
    await subscribeFormPage.getFirstNameInput().sendKeys("firstname").then(function (){
        subscribeFormPage.getSurnameInput().sendKeys("surname").then(function () {
            subscribeFormPage.getPhoneNumberInput().sendKeys("12345678").then(function () {
                subscribeFormPage.getAddressInput().sendKeys("jusreizaplein 80").then(function () {
                    subscribeFormPage.getPostalCodeInput().sendKeys("1000 AA").then(function () {
                        subscribeFormPage.getSubmitButton().isEnabled().then(function () {
                            
                        })
                    });
                });
            });
        });
    });
});



// Given('I am on the home page', async () => {
//     await page.navigateTo();
// });

// When('I type something into the textfield', async () => {
//     await page.getInputField().sendKeys("I jus typed something");
// });

// Then('The text i input should appear below it', async () => {
//     expect(await page.getParagraph().getText()).to.equal("I just typed something");
// })

function chill(ms: number){
    browser.sleep(ms*1000);
}


