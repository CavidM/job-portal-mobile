import {combineReducers, configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';
import { authenticationReducer } from './slices/authenticationSlice';
import { orderUsersSearchParamsReducer } from './slices/orderUsersSearchParams.slice';
import { createOrderPayloadReducer } from './slices/createOrderPayload';
import { announcementsFilterReducer } from './slices/announcements.slice';
import { questionnaireReducer } from './slices/questionnaire.slice';
import { notificationsReducer } from './slices/notifications.slice';
import { specialInformationReducer } from './slices/specialInformation.slice';
import { userInfoViaAsanReducer } from './slices/userInfoViaAsan.slice';
import { dmaInfoReducer } from './slices/dmaInfo';
import { registrationFlowReducer } from './slices/registrationFlow.slice';
import { userInfoReducer } from './slices/userInfo';

const combinedReducer = combineReducers({
  authentication: authenticationReducer,
  orderUsersSearchParams: orderUsersSearchParamsReducer,
  createOrderPayload: createOrderPayloadReducer,
  announcements: announcementsFilterReducer,
  questionnaire: questionnaireReducer,
  specialInformations: specialInformationReducer,
  userInfoViaAsan: userInfoViaAsanReducer,
  notifications: notificationsReducer,
  dmaInfo: dmaInfoReducer,
  registrationFlow: registrationFlowReducer,
  userInfo: userInfoReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'authentication/signOut') {
    state = undefined;
  }
  return combinedReducer(state, action);
};
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

const blackList = [
  'authentication'
];

store.subscribe(async () => {
  const state = _.cloneDeep(store.getState());

  blackList.forEach((key) => delete state[key]);

  await AsyncStorage.setItem('redux', JSON.stringify(state));
});

export type RootState = ReturnType<typeof store.getState>

export default store;
