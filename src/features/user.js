import { createSlice } from "@reduxjs/toolkit";
const initialState = { uid: "" };
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.uid = action.uid;
    },
    logout: (state, _) => {
      state = initialState;
    },
  },
});
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
