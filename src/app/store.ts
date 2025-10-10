import { configureStore } from "@reduxjs/toolkit";
import { countersReducer } from "../modules/counters/counters.slice";
import { resolveStoreReady, router } from "./router";
import { baseApi } from "../shared/api";

export const extraArgument = {
    router,
};

export const store = configureStore({
    reducer: {
        counters: countersReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: { extraArgument } }).concat(
            baseApi.middleware,
        ),
});

resolveStoreReady(true);
