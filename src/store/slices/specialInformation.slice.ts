import { createSlice } from '@reduxjs/toolkit';

export const specialInformationSlice = createSlice({
  name: 'specialInformation',
  initialState: {
    profession: {
      id: '',
      name: 'Peşə'
    },
    specification: {
      id: '',
      name: 'Spesifikasiya'
    }
  },
  reducers: {
    setProfession: (state, action) => {
      state.profession.id = action.payload.itemId;
      state.profession.name = action.payload.itemName;
    },
    setSpecification: (state, action) => {
      state.specification.id = action.payload.itemId;
      state.specification.name = action.payload.itemName;
    }
  }
});

export const specialInformationReducer = specialInformationSlice.reducer;
export const {
  setSpecification, setProfession
} = specialInformationSlice.actions;

export const specialInformationSelectors = {
  getSpecification: (state: any) => state.specialInformations.specification,
  getProfession: (state: any) => state.specialInformations.profession
};
