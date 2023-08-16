Feature: Login to app

    Scenario: Login with valid credentials
        Given I am on the login page
        When I enter valid credentials
        Then I should be logged in as "pythonista"