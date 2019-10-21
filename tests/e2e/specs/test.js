// https://docs.cypress.io/api/introduction/api.html

describe("Test App loaded", () => {
  it("Visits the App root url", () => {
    cy.visit("/");
    cy.contains("h1", "conduit");
  });
});
describe("Test Sign in", () => {
  it("Visits the Sign in url", () => {
    cy.visit("#/login");
    // cy.get('button').click();
    cy.contains("button", "Sign in");
  });
});
describe("Test SignUp", () => {
  it("Visits the SignUp url", () => {
    cy.visit("#/register");
    cy.contains("button", "Sign up");
  });
});
