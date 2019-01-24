# Feature: fill in textfield
#     input is shown below the textfield

#     Scenario: Home page
#         Given I am on the home page
#         When I type something into the textfield
#         Then The text i input should appear below it

Feature: subscribe to page
    fill in the form and subscribe to the page

    Scenario: I forgot to fill in my email on the subscribe form
    Given I am on the subscribe page
    When I fill in everything except my email
    # Then I get an error message