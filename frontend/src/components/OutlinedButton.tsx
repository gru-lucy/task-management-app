import { memo, ReactNode } from "react";

// Define the props for the OutlinedButton component
type ButtonProps = {
    onClick: () => void; // Function to handle button click
    children: ReactNode; // Content to be displayed inside the button
};

/**
 * ButtonComponent renders a styled button with an outlined design.
 * 
 * @param onClick - Function to handle the button click event
 * @param children - Content to be displayed inside the button
 * 
 * @returns JSX.Element - A button element with the specified properties
 */
const ButtonComponent = ({ children, onClick }: ButtonProps) => (
    <button
        className="outlined-button font-brown"
        onClick={onClick}
    >
        {children}
    </button>
);

// Memoize the ButtonComponent to prevent unnecessary re-renders
export const OutlinedButton = memo(ButtonComponent);
