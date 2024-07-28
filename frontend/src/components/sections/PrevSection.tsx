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

export const PrevSection = () => {
    const [tasks, setTasks] = useState<Array<TaskWithStatus>>([]);
    const { tasks: prevTasks, loading, error, fetchTasks } = useFetchTasks();

    const getLatestDate = useMemo((): string => {
        if (tasks.length === 0) {
            return moment(new Date()).format("YYYY-MM-DD");
        }

        const latestDate = tasks.reduce((latest, current) => {
            const currentDate = new Date(current.created_at);
            return currentDate > latest ? currentDate : latest;
        }, new Date(0));

        return moment(latestDate).format("YYYY-MM-DD");
    }, [tasks]);

    const loadPrevTasksHandler = () => {
        fetchTasks(getLatestDate);
    };

    const statusHandler = (id: number) => {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                return { ...task, done: !task.done };
            }
            return task;
        }));
    };

    // Group tasks by their created_at date
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

    useEffect(() => {
        if (prevTasks) {
            setTasks([
                ...tasks,
                ...prevTasks.map((task) => ({ ...task, done: false })),
            ]);
        }
    }, [prevTasks, tasks]);

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
