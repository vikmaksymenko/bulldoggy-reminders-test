@logged_in
Feature: List management
    Scenario: I can create a list
        When I create a list called 'test list'
        Then I should see new list
