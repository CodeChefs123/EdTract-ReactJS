import { createSlice } from "@reduxjs/toolkit";

const initialState = { uid: "" };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.uid = action.payload.uid; // Access payload to get uid
    },
    logout: (state, _) => {
      state.uid = ""; // Reset uid to empty string
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
