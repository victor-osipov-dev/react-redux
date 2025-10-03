import { createAction, createReducer } from "@reduxjs/toolkit";
import type { AppCountersState } from "../../store";

type CounterState = {
    counter: number;
};
export type CounterId = string;

export type CountersState = Record<CounterId, CounterState | undefined>;

export const incrementAction = createAction<{
    counterId: CounterId;
}>("counters/increment");
export const decrementAction = createAction<{
    counterId: CounterId;
}>("counters/decrement");

const initialCounterState: CounterState = { counter: 0 };
const initialCountersState: CountersState = {};

export const countersReducer = createReducer(
    initialCountersState,
    (builder) => {
        builder.addCase(
            incrementAction,
            (state, { payload: { counterId } }) => {
                if (!state[counterId]) {
                    state[counterId] = initialCounterState;
                }

                state[counterId].counter++;
            },
        );
        builder.addCase(
            decrementAction,
            (state, { payload: { counterId } }) => {
                if (!state[counterId]) {
                    state[counterId] = initialCounterState;
                }

                state[counterId].counter--;
            },
        );
    },
);

export const selectCounter = (state: AppCountersState, counterId: CounterId) =>
    state.counters[counterId];
