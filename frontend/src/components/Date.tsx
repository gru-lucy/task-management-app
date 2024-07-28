import moment from "moment";
import { memo } from "react";

type DateProps = {
    date: string;
};

const DateComponent = ({ date }: DateProps) => (
    <div className="date font-brown">
        {moment(date).format("DD.MM.YY")}
    </div>
);

export const Date = memo(DateComponent);
