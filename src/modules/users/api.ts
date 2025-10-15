import { baseFetch } from "../../shared/api";
import type { UserId } from "./model/domain";
import { z } from "zod";
import { queryOptions } from "@tanstack/react-query";

const UserDtoSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
});

export const usersBaseKey = ["user"];

export const getUsersQueryOptions = () => {
    return queryOptions({
        queryKey: ["user", "list"],
        queryFn: () =>
            baseFetch("users").then((res) => UserDtoSchema.array().parse(res)),
        staleTime: 5 * 1000 * 60,
    });
};

export const getUserQueryOptions = (userId: UserId) => {
    return queryOptions({
        queryKey: ["user", userId],
        queryFn: () =>
            baseFetch(`users/${userId}`).then((res) =>
                UserDtoSchema.parse(res),
            ),
    });
};

export const deleteUser = (userId: UserId) =>
    baseFetch(`users/${userId}`, { method: "DELETE" });
