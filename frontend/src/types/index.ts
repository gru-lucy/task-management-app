export enum Status {
    ALL = "ALL",
    DONE = "DONE",
    OPEN = "OPEN",
};

export interface Task {
    id: number;
    task: string;
    created_at: string;
}

export interface TaskWithStatus extends Task {
    done: boolean;
};
