import { createSelector } from "@reduxjs/toolkit";
import { usersListSlice } from "./users-list.slice";
import { usersSlice } from "./users.slice";

export const selectSortedUsers = createSelector(
    usersListSlice.selectors.sortType,
    usersSlice.selectors.usersList,
    (sortType, users) =>
        [...(users ?? [])].sort((a, b) => {
            if (sortType === "asc") {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        }),
);
