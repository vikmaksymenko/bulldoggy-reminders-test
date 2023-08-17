Feature: Login to app

    Background: I should be logged in
        Given I should be logged in as 'pythonista'

    Scenario: Logout from app
        When I click on logout button
        Then I should not be logged in

        When I navigate to '/reminders'
        Then I should not be logged in
        And I should see the error message 'Please login first.'
