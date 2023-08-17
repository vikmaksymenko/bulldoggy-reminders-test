declare global {
    namespace Cypress {
      interface Chainable {
        /**
         * Custom command getting an user from the fixture
         * @example cy.getUser('pythonista')
         */
        getUser(value: string): Chainable<object>
      }
    }
  }