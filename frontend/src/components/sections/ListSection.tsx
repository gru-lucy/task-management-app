import { useEffect, useMemo, useState } from "react";

import { Status, type Task, TaskWithStatus } from "../../types";
import { Checkbox } from "../Checkbox";
import { Date as CustomDate } from "../Date";
import { OutlinedButton } from "../OutlinedButton";
import { useFetchTasks } from "../../hooks/useFetchTasks";

type ListSectionProps = {
    task?: Task;
};

export const ListSection = ({ task }: ListSectionProps) => {
    const [tasks, setTasks] = useState<Array<TaskWithStatus>>([]);
    const [status, setStatus] = useState<Status>(Status.ALL);
    const { tasks: prevTasks, error, fetchTasks } = useFetchTasks();
    const statusKeys = Object.values(Status);

    const changeCurrentStatusHandler = (key: Status) => {
        setStatus(key);
    };

    const statusHandler = (id: number) => {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                return { ...task, done: !task.done };
            }
            return task;
        }));
    };

    const renderedTasks = useMemo(() => {
        if (status === Status.DONE) return tasks.filter(task => task.done);
        else if (status === Status.OPEN) return tasks.filter(task => !task.done);
        return tasks;
    }, [status, tasks]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    useEffect(() => {
        if (prevTasks) {
            setTasks(prevTasks.map((task) => ({ ...task, done: false })))
        }
    }, [prevTasks]);

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

    if (!tasks.length) return <p className="text-center">No tasks</p>

    if (error) return <p className="text-center">Error: {error}</p>;

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
