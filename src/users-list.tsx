import { memo, useState } from "react";
import {
    createAppSeletor,
    useAppDispatch,
    useAppSelector,
    type AppState,
    type UserRemoveSelectedAction,
    type UserSelectedAction,
} from "./store";

type UserId = string;
type User = {
    id: UserId;
    name: string;
    description: string;
};

const selectSortedUsers = createAppSeletor(
    (state: AppState) => state.users.ids,
    (state: AppState) => state.users.entities,
    (_: AppState, sort: "asc" | "desc") => sort,
    (ids, entities, sort) =>
        ids
            .map((id) => entities[id])
            .sort((a, b) => {
                if (sort === "asc") {
                    return a.name.localeCompare(b.name);
                } else {
                    return b.name.localeCompare(a.name);
                }
            }),
);

export function UsersList() {
    const [sortType, setSortType] = useState<"asc" | "desc">("asc");

    const sortedUsers = useAppSelector((state: AppState) =>
        selectSortedUsers(state, sortType),
    );
    const selectedUserId = useAppSelector(
        (state) => state.users.selectedUserId,
    );

    return (
        <div className="flex flex-col items-center">
            {!selectedUserId ? (
                <div className="flex flex-col items-center justify-between">
                    <div className="flex flex-row items-center">
                        <button
                            onClick={() => setSortType("asc")}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Asc
                        </button>
                        <button
                            onClick={() => setSortType("desc")}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
                        >
                            Desc
                        </button>
                    </div>
                    <ul className="list-none">
                        {sortedUsers.map((user: User) => (
                            <UserListItem userId={user.id} key={user.id} />
                        ))}
                    </ul>
                </div>
            ) : (
                <SelectedUser userId={selectedUserId} />
            )}
        </div>
    );
}

const UserListItem = memo(({ userId }: { userId: UserId }) => {
    const user = useAppSelector((state) => state.users.entities[userId]);
    const dispatch = useAppDispatch();

    const handleUserClick = () => {
        dispatch({
            type: "setUserSelected",
            payload: { userId: user.id },
        } satisfies UserSelectedAction);
    };

    return (
        <li key={user.id} className="py-2" onClick={handleUserClick}>
            <span className="hover:underline cursor-pointer">{user.name}</span>
        </li>
    );
});

function SelectedUser({ userId }: { userId: UserId }) {
    const user = useAppSelector((state) => state.users.entities[userId]);
    const dispatch = useAppDispatch();
    const handleBackButtonClick = () => {
        dispatch({
            type: "userRemoveSelected",
        } satisfies UserRemoveSelectedAction);
    };

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
        </div>
    );
}
