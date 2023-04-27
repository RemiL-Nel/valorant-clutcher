import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  auth: any;
}

const initialState: AuthState = {
  auth: {
    token: null,
    user: {} as any,
    isAuthenticated: false,
    error: null,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.auth.token = action.payload.token;
      state.auth.user = action.payload.user;
      state.auth.isAuthenticated = true;
    },
    loginFailure: (state, action) => {
      state.auth.error = action.payload;
    },
    logout: (state) => {
      state.auth.token = null;
      state.auth.user = {} as any;
      state.auth.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
