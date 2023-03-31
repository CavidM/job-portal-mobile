import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface LocationProps {
  address: string
  latitude: number
  longitude: number
}

const createOrderPayload = createSlice({
  name: 'createOrderPayload',
  initialState: {
    location: {
      address: '',
      latitude: 0,
      longitude: 0
    },
    users: [
      {
        userId: 0
      }
    ]
  },
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload.map((id: number) => ({
        userId: id
      }));
    }
  }
});

export const createOrderPayloadReducer = createOrderPayload.reducer;
export const { setLocation, setUsers } = createOrderPayload.actions;
export const createOrderPayloadSelectors = {
  getLocation: (state: RootState) => state.createOrderPayload.location,
  getState: (state: RootState) => state.createOrderPayload
};
