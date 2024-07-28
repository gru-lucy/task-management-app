import { useEffect, useMemo, useState } from "react";
import moment from "moment";

import { Checkbox } from "../Checkbox";
import { Button } from "../ContainedButton";
import { Date as CustomDate } from "../Date";
import type { TaskWithStatus } from "../../types";
import { useFetchTasks } from "../../hooks/useFetchTasks";

// Define the type for the grouped tasks
interface GroupedTasks {
    [date: string]: TaskWithStatus[];
}

/**
 * Component for displaying previously fetched tasks grouped by date.
 *
 * It fetches tasks, allows toggling their status, and displays them organized by their creation date.
 *
 * @returns A JSX element representing the Previous Section.
 */
export const PrevSection = () => {
    // State to manage the tasks and their statuses
    const [tasks, setTasks] = useState<Array<TaskWithStatus>>([]);

    // Destructure tasks, loading state, error, and fetch function from the custom hook
    const { tasks: prevTasks, loading, error, fetchTasks } = useFetchTasks();

    const getLatestDate = useMemo((): string => {
        if (tasks.length === 0) {
            return moment(new Date()).format("YYYY-MM-DD");
        }

        /**
         * Computes the latest date from the current tasks or returns today's date if no tasks exist.
         * 
         * @returns A string representing the latest date in YYYY-MM-DD format.
         */
        const latestDate = tasks.reduce((latest, current) => {
            const currentDate = new Date(current.created_at);
            return currentDate > latest ? currentDate : latest;
        }, new Date(0));

        return moment(latestDate).format("YYYY-MM-DD");
    }, [tasks]);

    /**
     * Handler function to fetch previous tasks based on the latest date.
     */
    const loadPrevTasksHandler = () => {
        fetchTasks(getLatestDate);
    };

    /**
     * Toggles the completion status of a task.
     * 
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
     * Groups tasks by their creation date.
     * 
     * @returns An object where each key is a date string and each value is an array of tasks created on that date.
     */
    const groupedTasks = useMemo<GroupedTasks>(() => {
        return tasks.reduce((acc: GroupedTasks, task: TaskWithStatus) => {
            const date = moment(task.created_at).format("YYYY-MM-DD");
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(task);
            return acc;
        }, {});
    }, [tasks]);

    // Effect to update tasks when previous tasks are fetched
    useEffect(() => {
        if (prevTasks) {
            setTasks([
                ...tasks,
                ...prevTasks.map((task) => ({ ...task, done: false })),
            ]);
        }
    }, [prevTasks, tasks]);

    // Render error message if there was an error fetching tasks
    if (error) return <p className="text-center">Error: {error}</p>;

    return (
        <div className="prev-section">
            <Button
                onClick={loadPrevTasksHandler}
                classicName="full-width"
                disabled={loading}
            >
                {loading ? "Loading tasks…" : "Load previous tasks ..."}
            </Button>

            {!tasks.length ? (
                <p className="text-center">No tasks</p>
            ) : (
                Object.entries(groupedTasks).map(([date, tasksForDate]) => (
                    <div key={date} className="date-status task-container">
                        <CustomDate date={date} />
                        {tasksForDate.map((task, taskIndex) => (
                            <Checkbox
                                id={task.id}
                                label={task.task}
                                checked={task.done}
                                key={`task-${task.id}-${taskIndex}`}
                                onChange={() => statusHandler(task.id)}
                            />
                        ))}
                    </div>
                ))
            )}
        </div>
    );
};
