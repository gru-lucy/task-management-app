import { act } from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { useFetchTasks } from '../useFetchTasks';
import type { TaskWithStatus } from '../../types';

// Helper function to mock fetch API responses
const mockFetch = (ok: boolean, data: any) => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: ok,
            json: () => Promise.resolve(data),
        }) as Promise<Response>
    );
};

describe('useFetchTasks', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('fetches tasks successfully', async () => {
        const tasksData: TaskWithStatus[] = [
            { id: 1, task: 'Do laundry', done: false, created_at: "2024-07-28T14:39:02.448Z" }
        ];
        mockFetch(true, tasksData);
        const { result } = renderHook(() => useFetchTasks());

        act(() => {
            result.current.fetchTasks();
        });

        expect(result.current.loading).toBe(true);

        await (() => {
            expect(result.current.loading).toBe(false);
            expect(result.current.tasks).toEqual(tasksData);
            expect(result.current.error).toBeNull();
        });
    });

    it('handles API error when fetching tasks', async () => {
        mockFetch(false, { message: 'Failed to fetch tasks' });

        const { result } = renderHook(() => useFetchTasks());

        act(() => {
            result.current.fetchTasks();
        });

        expect(result.current.loading).toBe(true);

        waitFor(() => {
            expect(result.current.loading).toBe(false);
            expect(result.current.tasks).toHaveLength(0);
            expect(result.current.error).toBe('Failed to fetch tasks');
        });
    });

    it('fetches tasks with a reference date', async () => {
        const tasksData: TaskWithStatus[] = [{
            id: 2, task: 'Prepare presentation', done: true, created_at: "2024-07-06T14:39:02.448Z",
        }];
        mockFetch(true, tasksData);
        const { result } = renderHook(() => useFetchTasks());

        act(() => {
            result.current.fetchTasks('2021-07-08');
        });

        expect(result.current.loading).toBe(true);

        waitFor(() => {
            expect(result.current.loading).toBe(false);
            expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('reference_date=2021-07-08'));
            expect(result.current.tasks).toEqual(tasksData);
            expect(result.current.error).toBeNull();
        });
    });
});
