import z from "zod";
import { baseApi } from "../../shared/api";
import type { User, UserId } from "./model/domain";

const UserDtoSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
});

export const usersApi = baseApi.injectEndpoints({
    endpoints: (create) => ({
        getUsers: create.query<User[], void>({
            query: () => "/users",
            providesTags: ["Users", { type: "Users", id: "LIST" }],
            transformResponse: (res: unknown) =>
                UserDtoSchema.array().parse(res),
        }),
        getUser: create.query<User, UserId>({
            query: (userId) => "/users/" + userId,
            providesTags: ["Users"],
            transformResponse: (res: unknown) => UserDtoSchema.parse(res),
        }),
        deleteUser: create.mutation<void, UserId>({
            query: (userId) => ({ method: "DELETE", url: `/users/${userId}` }),
        }),
    }),
    overrideExisting: true,
});
