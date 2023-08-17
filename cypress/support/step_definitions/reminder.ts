import { Then } from '@badeball/cypress-cucumber-preprocessor';

const remindersCardTitle = 'h3.reminders-card-title';
const newReminderItemRow = '[data-id="new-reminder-item-row"]';

Then('I should see reminders for {string}', function (listName: string) {
    expect(this.listName).to.not.be.undefined;
    expect(this.listName).to.contain(listName);
    cy.get(remindersCardTitle).contains(this.listName).parent().as('reminders');

    cy.get('@reminders').should('be.visible');
    cy.get('@reminders').find(newReminderItemRow).should('be.visible');
});