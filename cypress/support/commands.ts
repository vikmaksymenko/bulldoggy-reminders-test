Cypress.Commands.add('getUser', (name: string) => {
    return cy.fixture('users').then((users) => {
        return users[name];
    });
});