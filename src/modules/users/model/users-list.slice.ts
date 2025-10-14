import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export type SortType = "asc" | "desc";
type State = {
    sortType: "asc" | "desc";
};

const initialState: State = {
    sortType: "asc",
};

export const usersListSlice = createSlice({
    name: "users-list",
    initialState: initialState,
    selectors: {
        sortType: (state) => state.sortType,
    },
    reducers: {
        setSortType: (state, action: PayloadAction<SortType>) => {
            state.sortType = action.payload;
        },
    },
});
