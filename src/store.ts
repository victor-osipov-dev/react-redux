import {
    combineReducers,
    configureStore,
    createSelector,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import {
    initialUsersList,
    usersReducer,
    type UserRemoveSelectedAction,
    type UserSelectedAction,
    type UsersStoredAction,
} from "./modules/users/users.slice";
import {
    countersReducer,
} from "./modules/counters/counters.slice";

export type Action =
    | UserSelectedAction
    | UserRemoveSelectedAction
    | UsersStoredAction;

const reducer = combineReducers({
    users: usersReducer,
    counters: countersReducer,
});

export const store = configureStore({
    reducer: reducer,
});

store.dispatch({
    type: "usersStored",
    payload: { users: initialUsersList },
} satisfies UsersStoredAction);

export type AppState = ReturnType<typeof store.getState>;
export type AppUsersState = Pick<AppState, "users">;
export type AppCountersState = Pick<AppState, "counters">;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
export const createAppSeletor = createSelector.withTypes<AppState>();
