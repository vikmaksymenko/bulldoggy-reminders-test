import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { suffix } from '../utils/stringUtils';

const reminderRow = 'div.reminder-row';
const reminderRowWithInput = 'div.reminder-row-with-input';
const reminderInput = 'input[type="text"]';
const reminderButton = 'img';

const newReminderRow = '[data-id="new-reminder-row"]';

When('I create a list called {string}', function(name: string) {
    name = name + suffix();
    cy.get(newReminderRow).as('root');
    cy.get('@root').click();
    cy.get('@root').find(reminderInput).type(name);
    cy.get('@root').find(reminderButton).first().click();     // There's no proper way to select this button
    this.listName = name;
});

Then('I should see list {string}', function (name: string) {
    expect(this.listName).to.not.be.undefined;
    expect(this.listName).to.contain(name);
    cy.get(reminderRow).contains(this.listName).should('be.visible');
});

Then('I should not see list {string}', function (name: string) {
    expect(this.oldListName).to.not.be.undefined;
    expect(this.oldListName).to.contain(name);
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
