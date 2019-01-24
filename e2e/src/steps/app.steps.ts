import { Before, When, Given, Then} from 'cucumber';
import { expect } from 'chai';

import { SubscribeFormPage } from '../pages/subscribeform';
import { browser, Key, by, element } from 'protractor';

let subscribeFormPage: SubscribeFormPage;

Before(() =>{
    subscribeFormPage = new SubscribeFormPage();
});

Given('I am on the subscribe page', async () => {
    await subscribeFormPage.navigateTo();
});

When("I fill everything in except my email", async () => {
    await subscribeFormPage.getFirstNameInput().sendKeys("firstname").then(function (){
        subscribeFormPage.getSurnameInput().sendKeys("surname").then(function () {
            subscribeFormPage.getPhoneNumberInput().sendKeys("12345678").then(function () {
                subscribeFormPage.getAddressInput().sendKeys("jusreizaplein 80").then(function () {
                    subscribeFormPage.getPostalCodeInput().sendKeys("1000 AA");
                });
            });
        });
    });
});

Then(/^The submit button will be disabled: "(.*)"$/, (disabled, callback) => {
    subscribeFormPage.isSumbitButtonDisabled().then(function (attr){
        expect(attr).to.equal(disabled);
    }).then(callback);
});

When("I fill everything in on the form", async () => {
    await subscribeFormPage.getFirstNameInput().sendKeys("firstname").then(function (){
        subscribeFormPage.getSurnameInput().sendKeys("surname").then(function () {
            subscribeFormPage.getPhoneNumberInput().sendKeys("12345678").then(function () {
                subscribeFormPage.getEmailInput().sendKeys("my@mail.nl").then(function () {
                    subscribeFormPage.getAddressInput().sendKeys("jusreizaplein 80").then(function () {
                        subscribeFormPage.getPostalCodeInput().sendKeys("1000 AA");
                    });
                });
            });
        });
    });
});

When("I remove the email address i entered", async () =>{
    await subscribeFormPage.getEmailInput().clear().then(function () {
        subscribeFormPage.getEmailInput().sendKeys(" ");
        subscribeFormPage.getEmailInput().sendKeys(Key.BACK_SPACE);
    });
});

Then(/^I will see an error to enter my email "(.*)"$/, (error, callback) => {
    subscribeFormPage.getEmailError().getText().then(function (val){
        expect(val).to.equal(error);
    }).then(callback);
});

When(/^I fill in my email in the wrong format: "(.*)$/, (emailVal, callback) =>{
    subscribeFormPage.getEmailInput().sendKeys(emailVal).then(function (){
        subscribeFormPage.getSubmitButton().click();
    }).then(callback);
});

Then(/^I will see an email not valid error "(.*)"$/, (error, callback) => {
    subscribeFormPage.getEmailError().getText().then(function (val) {
        expect(val).to.equal(error);
    }).then(callback);
});

Then(/^The submit button enabled is "(.*)" and error will still read "(.*)"$/, (disabled, error, callback) =>{
    subscribeFormPage.isSumbitButtonDisabled().then(function (attr){
        expect(attr).to.equal(disabled);
        subscribeFormPage.getSubmitButton().click().then(function (){
            subscribeFormPage.getEmailError().getText().then(function (val){
                expect(val).to.equal(error);
            });
        });
    }).then(callback);
});

When(/^I fill in the color (.*)$/, (color, callback) => {
    element(by.css(".color-element-holder")).element(by.css("input")).sendKeys(color).then(function(){
        element(by.css(".color-element-holder")).element(by.cssContainingText("button", "save")).click().then(function () {
            element(by.cssContainingText("button", "reset")).click()
        })
    }).then(callback);
});

// Given(/^I go "([^"]*)"$/, (val, callback) => {
//     subscribeFormPage.getFirstNameInput().sendKeys(val);
// });

function chill(ms: number){
    browser.sleep(ms*1000);
}


