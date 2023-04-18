import { createSlice } from '@reduxjs/toolkit'

const state = {
  userId: null,
  login: null,
  userAvatar: null,
  stateChange: false,
  userEmail: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: state,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      login: payload.login,
      userEmail: payload.userEmail,
      userAvatar: payload.userAvatar,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: () => state,
  },
})
