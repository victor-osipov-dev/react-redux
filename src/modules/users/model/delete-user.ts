import { queryClient } from "../../../shared/api";
import type { AppThunk } from "../../../shared/redux";
import { deleteUser, usersBaseKey } from "../api";
import { type UserId } from "./domain";

export const deleteUserThunk =
    (userId: UserId): AppThunk<Promise<void>> =>
    async (dispatch, _, { router }) => {
        await deleteUser(userId);
        await router.navigate("/users");
        await queryClient.invalidateQueries({
            queryKey: usersBaseKey,
        });
    };
