import { ChangeEvent } from "react";
import { Button } from "../ContainedButton";
import { Input } from "../Input";

type AddSectionProps = {
    todo: string;
    inputChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
    createTaskHandler: () => void;
};

const AddSectionComponent = ({
    todo,
    inputChangeHandler,
    createTaskHandler,
}: AddSectionProps) => (
    <div className="add-section">
        <Input
            value={todo}
            placeholder="What's on your plan?"
            onChange={inputChangeHandler}
        />
        <Button onClick={createTaskHandler}>
            Add
        </Button>
    </div >
);

export const AddSection = AddSectionComponent;
