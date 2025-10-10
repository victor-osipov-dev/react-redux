import { configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "../modules/users/users.slice";
import { countersReducer } from "../modules/counters/counters.slice";
import { resolveStoreReady, router } from "./router";
import { baseApi } from "../shared/api";

export const extraArgument = {
    router,
};

export const store = configureStore({
    reducer: {
        counters: countersReducer,
        [usersSlice.name]: usersSlice.reducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: { extraArgument } }).concat(
            baseApi.middleware,
        ),
});

resolveStoreReady(true);
