describe('User Wrong Login test', () => {
    it('Shows validation error when logging in with invalid email', () => {
      cy.visit('/index.html');
  
      cy.wait(1000);
  
      cy.get('#registerModal').should('be.visible');
  
      cy.get('#registerModal .btn-close').first().click();
  
      cy.get('h5#registerModalLabel').should('exist');
  
      cy.get('.btn.btn-outline-success.me-2').click({ force: true });
  
      cy.get('#registerEmail').invoke('hide');
      cy.get('#registerName').invoke('hide');
      cy.get('#registerPassword').invoke('hide');
  
      cy.get('.modal-dialog.modal-dialog-centered.modal-dialog-scrollable')
        .find('#loginForm')
        .within(() => {
          cy.get('.modal-body').within(() => {
            cy.get('input[type="email"]').clear().type('shrek@email.com', { force: true });
            cy.get('input[type="password"]').clear().type('123', { force: true });
          });
  
          cy.get('.modal-footer button[type="submit"]').click();
        });

        cy.wait(1000);

        cy.get('input[type="email"]')
        .then(($input) => {
          const validityMessage = $input[0].validationMessage;
          expect(validityMessage).to.eq('Sørg for samsvar med det forespurte formatet.');
        });

      });
  });
  