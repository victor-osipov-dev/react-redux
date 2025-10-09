import { createAppAsyncThunk } from "../../../shared/redux";

export const fetchUsers = createAppAsyncThunk(
    "users/fetchUsers",
    async (_: { refetch?: boolean } = {}, thunkAPI) => {
        return thunkAPI.extra.api.getUsers();
    },
);
