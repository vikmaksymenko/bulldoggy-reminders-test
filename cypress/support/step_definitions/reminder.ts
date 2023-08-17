import { Then } from '@badeball/cypress-cucumber-preprocessor';

const remindersCardTitle = 'h3.reminders-card-title';
const newReminderItemRow = '[data-id="new-reminder-item-row"]';
const reminderItemRow = '.reminders-item-list .reminder-row';

const shouldDisplayRemindersForList = (listName: string) => {
    cy.get(remindersCardTitle).contains(listName).parent().as('reminders');
    cy.get('@reminders').should('be.visible');
    cy.get('@reminders').find(newReminderItemRow).should('be.visible');
};

Then('I should see reminders for {string}', function (listName: string) {
    expect(this.listName).to.be.ok.and.to.contain(listName);
    shouldDisplayRemindersForList(listName);
});

Then('I should not see reminders for {string}', function (listName: string) {
    expect(this.listName).to.be.ok.and.to.contain(listName);
    cy.get(remindersCardTitle).contains(this.listName).should('not.exist');
});

Then('I should see reminders for the list number {int}', function (index: number) {
    expect(this.lists).to.be.ok.and.to.have.length.of.at.least(index - 1);
    const list = this.lists[index - 1];
    shouldDisplayRemindersForList(list.name);

    for(const reminder of list.reminders) {
        cy.get(reminderItemRow).contains(reminder).should('be.visible');
    }
});