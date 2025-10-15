import type { SortType } from "./users-list.slice";

export type UserId = string;

export type User = {
    id: UserId;
    name: string;
    description: string;
};

export const sortUsers = (users: User[], sortType: SortType) => {
    return [...(users ?? [])].sort((a, b) => {
        if (sortType === "asc") {
            return a.name.localeCompare(b.name);
        } else {
            return b.name.localeCompare(a.name);
        }
    });
};
