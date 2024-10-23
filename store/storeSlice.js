import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  currentUser: null,
};

export const storeSlice = createSlice({
  name: "userstore",
  initialState,
  reducers: {
    setCurrenUser: (state, action) => {
      state.isLoggedIn = action.payload?.isAuthenticated;
      state.currentUser = action.payload?.user;
    },
    setUserAuth: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrenUser, setUserAuth } = storeSlice.actions;

export default storeSlice.reducer;
