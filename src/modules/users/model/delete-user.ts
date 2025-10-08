import type { AppThunk } from "../../../store";
import { usersSlice, type UserId } from "../users.slice";
import { fetchUsers } from "./fetch-users";

export const deleteUser =
    (userId: UserId): AppThunk<Promise<void>> =>
    async (dispatch, getState, { api, router }) => {
        dispatch(usersSlice.actions.deleteUserPending());

        try {
            await api.deleteUser(userId);
            await router.navigate("/users");
            await dispatch(fetchUsers({ refetch: true }));
            dispatch(usersSlice.actions.deleteUserSuccess({ userId }));
        } catch (e) {
            dispatch(usersSlice.actions.deleteUserFailed());
        }
    };
