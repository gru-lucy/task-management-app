import { useEffect, useMemo, useState } from "react";

import { Status, type Task, TaskWithStatus } from "../../types";
import { Checkbox } from "../Checkbox";
import { Date as CustomDate } from "../Date";
import { OutlinedButton } from "../OutlinedButton";
import { useFetchTasks } from "../../hooks/useFetchTasks";

// Type definitions for the props of ListSection component
type ListSectionProps = {
    /**
     * Optional task to be added to the list.
     */
    task?: Task;
};

/**
 * Component for displaying and managing a list of tasks with filtering by status.
 * 
 * @param props - The properties passed to the component.
 * @returns A JSX element representing the List Section.
 */
export const ListSection = ({ task }: ListSectionProps) => {
    // State for managing tasks with their completion status
    const [tasks, setTasks] = useState<Array<TaskWithStatus>>([]);

    // State for managing the current status filter
    const [status, setStatus] = useState<Status>(Status.ALL);

    // Fetch tasks from the hook
    const { tasks: prevTasks, error, fetchTasks } = useFetchTasks();

    // Get the list of status keys (e.g., ALL, DONE, OPEN)
    const statusKeys = Object.values(Status);

    /**
     * Handler function to change the current status filter.
     * @param key - The status to set as the current filter.
     */
    const changeCurrentStatusHandler = (key: Status) => {
        setStatus(key);
    };

    /**
     * Handler function to toggle the completion status of a task.
     * @param id - The ID of the task to toggle.
     */
    const statusHandler = (id: number) => {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                return { ...task, done: !task.done };
            }
            return task;
        }));
    };

    /**
     * Memoized list of tasks to display based on the current status filter.
     */
    const renderedTasks = useMemo(() => {
        if (status === Status.DONE) return tasks.filter(task => task.done);
        else if (status === Status.OPEN) return tasks.filter(task => !task.done);
        return tasks;
    }, [status, tasks]);

    // Effect to fetch tasks when the component mounts or fetchTasks changes
    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    // Effect to update tasks with the fetched previous tasks
    useEffect(() => {
        if (prevTasks) {
            setTasks(prevTasks.map((task) => ({ ...task, done: false })))
        }
    }, [prevTasks]);

    // Effect to add a new task if it is provided as a prop
    useEffect(() => {
        if (task) {
            setTasks((prevTasks) => {
                // Avoid duplicating the task if it already exists
                const taskExists = prevTasks.some(t => t.id === task.id);
                if (taskExists) return prevTasks;
                return [...prevTasks, { ...task, done: false }];
            });
        }
    }, [task]);

    // Render message when there are no tasks
    if (!tasks.length) return <p className="text-center">No tasks</p>

    // Render error message if there was an error fetching tasks
    if (error) return <p className="text-center">Error: {error}</p>;

    // Render the list section with date, status filters, and tasks
    return (
        <div className="list-section">
            <div className="date-status">
                <CustomDate date={new Date().toString()} />

                <div className="status-container">
                    {statusKeys.map((key, index) => (
                        <OutlinedButton key={index} onClick={() => changeCurrentStatusHandler(key)}>
                            {key}
                        </OutlinedButton>
                    ))}
                </div>
            </div>

            <div className="task-container">
                {renderedTasks.map((item) => (
                    <Checkbox
                        id={item.id}
                        label={item.task}
                        checked={item.done}
                        key={`task-${item.id}`}
                        onChange={() => statusHandler(item.id)}
                    />
                ))}
            </div>
        </div>
    );
};
