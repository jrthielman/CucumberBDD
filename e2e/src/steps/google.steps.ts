import { Before, When, Given, Then } from 'cucumber';
import { browser, element, by } from 'protractor';
import { GooglePage } from '../pages/google';
import { title } from 'process';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

let googlePage: GooglePage;

Before(() => {
    googlePage = new GooglePage();
});

Given("I am on the google website", () => {
    browser.waitForAngularEnabled(false).then(() => {
        googlePage.navigateTo();
    });
});

When(/^The title is "(.*)"$/, (expectedTitle, callback) => {
    browser.getTitle().then((title) =>{
        expect(title).to.equal(expectedTitle);
    }).then(callback);
});

When(/^I type "(.*)" into the search field and press enter$/, (searchVal, callback) => {
    expect(googlePage.getSearchField().isPresent()).to.eventually.be.true.then(() =>{
        googlePage.getSearchField().sendKeys(searchVal).then(() => {
            expect(googlePage.getEnterButton().isPresent()).to.eventually.be.true.then(() => {
                expect(googlePage.getEnterButton().isPresent()).to.eventually.be.true.then(() => {
                    googlePage.getEnterButton().click();
                });
            });
        });
    }).then(callback);

});

When("I click on the second link available", (callback) =>{
    let link = googlePage.getLinkByNumber(1);
    browser.actions().mouseMove(link).perform().then(function (){
        link.click();
    }).then(callback);
});

Then(/^The title should read "(.*)"$/, (expectedTitle, callback) =>{
    expect(browser.getTitle()).to.eventually.equal(expectedTitle).and.notify(callback);
});