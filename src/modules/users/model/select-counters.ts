import { createSelector } from "@reduxjs/toolkit";
import type { AppState } from "../../../shared/redux";

export const selectCountersSum = createSelector(
    (state: AppState) => state.counters,
    (counters) =>
        Math.max(
            Object.values(counters).reduce((acc, counter) => {
                return acc + (counter?.counter ?? 0);
            }, 0),
            0,
        ),
);
