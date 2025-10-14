import { useAppSelector } from "../../shared/redux";
import { type CounterId, countersSlice } from "./counters.slice";
import { useDispatch } from "react-redux";

export function Counters() {
    return (
        <div className="flex flex-row items-center justify-center gap-5">
            <Counter key="1" counterId="first" />
            <Counter key="2" counterId="second" />
        </div>
    );
}

export function Counter({ counterId }: { counterId: CounterId }) {
    const dispatch = useDispatch();
    const counterState = useAppSelector((state) =>
        countersSlice.selectors.selectCounter(state, counterId),
    );

    return (
        <div className="flex flex-row items-center justify-center gap-5 ">
            counter {counterState?.counter}
            <button
                onClick={() =>
                    dispatch(
                        countersSlice.actions.incrementAction({ counterId }),
                    )
                }
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                increment
            </button>
            <button
                onClick={() =>
                    dispatch(
                        countersSlice.actions.decrementAction({ counterId }),
                    )
                }
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                decriment
            </button>
        </div>
    );
}
