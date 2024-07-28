import { ChangeEvent } from "react";
import { Button } from "../ContainedButton";
import { Input } from "../Input";

// Type definitions for the props of AddSection component
type AddSectionProps = {
    /**
     * The current value of the input field.
     */
    task: string;

    /**
     * Handler function for input field change events.
     * @param event - The change event triggered by the input field.
     */
    inputChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;

    /**
     * Handler function to be called when the 'Add' button is clicked.
     */
    createTaskHandler: () => void;
};

/**
 * Component for adding a new task.
 * 
 * Displays an input field and an 'Add' button.
 * 
 * @param props - The properties passed to the component.
 * @returns A JSX element representing the Add Section.
 */
const AddSectionComponent = ({
    task,
    inputChangeHandler,
    createTaskHandler,
}: AddSectionProps) => (
    <div className="add-section">
        <Input
            value={task}
            placeholder="What's on your plan?"
            onChange={inputChangeHandler}
        />
        <Button onClick={createTaskHandler}>
            Add
        </Button>
    </div >
);

export const AddSection = AddSectionComponent;
