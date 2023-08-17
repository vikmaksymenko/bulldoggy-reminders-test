import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { suffix } from '../utils/stringUtils';

When('I create a list called {string}', function(name: string) {
    name = name + suffix();
    cy.get('[data-id="new-reminder-row"]').as('root');
    cy.get('@root').click();
    cy.get('@root').find('input[type="text"]').type(name);
    cy.get('@root').find('img').first().click();     // There's no proper way to select this button
    cy.then(() => { this.listName = name; });
});

Then('I should see new list', function () {
    cy.get('div.reminder-row p').contains(this.listName).should('exist').and('be.visible');
});
