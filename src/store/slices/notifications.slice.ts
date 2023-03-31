import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const notifications = createSlice({
  name: 'notifications',
  initialState: {
    newNotifications: []
  },
  reducers: {
    saveNotificationsToRedux: (state, action) => {
      if (action.payload) {
        state.newNotifications = action.payload;
      }
    }
  }
});

export const notificationsReducer = notifications.reducer;
export const {
  saveNotificationsToRedux
} = notifications.actions;
export const notificationsSelectors = {
  getNotifications: (state: RootState) => state.notifications
};
