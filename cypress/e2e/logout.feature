@logged_in
Feature: Login to app

    Scenario: Logout from app
        When I click on logout button
        Then I should not be logged in

        When I navigate to '/reminders'
        Then I should not be logged in
        And I should see the error message 'Please login first.'
