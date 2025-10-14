import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

type CounterState = {
    counter: number;
};
export type CounterId = string;

type CountersState = Record<CounterId, CounterState | undefined>;

const initialCounterState: CounterState = { counter: 0 };
const initialCountresState: CountersState = {};

export const countersSlice = createSlice({
    name: "counters",
    initialState: initialCountresState,
    selectors: {
        selectCounter: (state, counterId) =>
            state[counterId] ?? initialCounterState,
    },
    reducers: {
        incrementAction: (
            state,
            action: PayloadAction<{ counterId: CounterId }>,
        ) => {
            const { counterId } = action.payload;
            if (state[counterId]) {
                state[counterId]!.counter++;
            } else {
                state[counterId] = { counter: initialCounterState.counter + 1 };
            }
        },
        decrementAction: (
            state,
            action: PayloadAction<{ counterId: CounterId }>,
        ) => {
            const { counterId } = action.payload;
            if (state[counterId]) {
                state[counterId]!.counter--;
            } else {
                state[counterId] = { counter: initialCounterState.counter - 1 };
            }
        },
        resetCounters: () => initialCountresState,
    },
});
