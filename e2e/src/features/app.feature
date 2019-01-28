# Feature: fill in textfield
#     input is shown below the textfield

#     Scenario: Home page
#         Given I am on the home page
#         When I type something into the textfield
#         Then The text i input should appear below it

Feature: subscribe to page
    fill in the form and subscribe to the page

    # Scenario: I forgot to fill in my email on the subscribe form
    # Given I am on the subscribe page
    # When I fill everything in except my email
    # Then The submit button will be disabled: "true"

    # Scenario: I filled in my email and removed it afterwards
    # Given I am on the subscribe page
    # When I fill everything in on the form
    # And I remove the email address i entered
    # Then I will see an error to enter my email "You must enter your e-mail"
    # And The submit button will be disabled: "true"

    # Scenario: I filled in my email in the wrong format
    # Given I am on the subscribe page
    # When I fill everything in except my email
    # And I fill in my email in the wrong format: "lol"
    # Then I will see an email not valid error "Not a valid email"
    # And The submit button enabled is "false" and error will still read "Not a valid email"

    # Scenario Outline: This is a real scenario
    # Given I am on the subscribe page
    # When I fill in the color <color>
    # Examples:
    # |   color       |
    # |   blue        |
    # |   black       |
    # |   green       |
    # |   purple      |
    # |   turquoise   |
    # |   #BDF9FF     |
    # |   #33EEFF     |
    # |   #00CEE0     |
    # |   #00838F     |
    # |   #1D6B72     |
    # |   #9FD6DB     |

    Scenario: I fill in the form to subscribe
    Given I am on the subscribe page
    When I fill in my "username" and "ditmail@mail.com"
    Then I shouldn't be able to click the submit button

    Scenario: I try to google
    Given I got to "https://google.com"

    # Scenario: passing a parameter
    # Given I am on the subscribe page
    # When I go "nutssssssssssssssssss"