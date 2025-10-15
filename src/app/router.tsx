import { createBrowserRouter, Link, Outlet, redirect } from "react-router-dom";
import { store } from "./store";
import { Counters } from "../modules/counters";
import { queryClient } from "../shared/api";
import { QueryClientProvider } from "@tanstack/react-query";

export const { promise: storeReady, resolve: resolveStoreReady } =
    Promise.withResolvers();

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <QueryClientProvider client={queryClient}>
                <div className="container p-5 flex flex-col gap-5">
                    <header className="py-5 flex gap-4">
                        <Link to="users">Users</Link>
                        <Link to="counters">Counters</Link>
                    </header>
                    <Outlet />
                </div>
            </QueryClientProvider>
        ),
        children: [
            {
                index: true,
                loader: () => redirect("/users"),
            },
            {
                path: "users",
                lazy: () =>
                    import("../modules/users").then((m) => ({
                        Component: m.UsersList,
                        loader: async () => {
                            await storeReady;
                        },
                    })),
            },
            {
                path: "users/:id",
                lazy: () =>
                    import("../modules/users").then((m) => ({
                        Component: m.UserInfo,
                        loader: async () => {
                            await storeReady;
                        },
                    })),
            },
            {
                path: "counters",
                element: <Counters />,
            },
        ],
    },
]);
