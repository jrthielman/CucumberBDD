import { Before, When, Given, Then } from 'cucumber';
import { browser } from 'protractor';
import { GooglePage } from '../pages/google';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

let googlePage: GooglePage;

Before(() => {
    googlePage = new GooglePage();
});

Given("I am on the google website", async () => {
    await browser.waitForAngularEnabled(false).then(function () {
        googlePage.navigateTo();
    });
});

When(/^The title is "(.*)"$/, function (expectedTitle, callback) {
    browser.waitForAngularEnabled(false).then(function () {
        browser.getTitle().then(function (title) {
            expect(title).to.equal(expectedTitle);
        });
    }).then(callback);
});

When(/^I type "(.*)" into the search field and press enter$/, function (searchVal, callback){
    googlePage.getSearchField().sendKeys(searchVal).then(function (){
        googlePage.getEnterButton().isPresent().then(function (){
            googlePage.getEnterButton().click();
        })
    }).then(callback);
});

When("I click on the second link available", async () => {
    let link = googlePage.getLinkByNumber(1);
    await browser.actions().mouseMove(link).perform().then(function (){
        link.click();
    });
});

Then(/^The title should read "(.*)"$/, function (expectedTitle, callback){
    browser.getTitle().then(function (title){
        expect(title).to.equal(expectedTitle);
    }).then(callback);

});