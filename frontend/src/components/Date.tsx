import moment from "moment";
import { memo } from "react";

// Define the props for the Date component
type DateProps = {
    date: string; // Date string to be formatted and displayed
};

/**
 * DateComponent renders a formatted date string.
 * 
 * @param date - A date string to be formatted and displayed
 * 
 * @returns JSX.Element - A div element displaying the formatted date
 */
const DateComponent = ({ date }: DateProps) => (
    <div className="date font-brown">
        {moment(date).format("DD.MM.YY")}
    </div>
);

// Memoize the DateComponent to prevent unnecessary re-renders
export const Date = memo(DateComponent);
