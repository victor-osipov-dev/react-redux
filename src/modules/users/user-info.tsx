import { useNavigate, useParams } from "react-router-dom";
import type { UserId } from "./model/domain";
import { useAppDispatch, useAppSelector } from "../../shared/redux";
import { usersSlice } from "./model/users.slice";

export function UserInfo() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams<{ id: UserId }>();

    const user = useAppSelector((state) =>
        usersSlice.selectors.userById(state, id ?? ""),
    );

    const handleBackButtonClick = () => {
        navigate("..", { relative: "path" });
    };

    const handleDeleteButtonClick = async () => {
        if (!id) {
            return;
        }
        dispatch(usersSlice.actions.deleteUser({ userId: id }));
        navigate("..", { relative: "path" });
    };

    if (!user) {
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
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
                Delete
            </button>
        </div>
    );
}
