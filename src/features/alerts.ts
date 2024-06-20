import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  values: [
    { category: "success", message: "Success message" },
    { category: "danger", message: "Error message" },
  ],
};

export const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    add: (state, action) => {
      state.values.push(action.payload);
    },
    remove: (state, action) => {
      state.values = state.values.filter(
        (alert) =>
          alert.category !== action.payload.category ||
          alert.message !== action.payload.message
      );
    },
  },
});

export const { add, remove } = alertsSlice.actions;
export default alertsSlice.reducer;
