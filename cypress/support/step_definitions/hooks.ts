import { After, Before, Step } from '@badeball/cypress-cucumber-preprocessor';

Before({ tags: "@logged_in" }, function() {
    Step(this, "I should be logged in as 'pythonista'");
});

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