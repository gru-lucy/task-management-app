describe('Initial Task Load', () => {
  beforeEach(() => {
      // Mock the API response for initial tasks
      cy.intercept('GET', 'http://localhost:8000/tasks', {
          statusCode: 200,
          body: [
              { id: 1, task: 'Initial Task', created_at: new Date().toISOString(), done: false },
              { id: 2, task: 'Done Task', created_at: new Date().toISOString(), done: true }
          ]
      }).as('getTasks');

      cy.visit('http://localhost:3000/');
  });

  it('loads and displays tasks on initial load', () => {
      // Wait for the API request to complete
      cy.wait('@getTasks');

      // Verify that tasks are displayed
      cy.contains('Initial Task').should('be.visible');
      cy.contains('Done Task').should('be.visible');
  });
});
