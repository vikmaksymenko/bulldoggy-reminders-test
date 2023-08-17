import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { suffix } from '../utils/stringUtils';

const remindersCardTitle = 'h3.reminders-card-title';
const newReminderItemRow = '[data-id="new-reminder-item-row"]';
const reminderItemRow = '.reminders-item-list .reminder-row';
const reminderItemRowWithInput = '.reminders-item-list .reminder-row-with-input';

const reminderInput = 'input[type="text"]';
const reminderButton = 'img';

const _shouldDisplayRemindersForList = (listName: string) => {
    cy.get(remindersCardTitle).contains(listName).parent().as('reminders');
    cy.get('@reminders').should('be.visible');
    cy.get('@reminders').find(newReminderItemRow).should('be.visible');
};

const _checkRemindersInList = (reminders: Array<string>) => {
    for(const reminder of reminders) {
        cy.get(reminderItemRow).contains(reminder).should('be.visible');
    }
};

const _validateListData = (context, index: number) => {
    expect(context.listWithReminders).to.be.ok.and.to.have.property('reminders');
    expect(context.listWithReminders.reminders).to.have.length.of.at.least(index - 1);
};

Then('I should see reminders for {string}', function (listName: string) {
    expect(this.listName).to.be.ok.and.to.contain(listName);
    _shouldDisplayRemindersForList(listName);
});

Then('I should not see reminders for {string}', function (listName: string) {
    expect(this.listName).to.be.ok.and.to.contain(listName);
    cy.get(remindersCardTitle).contains(this.listName).should('not.exist');
});

Then('I should see reminders for the list number {int}', function (index: number) {
    expect(this.lists).to.be.ok.and.to.have.length.of.at.least(index - 1);
    const list = this.lists[index - 1];
    _shouldDisplayRemindersForList(list.name);
    _checkRemindersInList(list.reminders);
});

When('I check the reminder number {int}', function (index: number) {
    _validateListData(this, index);
    cy.get(reminderItemRow).contains(this.listWithReminders.reminders[index - 1]).click();
});

Then('I should see the reminder number {int} checked', function (index: number) {
    _validateListData(this, index);
    cy.get(reminderItemRow).contains(this.listWithReminders.reminders[index - 1]).parent().should('have.class', 'completed');
});

Then('I should see the reminder number {int} unchecked', function (index: number) {
    _validateListData(this, index);
    cy.get(reminderItemRow).contains(this.listWithReminders.reminders[index - 1]).parent().should('not.have.class', 'completed');
});

When('I create a reminder called {string}', function(name: string) {
    name = name + suffix();
    cy.get(newReminderItemRow).as('root');
    cy.get('@root').click();
    cy.get('@root').find(reminderInput).type(name);
    cy.get('@root').find(reminderButton).first().click();     // There's no proper way to select this button
    this.reminderName = name;
});

Then('I should see the reminder {string}', function (name: string) {
    expect(this.reminderName).to.be.ok.and.to.contain(name);
    cy.get(reminderItemRow).contains(this.reminderName).should('be.visible');
});

When('I rename the reminder number {int} to {string}', function (index: number, newName: string) {
    _validateListData(this, index);
    this.reminderName = newName + suffix();
    const oldReminderName = this.listWithReminders.reminders[index - 1];

    // Click Edit button
    cy.get(reminderItemRow).contains(oldReminderName).parent().find(reminderButton).first().click();

    cy.get(reminderItemRowWithInput).should('be.visible')
        .find(reminderInput).as('input');

    cy.get('@input').should('be.visible').and('have.value', oldReminderName);
    cy.get('@input').type(this.reminderName);
    cy.get('@input').parent().find(reminderButton).first().click();

    this.oldReminderName = oldReminderName;
    this.listWithReminders.reminders[index - 1] = this.newReminderName;
});

Then('I delete the reminder number {int}', function (index: number) {
    _validateListData(this, index);
    // Click Delete button
    cy.get(reminderItemRow).contains(this.listWithReminders.reminders[index - 1]).parent().find(reminderButton).last().click();
});

Then('I should not see reminder number {int}', function (index: number) {
    _validateListData(this, index);
    cy.get(reminderItemRow).contains(this.listWithReminders.reminders[index - 1]).should('not.exist');
});

Then('I should not see reminder with old name', function () {
    expect(this.oldReminderName).to.be.ok;
    cy.get(reminderItemRow).contains(this.oldReminderName).should('not.exist');
});
