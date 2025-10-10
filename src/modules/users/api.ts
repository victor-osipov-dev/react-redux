import { baseApi } from "../../shared/api";
import type { User, UserId } from "./users.slice";

export const usersApi = baseApi.injectEndpoints({
    endpoints: (create) => ({
        getUsers: create.query<User[], void>({
            query: () => "/users",
            providesTags: ["Users", { type: "Users", id: "LIST" }],
        }),
        getUser: create.query<User, UserId>({
            query: (userId) => "/users/" + userId,
            providesTags: (_, __, userId) => [
                "Users",
                { type: "Users", id: userId },
            ],
        }),
        deleteUser: create.mutation<void, UserId>({
            query: (userId) => ({ method: "DELETE", url: `/users/${userId}` }),
            invalidatesTags: (_, __, userId) => {
                return [
                    { type: "Users", id: "LIST" },
                    { type: "Users", id: userId },
                ];
            },
        }),
    }),
    overrideExisting: true,
});
