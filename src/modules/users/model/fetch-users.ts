import { api } from "../../../shared/api";
import type { AppDispatch, AppState, store } from "../../../store";
import { usersSlice } from "../users.slice";

type AppStore = typeof store

export const fetchUsers = (dispatch: AppDispatch, appState: () => AppState) => {
    const isIdle = usersSlice.selectors.selectIfFetchUsersIdle(
        appState(),
    );

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
