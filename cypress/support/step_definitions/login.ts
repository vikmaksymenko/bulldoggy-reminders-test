import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on the login page", () => {
    cy.visit("/login");
});

When("I enter valid credentials", () => {
    cy.get("input[name='username']").type("pythonista");
    cy.get("input[name='password']").type("I<3testing");
    cy.get("[data-testid='login-button']").click();
});

Then("I should be logged in as {string}", (name: string) => {
    cy.url().should("include", "/reminders");
    cy.get("#reminders-message").should("have.text", `Reminders for ${name}`);
});