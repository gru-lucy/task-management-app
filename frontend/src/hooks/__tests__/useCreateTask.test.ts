import { renderHook, act, waitFor } from '@testing-library/react';
import { useCreateTask } from '../useCreateTask';
import type { Task } from '../../types';

// Helper function to mock fetch API responses
const mockFetch = (ok: boolean, data: any): void => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: ok,
            json: () => Promise.resolve(data),
        }) as Promise<Response>
    );
};

describe('useCreateTask', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a task successfully', async () => {
        const taskData: Task = { id: 1, task: 'Test Task', created_at: new Date().toISOString() };
        mockFetch(true, taskData); // Mocking a successful fetch call
        const { result } = renderHook(() => useCreateTask());

        act(() => {
            result.current.createTask('Test Task');
        });

        expect(result.current.loading).toBe(true);

        waitFor(() => {
            expect(result.current.loading).toBe(false);
            expect(result.current.task).toEqual(taskData);
            expect(result.current.error).toBe(null);
        });
    });

    it('should handle API error', async () => {
        const errorMessage = 'Failed to create task';
        mockFetch(false, { message: errorMessage });

        const { result } = renderHook(() => useCreateTask());

        act(() => {
            result.current.createTask('Test Task');
        });

        expect(result.current.loading).toBe(true);

        waitFor(() => {
            expect(result.current.loading).toBe(false);
            expect(result.current.task).toBeUndefined();
            expect(result.current.error).toBe(errorMessage);
        });
    });

    it('should handle network errors', async () => {
        global.fetch = jest.fn(() => Promise.reject(new Error('Network Error')));
        const { result } = renderHook(() => useCreateTask());

        act(() => {
            result.current.createTask('Test Task');
        });

        waitFor(() => {

            expect(result.current.loading).toBe(false);
            expect(result.current.task).toBeUndefined();
            expect(result.current.error).toBe('Network Error');
        });
    });
});
