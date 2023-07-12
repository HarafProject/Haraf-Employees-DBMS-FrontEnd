import { createSlice } from "@reduxjs/toolkit";

const attendanceSlice = createSlice({
    name: "attendance",
    initialState: {
        wards: [],
        attendance:{},
    },
    reducers: {
        attendanceWards: (state, action) => {
            return {
                ...state,
                wards: action.payload,
            };
        },
        // This is for display purpose for supervisor to see
        updateAttendance: (state,action) => {
            return {
                ...state,
                attendance: action.payload,
            };
        }
    },
});

export const { attendanceWards, updateAttendance,attendanceRecord } = attendanceSlice.actions;
export default attendanceSlice.reducer;
