import { configureStore } from "@reduxjs/toolkit";
import { resolveStoreReady, router } from "./router";
import { baseApi } from "../shared/api";
import { countersSlice } from "../modules/counters/counters.slice";
import { usersListSlice } from "../modules/users/model/users-list.slice";
import { initialUsers, usersSlice } from "../modules/users/model/users.slice";

export const extraArgument = {
    router,
};

export const store = configureStore({
    reducer: {
        [countersSlice.reducerPath]: countersSlice.reducer,
        [baseApi.reducerPath]: baseApi.reducer,
        [usersListSlice.reducerPath]: usersListSlice.reducer,
        [usersSlice.reducerPath]: usersSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: { extraArgument } }).concat(
            baseApi.middleware,
        ),
});

resolveStoreReady(true);

store.dispatch(usersSlice.actions.stored({ users: initialUsers }));
