import { Then } from "@badeball/cypress-cucumber-preprocessor";

Then('I click on logout button', () => {
    cy.get('#logout-form > button[type="submit"]').click();
});