import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
    name: "employee",
    initialState: {
        employees: [],
        wards:[]
    },
    reducers: {
        updateEmployees: (state, action) => {
            return {
                ...state,
                employees: action.payload,
            };
        },
        updateWards: (state, action) => {
            return {
                ...state,
                wards: action.payload,
            };
        },

    },
});

export const { updateEmployees,updateWards } = employeeSlice.actions;
export default employeeSlice.reducer;
