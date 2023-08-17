Feature: Login to app

    Scenario: Successul login with valid credentials
        Given I am on the login page
        When I enter credentials for user "pythonista"
        Then I should be logged in as "pythonista"

    Scenario Outline: Login with wrong password or not registered user
        Given I am on the login page
        When I enter username "<username>" and password "<password>"
        Then I should see the error message "Invalid login! Please retry."
        And I should not be logged in

        Examples:
            | username            | password       |
            | not_registered_user | password       |
            | pythonista          | wrong_password |

    # The sistem don't have specific error messages for empty email or password, so we have to setup separate scenario
    Scenario Outline: Login with empty email or password
        Given I am on the login page
        When I enter username "<username>" and password "<password>"
        And I should not be logged in

        Examples:
            | username   | password |
            |            | password |
            | pythonista |          |

