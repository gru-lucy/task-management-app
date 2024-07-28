import { ChangeEvent, memo } from "react";

type InputProps = {
    value?: any;
    placeholder?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

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

export const Input = memo(InputComponent);
