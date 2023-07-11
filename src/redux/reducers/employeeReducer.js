import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    data: [],
  },
  reducers: {
    updateEmployees: (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    },
    // logoutSuccess: (state) => {
    //     localStorage.clear();
    //     return {
    //         ...state,
    //         user: null,
    //     };
    // },
  },
});

export const { updateEmployees } = employeeSlice.actions;
export default employeeSlice.reducer;
