import { When, Then, Given, Step} from '@badeball/cypress-cucumber-preprocessor';
import { User } from '../models/user';

Given('I am on the login page', () => {
    cy.visit('/login');
});

When('I enter username {string} and password {string}', (username: string, password: string) => {
    if (username) {
        cy.get('input[name="username"]').type(username);
    }
    if (password) {
        cy.get('input[name="password"]').type(password);
    }
    cy.get('[data-testid="login-button"]').click();
});

When('I enter credentials for user {string}', (name: string) => {
    cy.getUser(name).then((user: User) => {
        Step(this, `I enter username '${user.username}' and password '${user.password}'`);
    });
});

Then('I should be in app as {string}', (name: string) => {
    cy.url().should('include', '/reminders');
    cy.get('#reminders-message').should('have.text', `Reminders for ${name}`);
});

Then('I should see the error message {string}', (message: string) => {
    cy.get('.invalid-login-warning p').should('have.text', message);
});

Then('I should not be logged in', () => {
    cy.url().should('include', '/login');
    cy.get('#reminders-message').should('not.exist');
});