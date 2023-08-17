import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

const login = (username: string, password: string) => {
    if (username) {
        cy.get("input[name='username']").type(username);
    }
    if (password) {
        cy.get("input[name='password']").type(password);
    }
    cy.get("[data-testid='login-button']").click();
};

Given("I am on the login page", () => {
    cy.visit("/login");
});

When("I enter credentials for user {string}", (name: string) => {
    cy.fixture("users").then((users) => {
        const user = users[name];
        login(user.username, user.password);
    });
});

When("I enter username {string} and password {string}", login);

Then("I should be logged in as {string}", (name: string) => {
    cy.url().should("include", "/reminders");
    cy.get("#reminders-message").should("have.text", `Reminders for ${name}`);
});

Then("I should see the error message {string}", (message: string) => {
    cy.get(".invalid-login-warning p").should("have.text", message);
});

Then("I should not be logged in", () => {
    cy.url().should("include", "/login");
    cy.get("#reminders-message").should("not.exist");
});