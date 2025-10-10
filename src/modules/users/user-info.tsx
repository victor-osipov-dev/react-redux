import { useNavigate, useParams } from "react-router-dom";
import { type UserId } from "./users.slice";
import { useAppDispatch } from "../../shared/redux";
import { skipToken } from "@reduxjs/toolkit/query";
import { usersApi } from "./api";

export function UserInfo() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: UserId }>();

    const { data: user, isLoading: isLoadingUser } = usersApi.useGetUserQuery(
        id ?? skipToken,
    );

    const [deleteUser, { isLoading: isLoadingDelete }] =
        usersApi.useDeleteUserMutation();

    const handleBackButtonClick = () => {
        navigate("..", { relative: "path" });
    };

    const handleDeleteButtonClick = () => {
        if (id) {
            deleteUser(id).then(() => navigate("..", { relative: "path" }));
        }
    };

    if (isLoadingUser || !user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center">
            <button
                onClick={handleBackButtonClick}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md"
            >
                Back
            </button>
            <h2 className="text-3xl">{user.name}</h2>
            <p className="text-xl">{user.description}</p>
            <button
                onClick={handleDeleteButtonClick}
                className="bg-red-500 over:bg-red-700 text-white font-bold py-1 px-2 rounded mt-4"
                disabled={isLoadingDelete}
            >
                Delete
            </button>
        </div>
    );
}
