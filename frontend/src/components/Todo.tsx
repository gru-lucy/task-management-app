import { ChangeEvent, useState } from "react";
import { useCreateTask } from "../hooks/useCreateTask";
import { AddSection } from "./sections/AddSection";
import { ListSection } from "./sections/ListSection";
import { PrevSection } from "./sections/PrevSection";
import { Title } from "./Title";

export const Todo = () => {
    const { task, createTask } = useCreateTask();
    const [todo, setTodo] = useState<string>("");

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodo(e.target.value);
    };

    const initTodo = () => {
        setTodo("");
    };

    const createTaskHandler = async () => {
        const response = await createTask(todo);
        if (response.success) {
            console.log('Task created successfully:', response.data);
            initTodo();
        } else {
            console.error('Error creating task:', response.error);
        }
    };

    return (
        <div className="todo-list-layout">
            <Title />
            <AddSection
                todo={todo}
                inputChangeHandler={inputChangeHandler}
                createTaskHandler={createTaskHandler}
            />
            <ListSection
                task={task}
            />
            <PrevSection />
        </div>
    );
};
