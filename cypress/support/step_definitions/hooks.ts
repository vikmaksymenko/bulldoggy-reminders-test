import { Before, Step } from '@badeball/cypress-cucumber-preprocessor';

Before({ tags: "@logged_in" }, () => {
    Step(this, "I should be logged in as 'pythonista'");
});