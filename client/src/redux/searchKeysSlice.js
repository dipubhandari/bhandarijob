import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

const searchSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        search: (state, action) => {
            state = action.payload
            return state

        }
    },
});

export const { search } = searchSlice.actions;

export default searchSlice.reducer;
