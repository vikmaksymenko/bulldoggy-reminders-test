import { After, Before, Step } from '@badeball/cypress-cucumber-preprocessor';


Before({ tags: '@logged_in'}, function() {
    Step(this, "I should be logged in as 'pythonista'");
});

Before({ tags: '@has_list_with_reminders' }, function() {
    Step(this, 'I have 1 lists with 3 reminders');
    cy.then(() => this.listWithReminders = this.lists[0]);
    Step(this, 'I select the list number 1');

});

// Note: this is not working after failed scenarios
// https://github.com/badeball/cypress-cucumber-preprocessor/issues/824#issuecomment-1561492281
After({ tags: '@logged_in' }, function() {
    const listsForDeletion = [];

    if(this.listName) {
        listsForDeletion.push(this.listName);
    }

    if(this.newListName) {
        listsForDeletion.push(this.newListName);
    }

    if(this.oldListName) {
        listsForDeletion.push(this.oldListName);
    }

    if(this.lists) {
        listsForDeletion.push(...this.lists.map(list => list.name));
    }

    if(listsForDeletion.length > 0) {
        cy.request('/api/reminders').then((response) => {
            expect(response.status).to.be.ok;
            return response.body
                .filter(list => listsForDeletion.includes(list['name']))
                .map(list => list['id'])
            })
        .each((listId) => {
            cy.request('DELETE', `/api/reminders/${listId}`).then((response) => {
                expect(response.status).to.be.ok;
            });
        });
    }
});