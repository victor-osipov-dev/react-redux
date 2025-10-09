import type { AppThunk } from "../../../shared/redux";
import { usersSlice } from "../users.slice";

export const fetchUsers =
    (options?: { refetch?: boolean }): AppThunk<Promise<void>> =>
    async (dispatch, getState, { api }) => {
        const isIdle = usersSlice.selectors.selectIsFetchUsersIdle(getState());

        if (!isIdle && !options?.refetch) {
            return;
        }

        dispatch(usersSlice.actions.fetchUsersPending());

        return api
            .getUsers()
            .then((users) => {
                dispatch(usersSlice.actions.fetchUsersSuccess({ users }));
            })
            .catch((err) => {
                dispatch(usersSlice.actions.fetchUsersFailed());
            });
    };
