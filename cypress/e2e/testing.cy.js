describe('User Login Test', () => {
  it('Logs in with valid credentials', () => {
    cy.visit('/index.html');

    cy.get('#registerModal').should('be.visible');

    cy.get('#registerModal .btn-close').first().click();

    cy.get('h5#registerModalLabel').should('exist');

    cy.get('.btn.btn-outline-success.me-2').click({ force: true });

    cy.get('#registerEmail').invoke('hide');
    cy.get('#registerName').invoke('hide');
    cy.get('#registerPassword').invoke('hide');
    cy.get('#registerModal .btn-close').first().click();

    cy.get('.modal-dialog.modal-dialog-centered.modal-dialog-scrollable')
      .find('#loginForm')
      .within(() => {
        cy.get('.modal-body').within(() => {
        cy.get('input[type="email"]').clear().type('shrek@stud.noroff.no', { force: true });
        cy.get('input[type="password"]').clear().type('password123', { force: true });
        });

        cy.get('.modal-footer button[type="submit"]').click();
      });

    cy.get('button[data-auth="logout"]').should('be.visible');

    cy.wait(3000);

    cy.get('button[data-auth="logout"]').should('be.visible').click();
  
    cy.get('button[data-auth="login"]').should('be.visible');
    
  });

});








