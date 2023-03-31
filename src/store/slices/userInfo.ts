import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const userInfo = createSlice({
  name: 'userInfo',
  initialState: {
    userName: null,
    userPhoto: null,
    professionId: null
  },
  reducers: {
    saveUserNameToRedux: (state, action) => {
      if (action.payload) {
        state.userName = action.payload;
      }
    },
    saveUserPhotoToRedux: (state, action) => {
        state.userPhoto = action.payload
    },
    saveUserProfessionIdToRedux: (state, action) => {
      if (action.payload) {
        state.professionId = action.payload;
      }
    }
  }
});

export const userInfoReducer = userInfo.reducer;
export const {
  saveUserNameToRedux,
  saveUserProfessionIdToRedux,
    saveUserPhotoToRedux
} = userInfo.actions;
export const userInfoSelectors = {
  getUserName: (state: RootState) => state.userInfo.userName,
  getUserPhoto: (state: RootState) => state.userInfo.userPhoto,
  getUserProfessionId: (state: RootState) => state.userInfo.professionId
};
