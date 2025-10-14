import {
    asyncThunkCreator,
    buildCreateSlice,
    combineSlices,
    createAsyncThunk,
    createSelector,
    type ThunkAction,
    type UnknownAction,
} from "@reduxjs/toolkit";
import type { extraArgument, store } from "../app/store";
import { useDispatch, useSelector, useStore } from "react-redux";
import { baseApi } from "./api";

export const rootReucer = combineSlices(baseApi);

// rootReucer.inject()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AppState = any;
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
}>();

export type ExtraArgument = typeof extraArgument;

export const createSlice = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
});
