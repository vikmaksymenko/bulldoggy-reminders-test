import { When } from '@badeball/cypress-cucumber-preprocessor';

When('I navigate to {string}', (endpoint: string) => {
    cy.visit(endpoint);
});