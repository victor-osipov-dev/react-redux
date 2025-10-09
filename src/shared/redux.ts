import {
    createAsyncThunk,
    createSelector,
    type ThunkAction,
    type ThunkDispatch,
    type UnknownAction,
} from "@reduxjs/toolkit";
import type { extraArgument, store } from "../app/store";
import { useDispatch, useSelector, useStore } from "react-redux";

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
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppState;
    dispatch: AppDispatch;
    extra: typeof extraArgument;
}>()
