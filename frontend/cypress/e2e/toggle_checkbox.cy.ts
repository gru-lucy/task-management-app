describe('Update Task Status', () => {
    beforeEach(() => {
        // Mock the API response with an initial task
        cy.intercept('GET', 'http://localhost:8000/tasks', {
            statusCode: 200,
            body: [
                { id: 1, task: 'Initial Task', created_at: new Date().toISOString(), done: false },
            ]
        }).as('getTasks');

        cy.visit('http://localhost:3000/');
    });

    it('updates task status in the UI when toggled', () => {
        // Wait for the API request to complete
        cy.wait('@getTasks');

        // Click the checkbox to mark the task as completed
        cy.get('input[type="checkbox"]').check({ force: true });

        // Verify that the task is checked
        cy.get('input[type="checkbox"]').should('be.checked');
    });
});
