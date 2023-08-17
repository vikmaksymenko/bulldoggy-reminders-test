import { Given, Step } from '@badeball/cypress-cucumber-preprocessor';
import { User } from '../models/user';

Given('I should be logged in as {string}', (name: string) => {
    cy.getUser(name).then((user: User) => {
        cy.request({
            method: 'POST',
            url: '/login',
            form: true,
            body: {
                username: user.username,
                password: user.password
            }
        }).then((response) => {
            expect(response.status).to.be.ok;
            cy.visit('/reminders');
            Step(this, `I should be in app as '${user.username}'`);
        });
    });
});