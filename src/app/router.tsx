import { createBrowserRouter, Link, Outlet, redirect } from "react-router-dom";
import { store } from "./store";
import { UserInfo, usersApi, UsersList } from "../modules/users";
import { Counters } from "../modules/counters";

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
                element: <UsersList />,
                loader: async () => {
                    await storeReady;

                    store.dispatch(
                        usersApi.util.prefetch("getUsers", undefined, {}),
                    );
                },
            },
            {
                path: "users/:id",
                element: <UserInfo />,
                loader: async ({ params }) => {
                    await storeReady;

                    store.dispatch(
                        usersApi.util.prefetch("getUser", params.id ?? "", {}),
                    );
                },
            },
            {
                path: "conters",
                element: <Counters />,
            },
        ],
    },
]);
