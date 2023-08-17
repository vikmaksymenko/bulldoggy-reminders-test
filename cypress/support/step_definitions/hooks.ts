import { After, Before, Step } from '@badeball/cypress-cucumber-preprocessor';

Before({ tags: "@logged_in" }, function() {
    Step(this, "I should be logged in as 'pythonista'");
});

// Note: this is not working after failed scenarios
// https://github.com/badeball/cypress-cucumber-preprocessor/issues/824#issuecomment-1561492281
After({ tags: "@logged_in" }, function() {
    const lists = [];

    if(this.listName) {
        lists.push(this.listName);
    }

    if(this.newListName) {
        lists.push(this.newListName);
    }

    if(this.oldListName) {
        lists.push(this.oldListName);
    }

    if(this.lists) {
        lists.push(...this.lists.map(list => list.name));
    }

    cy.request('/api/reminders').then((response) => {
        expect(response.status).to.be.ok;
        return response.body
            .filter(list => lists.includes(list['name']))
            .map(list => list['id'])
        })
    .each((listId) => {
        cy.request('DELETE', `/api/reminders/${listId}`).then((response) => {
            expect(response.status).to.be.ok;
        });
    });
});