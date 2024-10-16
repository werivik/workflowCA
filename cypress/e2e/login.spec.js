describe('User Authentication Flow', () => {
  beforeEach(() => {
    cy.visit('/index.html'); 
  });

  it('allows the user to log in with valid credentials', () => {
    cy.wait(1000);
    cy.get('input[name="username"]', { timeout: 10000 }).type('validUser');
    cy.get('input[name="password"]').type('validPassword');
    cy.get('button[type="submit"]').click();
    cy.get('body').should('have.class', 'logged-in');
    cy.get('[data-visible="loggedIn"]').should('be.visible');
    cy.get('[data-visible="loggedOut"]').should('not.be.visible');
  });

  it('shows an error message with invalid credentials', () => {
    cy.get('input[name="username"]').type('invalidUser');
    cy.get('input[name="password"]').type('invalidPassword');
    cy.get('button[type="submit"]').click();
    cy.get('.error-message').should('be.visible').and('contain', 'Invalid username or password');
    cy.get('body').should('not.have.class', 'logged-in');
  });

  it('allows the user to log out', () => {
    cy.get('input[name="username"]').type('validUser');
    cy.get('input[name="password"]').type('validPassword');
    cy.get('button[type="submit"]').click();
    cy.get('body').should('have.class', 'logged-in');
    cy.get('[data-visible="loggedIn"] .logout-button').click();
    cy.get('body').should('not.have.class', 'logged-in');
  });
});





