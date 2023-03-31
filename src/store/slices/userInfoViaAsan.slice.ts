import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const userInfoViaAsanSlice = createSlice({
  name: 'specialInformation',
  initialState: {
    userInfo: null
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    }
  }
});

export const userInfoViaAsanReducer = userInfoViaAsanSlice.reducer;
export const {
  setUserInfo
} = userInfoViaAsanSlice.actions;

export const userInfoViaAsanSelectors = {
  getUserInfo: (state) => state.userInfoViaAsan.userInfo
};
