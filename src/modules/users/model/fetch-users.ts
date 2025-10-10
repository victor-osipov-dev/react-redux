import { isPending } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "../../../shared/redux";
import { usersSlice } from "../users.slice";

export const fetchUsers = createAppAsyncThunk(
    "users/fetchUsers",
    async (_: { refetch?: boolean } | undefined = {}, thunkAPI) => {
        return thunkAPI.extra.api.getUsers();
    },
    {
        condition(params, { getState }) {
            const isIdle =
                usersSlice.selectors.selectIsFetchUsersIdle(getState());

            if (!params?.refetch && !isIdle) {
                return false;
            }

            return true;
        },
    },
);
