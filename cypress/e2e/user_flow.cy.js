describe('Flujo de Usuario Completo Rick & Morty', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/');
  });

  it('Debería permitir buscar un personaje, ver detalle y añadir a favoritos', () => {
    cy.contains('h1', 'El Hub de Rick y Morty').should('be.visible');
    cy.get('a[href^="/character/"]').should('have.length.at.least', 1);

    cy.intercept('GET', '**/character/*name=Rick*').as('searchRick');
    
    cy.get('input[placeholder="Buscar por nombre..."]').type('Rick');
    
    cy.wait('@searchRick');
    cy.contains('Rick Sanchez').should('be.visible');

    cy.contains('Rick Sanchez').click();
    
    cy.url().should('include', '/character/1');
    cy.contains('Cargando detalles...').should('not.exist');
    cy.contains('h1', 'Rick Sanchez', { timeout: 10000 }).should('be.visible');
    cy.contains('Vivo').should('be.visible');

    cy.get('button[title="Añadir a favoritos"]').click();
    
    cy.get('button[title="Eliminar de favoritos"]').should('exist');

    cy.contains('a', 'Mis Favoritos').click();
    cy.url().should('include', '/favorites');

    cy.contains('h1', 'Mi Colección').should('be.visible');
    cy.contains('Rick Sanchez').should('be.visible');
    
    cy.get('button[title="Eliminar de favoritos"]').first().click();
    
    cy.contains('Aún no hay favoritos.').should('be.visible');
  });

  it('Debería mostrar error si busca un personaje inexistente', () => {
    cy.get('input[placeholder="Buscar por nombre..."]').type('PersonajeInventado123');
    cy.contains('No se encontraron personajes').should('be.visible');
  });
});
