import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const dmaInfoSlice = createSlice({
  name: 'dmaInfo',
  initialState: {
    userInfo: {
      name: 'hello'
    }
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    }
  }
});

export const dmaInfoReducer = dmaInfoSlice.reducer;
export const {
  setUserInfo
} = dmaInfoSlice.actions;

export const dmaInfoSelectors = {
  getUserInfo: (state) => state.dmaInfo.userInfo
};
