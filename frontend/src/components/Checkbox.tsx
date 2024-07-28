import { memo } from "react";

// Define the props for the Checkbox component
type CheckboxProps = {
    id: number;              // Unique identifier for the checkbox
    label: string;           // Text label to display next to the checkbox
    checked?: boolean;      // Optional boolean to indicate if the checkbox is checked
    onChange: () => void;   // Function to call when the checkbox state changes
};

/**
 * CheckboxComponent renders a styled checkbox with an optional checked state and a label.
 * 
 * @param id - Unique identifier for the checkbox element
 * @param label - Text label displayed next to the checkbox
 * @param checked - Optional boolean indicating if the checkbox is checked
 * @param onChange - Function called when the checkbox's state changes
 * 
 * @returns JSX.Element - A styled checkbox element
 */
const CheckboxComponent = ({
    id,
    label,
    checked = false,
    onChange,
}: CheckboxProps) => (
    <div className="checkbox-container">
        <div className="checkbox">
            <input
                id={`checkbox-${id}`}
                type="checkbox"
                checked={checked}
                className="promoted-input-checkbox"
                onChange={onChange}
            />
            <svg><use xlinkHref="#checkmark" /></svg>
            <label htmlFor={`checkbox-${id}`} className={checked ? "line-through" : ""}>
                {label}
            </label>
            <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
                <symbol id="checkmark" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        fill="none"
                        d="M22.9 3.7l-15.2 16.6-6.6-7.1"
                    />
                </symbol>
            </svg>
        </div>
    </div>
);

// Memoize the DateComponent to prevent unnecessary re-renders
export const Checkbox = memo(CheckboxComponent);
