@logged_in
Feature: List management
    Scenario: I can create a list
        When I create a list called 'test list'
        Then I should see list 'test list'
        And I should see reminders for 'test list'

    Scenario: I can rename a list
        Given I have a list called 'test list'
        When I rename the list to 'test list with new name'
        Then I should see list 'test list with new name'
        And I should see reminders for 'test list with new name'
        And I should not see list 'test list'

