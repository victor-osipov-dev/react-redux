import type { AppThunk } from "../../../store";
import { usersSlice } from "../users.slice";

export const fetchUsers =
    (): AppThunk =>
    (dispatch, getState, { api }) => {
        const isIdle = usersSlice.selectors.selectIsFetchUsersIdle(getState());

        if (!isIdle) {
            return;
        }

        dispatch(usersSlice.actions.fetchUsersPending());

        api.getUsers()
            .then((users) => {
                dispatch(usersSlice.actions.fetchUsersSuccess({ users }));
            })
            .catch((err) => {
                dispatch(usersSlice.actions.fetchUsersFailed());
            });
    };
