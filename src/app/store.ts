import { configureStore } from "@reduxjs/toolkit";
import { resolveStoreReady, router } from "./router";
import { rootReducer } from "../shared/redux";

export const extraArgument = {
    router,
};

export const store = configureStore({
    reducer: rootReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: { extraArgument } }),
});

resolveStoreReady(true);
