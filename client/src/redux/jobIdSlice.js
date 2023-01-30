import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const jobIdSlice = createSlice({
    name: "jobId",
    initialState,
    reducers: {
        jobId: (state, action) => {
            state = action.payload
            return state
        }
    },
});

export const { jobId } = jobIdSlice.actions;

export default jobIdSlice.reducer;
