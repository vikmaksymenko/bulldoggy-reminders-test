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
    cy.request('POST', '/api/reminders', {  name: name }).then((response) => {
        expect(response.status).to.be.ok;
        this.listName = name;
        cy.reload();
        Step(this, `I should see list '${name}'`);
    });
});

Given('I have {int} lists with {int} reminders', function(listsNumber: number, remindersNumber: number) {
    this.lists = [];
    for(let i = 1; i <= listsNumber; i++) {
        const list = {
            name: `List ${i}${suffix()}`,
            reminders: []
        };
        cy.request('POST', '/api/reminders', {  name: list.name }).then((response) => {
            expect(response.status).to.be.ok;
            for(let j = 1; j <= remindersNumber; j++) {
                const reminderName = `${list.name} reminder ${j}`
                cy.request('POST', `/api/reminders/${response.body.id}/items`, { description: reminderName }).then((response) => {
                    expect(response.status).to.be.ok;
                    list.reminders.push(reminderName);
                });
            }
        });
        this.lists.push(list);
    }

    cy.reload();
});
