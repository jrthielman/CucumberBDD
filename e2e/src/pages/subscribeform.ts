import { browser, by, element, ElementFinder, ElementArrayFinder } from 'protractor';

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

  getAddressInput(): ElementFinder{
    return element(by.name("address"));
  }

  getPostalCodeInput(): ElementFinder{
    return element(by.name("postalcode"));
  }

  getSubmitButton(): ElementFinder{
    return element(by.name("subscribe-submit"));
  }


}
