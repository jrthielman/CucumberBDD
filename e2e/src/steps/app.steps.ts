import { Before, When, Given, Then} from 'cucumber';

import { SubscribeFormPage } from '../pages/subscribeform';
import { Key, by, element } from 'protractor';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

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

// When(/^I fill in the color (.*)$/, (color, callback) => {
//     element(by.css(".color-element-holder")).element(by.css("input")).sendKeys(color).then(function(){
//         element(by.css(".color-element-holder")).element(by.cssContainingText("button", "save")).click().then(function () {
//             element(by.cssContainingText("button", "reset")).click()
//         })
//     }).then(callback);
// });



// Given(/^I go "([^"]*)"$/, (val, callback) => {
//     subscribeFormPage.getFirstNameInput().sendKeys(val);
// });

When(/^I fill in my "(.*)" and "(.*)"$/, function(username, email, callback){
    subscribeFormPage.getFirstNameInput().isPresent().then(() =>{
        subscribeFormPage.getFirstNameInput().sendKeys(username).then(function (){
            subscribeFormPage.getEmailInput().isPresent().then(function (){
                subscribeFormPage.getEmailInput().sendKeys(email);
            });
        });
    }).then(callback);
});

Then("I shouldn't be able to click the submit button", (callback) => {
    expect(subscribeFormPage.isSumbitButtonDisabled()).to.eventually.equal("true")
    .and.notify(callback);
});

// werkt niet
// When(/^I can see the (.*) message$/, function(value, callback){
//     element(by.binding("")).then( (text) =>{
//         console.log(text + "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<,,");
//     });
// });

When(/^I can see the (.*) text$/, function (firstname, callback){
    expect(element(by.cssContainingText("mat-label",firstname)).isPresent())
    .to.eventually.true.and.notify(callback);
})


