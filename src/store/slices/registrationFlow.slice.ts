import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const registrationFlowSlice = createSlice({
  name: 'registrationFlow',
  initialState: {
    flowType: 'custom',
    generalInfoFormIsDisabled: false,
    asanRegistered: false,
    isBirthdayInputShow: false
  },
  reducers: {
    setFlowType: (state, action) => {
      if (state.flowType !== action.payload) {
        state.flowType = action.payload;
      }
    },
    setGeneralInfoFormIsDisabled: (state, action) => {
      state.generalInfoFormIsDisabled = action.payload;
    },
    setAsanRegistered: (state, action) => {
      state.asanRegistered = action.payload;
    },
    setIsBirthdayInputShow: (state, action) => {
      state.isBirthdayInputShow = action.payload;
    }
  }
});

export const registrationFlowReducer = registrationFlowSlice.reducer;
export const {
  setFlowType,
  setGeneralInfoFormIsDisabled,
  setAsanRegistered,
  setIsBirthdayInputShow
} = registrationFlowSlice.actions;

export const registrationFlowSelectors = {
  getFlowType: (state) => state.registrationFlow.flowType,
  getAsanRegistered: (state) => state.registrationFlow.asanRegistered,
  getGeneralInfoFormIsDisabled: (state) => state.registrationFlow.generalInfoFormIsDisabled,
  getIsBirthdayInputShow: (state) => state.registrationFlow.isBirthdayInputShow
};
