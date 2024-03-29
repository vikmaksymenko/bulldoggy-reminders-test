import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { suffix } from '../utils/stringUtils';

const reminderRow = 'div.reminder-row';
const reminderRowWithInput = 'div.reminder-row-with-input';

// Input component should be extracted to a separate class
// to prevent code duplication with reminder.ts
const reminderInput = 'input[type="text"]';
const reminderButton = 'img';

const newReminderRow = '[data-id="new-reminder-row"]';

const _selectList = (listName: string) => {
    cy.get(reminderRow).contains(listName).parent().as('list');
    cy.get('@list').click();
    cy.get('@list').should('have.class', 'selected-list');
};

When('I create a list called {string}', function(name: string) {
    name = name + suffix();
    cy.get(newReminderRow).as('root');
    cy.get('@root').click();
    cy.get('@root').find(reminderInput).type(name);
    cy.get('@root').find(reminderButton).first().click();     // There's no proper way to select this button
    this.listName = name;
});

Then('I should see list {string}', function (name: string) {
    expect(this.listName).to.be.ok.and.to.contain(name);
    cy.get(reminderRow).contains(this.listName).should('be.visible');
});

Then('I should not see list {string}', function (name: string) {
    expect(this.oldListName).to.be.ok.and.to.contain(name);
    cy.get(reminderRow).contains(this.oldListName).should('not.exist');
});

Then('I rename the list to {string}', function (newName: string) {
    expect(this.listName).to.not.be.undefined;
    this.newListName = newName + suffix();

    // Click Edit button
    cy.get(reminderRow).contains(this.listName).parent().find(reminderButton).first().click();

    cy.get(reminderRowWithInput).should('be.visible')
        .find(reminderInput).as('input');

    cy.get('@input').should('be.visible').and('have.value', this.listName);
    cy.get('@input').type(this.newListName);
    cy.get('@input').parent().find(reminderButton).first().click();

    this.oldListName = this.listName;
    this.listName = this.newListName;
});

Then('I delete the list {string}', function (name: string) {
    expect(this.listName).to.be.ok.and.to.contain(name);

    // Click Delete button
    cy.get(reminderRow).contains(this.listName).parent().find(reminderButton).last().click();
});

Then('I select the list number {int}', function (index: number) {
    expect(this.lists).to.be.ok.and.to.have.length.of.at.least(index - 1);
    _selectList(this.lists[index - 1].name);
});

Then('I select the list with reminders', function () {
    expect(this.listWithReminders).to.be.ok;
    _selectList(this.listWithReminders.name);
});