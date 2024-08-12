describe("Task Management", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");

        cy.intercept("GET", "http://localhost:8000/tasks", {
            statusCode: 200,
            body: [
                {
                    id: 1,
                    task: "Initial Task",
                    created_at: new Date().toISOString(),
                    done: false,
                },
                {
                    id: 2,
                    task: "Done Task",
                    created_at: new Date().toISOString(),
                    done: true,
                },
            ],
        }).as("getTasks");

        // Intercept the POST request to create a new task
        cy.intercept("POST", "http://localhost:8000/tasks", {
            statusCode: 201,
            body: {
                id: 3, // Mock task ID
                task: "New Task",
                created_at: new Date().toISOString(),
                done: false,
            },
        }).as("createTask");
    });

    it("creates a new task and displays it", () => {
        cy.wait("@getTasks");

        cy.contains("Initial Task").should("be.visible");
        cy.contains("Done Task").should("be.visible");
        // Enter the new task into the input field
        cy.get('input[placeholder="What\'s on your plan?"]').type("New Task");

        // Click the "Add" button
        cy.get("button").contains("Add").click();

        // Wait for the POST request

        cy.wait("@createTask");

        // Verify that the new task is displayed in the task list
        cy.contains("New Task").should("be.visible");
    });
});
