import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on the login page", () => {
    cy.visit("/login");
});

When("I enter credentials for user {string}", (name: string) => {
    cy.fixture("users").then((users) => {
        const user = users[name];
        cy.get("input[name='username']").type(user.username);
        cy.get("input[name='password']").type(user.password);
    });
    cy.get("[data-testid='login-button']").click();
});

Then("I should be logged in as {string}", (name: string) => {
    cy.url().should("include", "/reminders");
    cy.get("#reminders-message").should("have.text", `Reminders for ${name}`);
});