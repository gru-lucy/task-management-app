import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import App from "../App";

interface MockFetchResponse {
    ok: boolean;
    status?: number;
    json: () => Promise<any>;
}

declare global {
    namespace NodeJS {
        interface Global {
            fetch: jest.Mock;
        }
    }
}

global.fetch = jest.fn();

beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
});

it("creates a new task and displays it", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ([{
            id: 1,
            task: "New Task",
            created_at: new Date().toISOString(),
            done: false,
        }]),
    });

    render(<App />);

    fireEvent.change(screen.getByPlaceholderText("What's on your plan?"), {
        target: { value: "New Task" },
    });

    const addButton = screen.getByRole("button", { name: /add/i });
    fireEvent.click(addButton);

    await waitFor(() => {
        const newTask = screen.queryByText(/new task/i);
        expect(newTask).toBeInTheDocument();
    });
});

it("loads and displays tasks on initial load", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ([
            { id: 1, task: "Initial Task", created_at: new Date().toISOString(), done: false },
            { id: 2, task: "Done Task", created_at: new Date().toISOString(), done: true }
        ]),
    } as MockFetchResponse);

    render(<App />);
    await waitFor(() => {
        expect(screen.getByText("Initial Task")).toBeInTheDocument();
        expect(screen.getByText("Done Task")).toBeInTheDocument();
    });
});

it("updates task status in the UI when toggled", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ([
            { id: 1, task: "Initial Task", created_at: new Date().toISOString(), done: false },
        ]),
    } as MockFetchResponse);

    render(<App />);

    const taskCheckbox = await waitFor(() => screen.getByRole('checkbox', { name: /Initial Task/i }));
    fireEvent.click(taskCheckbox);
    await waitFor(() => {
        expect(taskCheckbox).toBeChecked();
    });
});

it("filters tasks based on completion status", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ([
            { id: 1, task: "Initial Task", created_at: new Date().toISOString(), done: false },
            { id: 2, task: "Done Task", created_at: new Date().toISOString(), done: true }
        ]),
    } as MockFetchResponse);

    render(<App />);

    await waitFor(() => {
        expect(screen.getByText("Initial Task")).toBeInTheDocument();
        expect(screen.getByText("Done Task")).toBeInTheDocument();
    });

    const taskCheckbox = await waitFor(() => screen.getByRole('checkbox', { name: /Done Task/i }));
    fireEvent.click(taskCheckbox);

    const doneButton = screen.getByRole('button', { name: /done/i });
    fireEvent.click(doneButton);

    await waitFor(() => {
        const doneTasks = screen.getAllByText("Done Task");
        expect(doneTasks.length).toBeGreaterThan(0);
        expect(screen.queryByText("Initial Task")).not.toBeInTheDocument();
    });
});
