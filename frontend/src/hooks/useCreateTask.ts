import { useState } from 'react';
import type { Task } from '../types';

const apiURL = 'http://localhost:8000';

interface CreateTaskResponse {
    success: boolean;
    data?: Task;
    error?: string;
}

export const useCreateTask = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [task, setTask] = useState<Task | undefined>();

    const createTask = async (task: string): Promise<CreateTaskResponse> => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL || apiURL}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ task }),
            });

            if (!response.ok) {
                throw new Error('Failed to create task');
            }

            const data: Task = await response.json();
            setTask(data);
            return { success: true, data };
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred');
            return { success: false, error: err.message || 'An unknown error occurred' };
        } finally {
            setLoading(false);
        }
    };

    return {
        task,
        loading,
        error,
        createTask,
    };
};
