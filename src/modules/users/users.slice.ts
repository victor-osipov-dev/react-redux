import {
    combineReducers,
    configureStore,
    createSelector,
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

export type UserSelectedAction = {
    type: "setUserSelected";
    payload: {
        userId: UserId;
    };
};

export type UserRemoveSelectedAction = {
    type: "userRemoveSelected";
};

export type UsersStoredAction = {
    type: "usersStored";
    payload: {
        users: User[];
    };
};

type Action = UserSelectedAction | UserRemoveSelectedAction | UsersStoredAction;

const initialUsersState: UsersState = {
    entities: {},
    ids: [],
    selectedUserId: undefined,
};

export const usersReducer = (
    state = initialUsersState,
    action: Action,
): UsersState => {
    switch (action.type) {
        case "usersStored": {
            const { users } = action.payload;
            return {
                ...state,
                entities: users.reduce(
                    (acc, user) => {
                        acc[user.id] = user;
                        return acc;
                    },
                    {} as Record<UserId, User>,
                ),
                ids: users.map((user) => user.id),
            };
        }

        case "setUserSelected": {
            const { userId } = action.payload;
            return {
                ...state,
                selectedUserId: userId,
            };
        }
        case "userRemoveSelected": {
            return {
                ...state,
                selectedUserId: undefined,
            };
        }
        default:
            return state;
    }
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
