import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    isLoading: false,
    isSignOut: false,
    userToken: null,
    registered: false
  },
  reducers: {
    signIn: (state, action) => {
      state.userToken = action.payload;
      state.isLoading = false;
      state.registered = true;
    },
    restoreToken: (state, action) => {
      state.userToken = action.payload;
      state.isLoading = false;
      state.registered = true;
    },
    signOut: state => {
      // From here we can take action only at this "authentication" state
      // But, as we have taken care of this particular "signOut" action
      // in rootReducer, we can use it to CLEAR the complete Redux Store's state
    },
    invalidate: (state) => {
      state.isSignOut = true;
      state.userToken = null;
      state.isLoading = false;
    },
    setLoader: (state) => {
      state.isLoading = true;
    },
    saveToken: (state, action) => {
      state.userToken = action.payload;
    },
    setRegistered: (state) => {
      state.registered = true;
    },
    setUnregistered: (state) => {
      state.registered = false;
    }
  }
});

export const {
  signIn,
  restoreToken,
  signOut,
  setLoader,
  saveToken,
  setRegistered,
  invalidate,
  setUnregistered
} = authenticationSlice.actions;

export const authenticationReducer = authenticationSlice.reducer;

export const authenticationSelector = {
  getUserToken: (state: RootState) => state.authentication.userToken
};
