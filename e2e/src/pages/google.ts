import { browser, element, by, ElementFinder, ElementArrayFinder, $$ } from 'protractor';
import { all } from 'q';

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
        return this.getListWithLinkLists().$$(".srg").$$(".g");
    }

    getLinkByNumber(itemIndex: number): ElementFinder {
        return this.getListOfLinksByNumber().get(itemIndex)
        .element(by.css("a"));
    }
}