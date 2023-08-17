import { Given, Step } from '@badeball/cypress-cucumber-preprocessor';
import { User } from '../models/user';
import { suffix } from '../utils/stringUtils';

Given('I should be logged in as {string}', function(name: string) {
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

Given('I have a list called {string}', function(name: string) {
    name = name + suffix();
    cy.request({
        method: 'POST',
        url: '/reminders/new-list-row',
        form: true,
        body: {
            reminder_list_name: name
        }
    }).then((response) => {
        expect(response.status).to.be.ok;
        this.listName = name;
        cy.reload();
        Step(this, `I should see list '${name}'`);
    });
});
