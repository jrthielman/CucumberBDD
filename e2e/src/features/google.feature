Feature: Searching on google
    I want to search something using google

    Scenario: I want to look for protractor tips
    Given I am on the google website
    When The title is "Google"
    And I type "Protractor tips" into the search field and press enter
    And I click on the second link available
    Then The title should read "Protractor: Tips & Tricks"