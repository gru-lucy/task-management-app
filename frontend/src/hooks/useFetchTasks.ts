import { useState } from 'react';
import type { Task } from '../types';

const apiURL = 'http://localhost:8000';

/**
 * Custom React hook for fetching tasks from an API.
 * 
 * This hook provides functionality to fetch tasks, manage loading and error states, and store the fetched tasks.
 * 
 * @returns An object containing:
 * - `tasks`: An array of tasks fetched from the API.
 * - `loading`: A boolean indicating if the tasks are being fetched.
 * - `error`: A string error message if the fetch operation fails, or null if there's no error.
 * - `fetchTasks`: A function to fetch tasks from the API. Optionally takes a reference date for filtering.
 */
export const useFetchTasks = () => {
    // State to store the fetched tasks
    const [tasks, setTasks] = useState<Task[]>([]);

    // State to manage the loading state of the fetch operation
    const [loading, setLoading] = useState<boolean>(false);

    // State to manage any error messages that occur during fetch
    const [error, setError] = useState<string | null>(null);

    /**
     * Fetches tasks from the API.
     * 
     * Constructs the URL with an optional reference date query parameter and sends a GET request to fetch tasks.
     * 
     * @param referenceDate - Optional date to filter tasks. If provided, it is added as a query parameter.
     */
    const fetchTasks = async (referenceDate?: string) => {
        // Set loading state to true at the start of the fetch operation
        setLoading(true);
        // Reset error state
        setError(null);

        // Construct the URL with optional reference date parameter
        let url = `${process.env.REACT_APP_API_URL || apiURL}/tasks`;

        if (referenceDate) {
            url += `?reference_date=${encodeURIComponent(referenceDate)}`;
        }

        try {
            // Send GET request to fetch tasks
            const response = await fetch(url);

            // Check if the response status is not OK
            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }

            // Parse the response JSON data
            const data = await response.json();
            // Update the tasks state with the fetched data
            setTasks(data);
        } catch (err: any) {
            // Set the error state if an error occurs
            setError(err.message || 'An unknown error occurred');
        } finally {
            // Reset loading state to false once the fetch operation completes
            setLoading(false);
        }
    };

    // Return an object containing the tasks state, loading state, error state, and the fetchTasks function
    return {
        tasks,
        loading,
        error,
        fetchTasks,
    };
};
