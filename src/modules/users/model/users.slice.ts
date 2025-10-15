import {
    createSelector,
    createSlice,
    type PayloadAction,
} from "@reduxjs/toolkit";
import type { User, UserId } from "./domain";
import { rootReducer } from "../../../shared/redux";

type State = {
    entities: Record<UserId, User | undefined>;
    ids: UserId[];
};

const initialUsersState: State = {
    entities: {},
    ids: [],
};

export const usersSlice = createSlice({
    name: "users",
    initialState: initialUsersState,
    selectors: {
        usersList: createSelector(
            (state: State) => state.ids,
            (state: State) => state.entities,
            (ids, entities) =>
                ids
                    .map((id) => entities[id])
                    .filter((user): user is User => !!user),
        ),
        userById: (state, userId: UserId) => state.entities[userId],
    },
    reducers: {
        deleteUser: (state, action: PayloadAction<{ userId: UserId }>) => {
            const { userId } = action.payload;
            delete state.entities[userId];
            state.ids = state.ids.filter((id) => id !== userId);
        },
        deleteUsers: (state, action: PayloadAction<{ userIds: UserId[] }>) => {
            const { userIds } = action.payload;

            userIds.forEach((userId) => {
                delete state.entities[userId];
            });

            state.ids = state.ids.filter((id) => !userIds.includes(id));
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
}).injectInto(rootReducer);

export const storeInitialUsersAction = usersSlice.actions.stored;
