import { ChangeEvent, memo } from "react";

// Define the props for the Input component
type InputProps = {
    value?: any; // The value of the input field (optional)
    placeholder?: string; // Placeholder text for the input field (optional)
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void; // Handler function for the onChange event (optional)
};

/**
 * InputComponent renders a styled input field.
 * 
 * @param value - The value of the input field (optional)
 * @param placeholder - Placeholder text for the input field (optional)
 * @param onChange - Handler function to be called on input value change (optional)
 * 
 * @returns JSX.Element - An input element with the specified properties
 */
const InputComponent = ({
    value,
    placeholder,
    onChange,
}: InputProps) => (
    <input
        className="input"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
    />
);

// Memoize the InputComponent to prevent unnecessary re-renders
export const Input = memo(InputComponent);
