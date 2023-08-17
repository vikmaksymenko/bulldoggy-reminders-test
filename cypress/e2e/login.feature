Feature: Login to app

    Scenario: Login with valid credentials
        Given I am on the login page
        When I enter credentials for user "pythonista"
        Then I should be logged in as "pythonista"
