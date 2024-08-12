import { useState } from 'react';
import type { Task } from '../types';

const apiURL = 'http://localhost:8000';

// Define the shape of the response from the createTask function
interface CreateTaskResponse {
    success: boolean;       // Indicates if the task creation was successful
    data?: Task;            // The created task if successful
    error?: string;         // Error message if the creation failed
}

/**
 * Custom React hook for creating tasks.
 * 
 * This hook provides a function to create a new task and handles the loading and error states.
 * 
 * @returns An object containing:
 * - `task`: The most recently created task or undefined.
 * - `loading`: A boolean indicating if the task creation is in progress.
 * - `error`: A string error message if the task creation fails, or null if there's no error.
 * - `createTask`: A function to create a new task. It takes a string task description and returns a Promise with the result.
 */
export const useCreateTask = () => {
    // State to manage the loading state of the task creation
    const [loading, setLoading] = useState<boolean>(false);

    // State to manage any error messages that occur during task creation
    const [error, setError] = useState<string | null>(null);

    // State to store the most recently created task
    const [task, setTask] = useState<Task | undefined>();

    /**
     * Creates a new task.
     * 
     * Sends a POST request to the server to create a task with the provided description.
     * 
     * @param task - The description of the task to be created.
     * @returns A Promise resolving to an object with success status and optionally the created task or error message.
     */
    const createTask = async (task: string): Promise<CreateTaskResponse> => {
        // Set loading state to true at the start of the request
        setLoading(true);
        // Reset error state
        setError(null);

        try {
            // Send POST request to create a task
            const response = await fetch(`${process.env.REACT_APP_API_URL || apiURL}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ task }),
            });

            // Check if the response status is not OK
            if (!response.ok) {
                throw new Error('Failed to create task');
            }

            // Parse the response JSON data
            const data: Task = await response.json();

            // Update the task state with the created task
            setTask(data);
            // Return success status with the created task
            return { success: true, data };
        } catch (err: any) {
            // Set the error state if an error occurs
            setError(err.message || 'An unknown error occurred');
            // Return failure status with the error message
            return { success: false, error: err.message || 'An unknown error occurred' };
        } finally {
            // Reset loading state to false once the request completes
            setLoading(false);
        }
    };

    // Return an object containing the task state, loading state, error state, and the createTask function
    return {
        task,
        loading,
        error,
        createTask,
    };
};
