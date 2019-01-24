import { browser, by, element, ElementFinder, ElementArrayFinder, promise, $ } from 'protractor';

export class SubscribeFormPage {
  navigateTo() {
    return browser.get('/');
  }

  getSubscribeFormBox(): ElementFinder{
    return element(by.css(".subscribe-form-box"));
  }

  getSubscribeForm(): ElementFinder{
    return this.getSubscribeFormBox()
    .element(by.name("subscribe-form"));
  }

  getSubscribeFormValues(): ElementArrayFinder{
    return this.getSubscribeForm().element(by.css("ul"))
    .all(by.css("li"));
  }

  getFirstNameInput(): ElementFinder{
    return element(by.name("firstname"));
  }
  
  getSurnameInput(): ElementFinder{
    return element(by.name("surname"));
  }

  getPhoneNumberInput(): ElementFinder{
    return element(by.name("phonenumber"));
  }

  getEmailInput(): ElementFinder{
    return element(by.name("email"));
  }

  getEmailError(): ElementFinder{
    return this.getSubscribeFormValues().get(3)
    .element(by.css("mat-error"));
  }

  getAddressInput(): ElementFinder{
    return element(by.name("address"));
  }

  getPostalCodeInput(): ElementFinder{
    return element(by.name("postalcode"));
  }

  getSubmitButton(): ElementFinder{
    return element(by.name("subscribe-submit"));
  }

  isSumbitButtonDisabled(): promise.Promise<string>{
    return element(by.name("subscribe-submit")).getAttribute('ng-reflect-disabled');
  }


}
