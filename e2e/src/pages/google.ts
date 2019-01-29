import { browser, element, by, ElementFinder, ElementArrayFinder, $$ } from 'protractor';

export class GooglePage {

    navigateTo() {
        return browser.get("https://www.google.com");
    }

    getSearchField(): ElementFinder {
        return element(by.name("q"));
    }

    getEnterButton(): ElementFinder {
        return element(by.name("btnK"));
    }

    getListWithLinkLists(): ElementArrayFinder {
        return $$("#rso").$$(".bkWMgd");
    }

    getListOfLinksByNumber(): ElementArrayFinder {
        return this.getListWithLinkLists().$$(".g");
    }

    getLinkByNumber(itemIndex: number): ElementFinder {
        return this.getListOfLinksByNumber().get(itemIndex)
        .$("a");
    }
}