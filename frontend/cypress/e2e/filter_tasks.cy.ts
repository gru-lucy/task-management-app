describe("Filter Tasks by Status", () => {
    beforeEach(() => {
        // Mock the API response with tasks
        cy.intercept("GET", "http://localhost:8000/tasks", {
            statusCode: 200,
            body: [
                { id: 1, task: "Initial Task", created_at: new Date().toISOString() },
                { id: 2, task: "Done Task", created_at: new Date().toISOString() },
            ],
        }).as("getTasks");

        cy.visit("http://localhost:3000/");
    });

    it("filters tasks based on completion status", () => {
        // Wait for the API request to complete
        cy.wait("@getTasks");

        // Verify that both tasks are displayed initially
        cy.contains("Initial Task").should("be.visible");
        cy.contains("Done Task").should("be.visible");

        cy.contains("label", "Done Task")
            .invoke("attr", "for") // Get the 'for' attribute which corresponds to the checkbox id
            .then((checkboxId) => {
                cy.get(`input#${checkboxId}`).check({ force: true }); // Click the checkbox
            });

        // Click the "DONE" filter button
        cy.get("button").contains("DONE").click();

        // Verify that only the "Done Task" is visible
        cy.contains("Done Task").should("be.visible");
        cy.contains("Initial Task").should("not.exist");
    });
});
