import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const applySlice = createSlice({
    name: "apply",
    initialState,
    reducers: {
        apply: (state, action) => {
            console.log(action.payload)
            state = action.payload           
            return state
        }
    },
});

export const { apply } = applySlice.actions;

export default applySlice.reducer;