import {
    combineReducers,
    configureStore,
    createSelector,
    createSlice,
    type PayloadAction,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import { createAppSeletor, store, type AppUsersState } from "../../store";

type UserId = string;

type User = {
    id: UserId;
    name: string;
    description: string;
};

export const initialUsersList: User[] = Array.from(
    { length: 3000 },
    (_, index) => ({
        id: `user${index + 11}`,
        name: `User ${index + 11}`,
        description: `Description for User ${index + 11}`,
    }),
);

export type UsersState = {
    entities: Record<UserId, User>;
    ids: UserId[];
    selectedUserId: UserId | undefined;
};

const initialUsersState: UsersState = {
    entities: {},
    ids: [],
    selectedUserId: undefined,
};

const createSelectSortedUsers = () =>
    createAppSeletor(
        (state: AppUsersState) => state.users.ids,
        (state: AppUsersState) => state.users.entities,
        (_: AppUsersState, sort: "asc" | "desc") => sort,
        (ids, entities, sort) =>
            ids
                .map((id) => entities[id])
                .sort((a, b) => {
                    if (sort === "asc") {
                        return a.name.localeCompare(b.name);
                    } else {
                        return b.name.localeCompare(a.name);
                    }
                }),
    );

type ISelectSortedUsers<T = ReturnType<typeof createSelectSortedUsers>> = {
    (): T;
    state: T | null;
};

export const SelectSortedUsers: ISelectSortedUsers = () => {
    if (SelectSortedUsers.state) {
        return SelectSortedUsers.state;
    }

    SelectSortedUsers.state = createSelectSortedUsers();
    return SelectSortedUsers.state;
};
SelectSortedUsers.state = null;

export const selectSelectedUserId = (state: AppUsersState) =>
    state.users.selectedUserId;

export const usersSlice = createSlice({
    name: "users",
    initialState: initialUsersState,
    selectors: {
        selectSelectedUserId: (state) => state.selectedUserId,
        selectSortedUsers: createAppSeletor(
            (state: UsersState) => state.ids,
            (state: UsersState) => state.entities,
            (_: UsersState, sort: "asc" | "desc") => sort,
            (ids, entities, sort) =>
                ids
                    .map((id) => entities[id])
                    .sort((a, b) => {
                        if (sort === "asc") {
                            return a.name.localeCompare(b.name);
                        } else {
                            return b.name.localeCompare(a.name);
                        }
                    }),
        ),
    },
    reducers: {
        selected: (state, action: PayloadAction<{ userId: UserId }>) => {
            state.selectedUserId = action.payload.userId;
        },
        selectRemove: (state) => {
            state.selectedUserId = undefined;
        },
        stored: (state, action: PayloadAction<{ users: User[] }>) => {
            const { users } = action.payload;

            state.entities = users.reduce(
                (acc, user) => {
                    acc[user.id] = user;
                    return acc;
                },
                {} as Record<UserId, User>,
            );
            state.ids = users.map((user) => user.id);
        },
    },
});
