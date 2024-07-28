import { memo, ReactNode } from "react";

type ButtonProps = {
    onClick: () => void;
    children: ReactNode;
    disabled?: boolean;
    classicName?: string;
};

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

export const Button = memo(ButtonComponent);
