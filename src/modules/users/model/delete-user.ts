import type { AppThunk } from "../../../shared/redux";
import { usersApi } from "../api";
import { type UserId } from "./domain";

export const deleteUser =
    (userId: UserId): AppThunk<Promise<void>> =>
    async (dispatch, _, { router }) => {
        await dispatch(usersApi.endpoints.deleteUser.initiate(userId)).unwrap();
        await router.navigate("/users");
        await dispatch(
            usersApi.util.invalidateTags([{ type: "Users", id: "LIST" }]),
        );
    };
