import { memo, ReactNode } from "react";

type ButtonProps = {
    onClick: () => void;
    children: ReactNode;
};

const ButtonComponent = ({ children, onClick }: ButtonProps) => (
    <button
        className="outlined-button font-brown"
        onClick={onClick}
    >
        {children}
    </button>
);

export const OutlinedButton = memo(ButtonComponent);
