import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { AnnouncementTypes } from '../../core/Constants';

const announcementsFilter = createSlice({
  name: 'announcements',
  initialState: {
    announcementType: AnnouncementTypes.SEE_ALL,
    announcementStatus: 'ALL',
    maxSalary: 5000,
    minSalary: 0,
    gender: 'BOTH',
    isStarred: false,
    cityId: '',
    specificationsIds: [],
    isAgreedPrice: false,
    announcementsSpecifications: []
  },
  reducers: {
    saveAnnouncementTypeToRedux: (state, action) => {
      state.announcementType = action.payload;
    },
    saveAnnouncementStatusToRedux: (state, action) => {
      state.announcementStatus = action.payload;
    },
    saveAnnouncementFilterToRedux: (state, action) => {
      const { payload } = action;
      state.gender = payload.gender;
      state.announcementType = payload.announcementType;
      state.cityId = payload.cityId;
      if (payload.salary) {
        state.minSalary = payload?.salary[0];
        state.maxSalary = payload?.salary[1];
      }
      state.specificationsIds = payload.specificationsIds;
      state.isStarred = payload.isStarred;
      state.isAgreedPrice = payload.isAgreedPrice;
    },
    saveAnnouncementsSpecificationsToRedux: (state, action) => {
     state.announcementsSpecifications = action.payload;
 }
  }
});

export const announcementsFilterReducer = announcementsFilter.reducer;
export const {
  saveAnnouncementTypeToRedux,
  saveAnnouncementStatusToRedux,
  saveAnnouncementFilterToRedux,
  saveAnnouncementsSpecificationsToRedux
} = announcementsFilter.actions;
export const announcementsFilterSelectors = {
  getAnnouncementType: (state: RootState) => state.announcements.announcementType,
  getAnnouncementStatus: (state: RootState) => state.announcements.announcementStatus,
  getAnnouncementFilter: (state: RootState) => state.announcements,
  getAnnouncementsSpecifications: (state: RootState) => state.announcements.announcementsSpecifications
};
