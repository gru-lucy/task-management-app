import { memo } from "react";

type CheckboxProps = {
    id: number;
    label: string;
    checked?: boolean;
    onChange: () => void;
};

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

export const Checkbox = memo(CheckboxComponent);
