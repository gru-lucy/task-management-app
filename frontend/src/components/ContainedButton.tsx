import { memo, ReactNode } from "react";

// Define the props for the Button component
type ButtonProps = {
    onClick: () => void;        // Function to call when the button is clicked
    children: ReactNode;        // Content to display inside the button (text or elements)
    disabled?: boolean;         // Optional boolean to disable the button (default is false)
    classicName?: string;       // Optional additional class names to apply to the button
};

/**
 * ButtonComponent renders a styled button with click handling and optional customization.
 * 
 * @param onClick - Function to call when the button is clicked
 * @param children - Content displayed inside the button (text or elements)
 * @param disabled - Optional boolean indicating if the button should be disabled (default is false)
 * @param classicName - Optional additional class names to apply to the button
 * 
 * @returns JSX.Element - A styled button element
 */
const ButtonComponent = ({
    children,
    onClick,
    classicName,
    disabled = false
}: ButtonProps) => (
    <button
        className={`contained-button ${classicName}`}
        onClick={onClick}
        disabled={disabled}
    >
        {children}
    </button>
);

// Memoize the DateComponent to prevent unnecessary re-renders
export const Button = memo(ButtonComponent);
