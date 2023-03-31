import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const questionnaire = createSlice({
  name: 'questionnaire',
  initialState: {
    userQuestionnaireId: null
  },
  reducers: {
    saveQuestionnaireToRedux: (state, action) => {
      if (action.payload) {
        state.userQuestionnaireId = action.payload;
      }
    }
  }
});

export const questionnaireReducer = questionnaire.reducer;
export const {
  saveQuestionnaireToRedux
} = questionnaire.actions;
export const questionnaireSelectors = {
  getQuestionnaire: (state: RootState) => state.questionnaire
};
