import { createBrowserRouter, Link, Outlet, redirect } from "react-router-dom";
import { store } from "./store";
import { Counters } from "../modules/counters";
import { UserInfo } from "../modules/users";

export const { promise: storeReady, resolve: resolveStoreReady } =
    Promise.withResolvers();

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <div className="container p-5 flex flex-col gap-5">
                <header className="py-5 flex gap-4">
                    <Link to="users">Users</Link>
                    <Link to="conters">Counters</Link>
                </header>

                <Outlet></Outlet>
            </div>
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

                            store.dispatch(m.storeInitialUsersAction());

                            return null;
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

                            store.dispatch(m.storeInitialUsersAction());
                            return null;
                        },
                    })),
            },
            {
                path: "conters",
                element: <Counters />,
            },
        ],
    },
]);
