import {
    combineReducers,
    configureStore,
    createSelector,
    type ThunkAction,
    type UnknownAction,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import { usersSlice } from "./modules/users/users.slice";
import { countersReducer } from "./modules/counters/counters.slice";
import { extraArgument } from "./extra-argument";
import { resolveStoreReady } from "./router";

export const store = configureStore({
    reducer: {
        counters: countersReducer,
        [usersSlice.name]: usersSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: { extraArgument } }),
});

resolveStoreReady(true);

export type AppState = ReturnType<typeof store.getState>;
export type AppCountersState = Pick<AppState, "counters">;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<R = void> = ThunkAction<
    R,
    AppState,
    typeof extraArgument,
    UnknownAction
>;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
export const createAppSeletor = createSelector.withTypes<AppState>();
