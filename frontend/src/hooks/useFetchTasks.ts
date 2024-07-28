import { useState } from 'react';
import type { Task } from '../types';

const apiURL = 'http://localhost:8000';

export const useFetchTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTasks = async (referenceDate?: string) => {
        setLoading(true);
        setError(null);

        let url = `${process.env.REACT_APP_API_URL || apiURL}/tasks`;

        if (referenceDate) {
            url += `?reference_date=${encodeURIComponent(referenceDate)}`;
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }
            const data = await response.json();
            setTasks(data);
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    return {
        tasks,
        loading,
        error,
        fetchTasks,
    };
};
