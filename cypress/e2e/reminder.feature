@logged_in @has_list_with_reminders
Feature: Reminders management
    Scenario: I can check a reminder
        Given I select the list with reminders
        When I check the reminder number 2
        Then I should see the reminder number 2 checked  

        When I check the reminder number 3
        Then I should see the reminder number 3 checked  

        When I check the reminder number 2
        Then I should see the reminder number 2 unchecked  

    Scenario: I can create a reminder
        When I create a reminder called 'test list'
        Then I should see the reminder 'test list'

    Scenario: I can rename a reminder
        When I rename the reminder number 1 to 'test reminder with new name'
        Then I should see the reminder 'test reminder with new name'
        And I should not see reminder with old name

    Scenario: I can delete a reminder
        When I delete the reminder number 1
        Then I should not see reminder number 1
