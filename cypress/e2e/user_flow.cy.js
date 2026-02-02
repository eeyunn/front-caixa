describe('Flujo de Usuario Completo Rick & Morty', () => {
  beforeEach(() => {
    // Limpiar LocalStorage antes de cada test para evitar estado corrupto
    cy.clearLocalStorage();
    cy.visit('/');
  });

  it('Debería permitir buscar un personaje, ver detalle y añadir a favoritos', () => {
    // 1. Verificar carga inicial de la Home
    cy.contains('h1', 'El Hub de Rick y Morty').should('be.visible');
    // Esperar a que carguen las cartas (el skeleton desaparece)
    cy.get('a[href^="/character/"]').should('have.length.at.least', 1);

    // 2. Buscar "Rick"
    cy.get('input[placeholder="Buscar por nombre..."]').type('Rick');
    // Esperar filtrado (podríamos añadir un debounce en la app, aquí esperamos un poco o verificamos resultado)
    cy.wait(500); // Pequeña espera para el debounce del filtro si existiera
    cy.contains('Rick Sanchez').should('be.visible');

    // 3. Navegar al detalle
    cy.contains('Rick Sanchez').click();
    
    // 4. Verificar página de detalle
    cy.url().should('include', '/character/1');
    // Esperar a que desaparezca el loading
    cy.contains('Cargando detalles...').should('not.exist');
    cy.contains('h1', 'Rick Sanchez', { timeout: 10000 }).should('be.visible');
    cy.contains('Vivo').should('be.visible'); // Verificamos traducción

    // 5. Añadir a favoritos
    // Buscamos el botón por su título accesible
    cy.get('button[title="Añadir a favoritos"]').click();
    
    // Verificar toast (opcional, depende de si se monta en el DOM de forma accesible para Cypress)
    // cy.contains('¡Añadido Rick Sanchez a favoritos!').should('be.visible');

    // Verificar que el botón cambió de estado
    cy.get('button[title="Eliminar de favoritos"]').should('be.exist');

    // 6. Ir a la página de Favoritos
    cy.contains('a', 'Mis Favoritos').click();
    cy.url().should('include', '/favorites');

    // 7. Verificar que Rick está en favoritos
    cy.contains('h1', 'Mi Colección').should('be.visible');
    cy.contains('Rick Sanchez').should('be.visible');
    
    // 8. Eliminar de favoritos desde la lista
    cy.get('button[title="Eliminar de favoritos"]').first().click();
    
    // 9. Verificar que se ha eliminado (la lista debería estar vacía o no contener a Rick)
    cy.contains('Aún no hay favoritos.').should('be.visible');
  });

  it('Debería mostrar error si busca un personaje inexistente', () => {
    cy.get('input[placeholder="Buscar por nombre..."]').type('PersonajeInventado123');
    cy.contains('No se encontraron personajes').should('be.visible');
  });
});
