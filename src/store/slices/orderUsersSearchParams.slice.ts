import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserTypeApplicant, UserTypeCustomer } from '../../context/Registration.context';
import { UsersSearchFormProps } from '../../pages/customer-screens/service-order/users-search-form/UsersSearchForm.container';
import { RootState } from '../store';

export const orderUsersSearchParamsSlice = createSlice({
  name: 'searchUsersForOrder',
  initialState: {
    countOfPerson: 0,
    jobDescription: '',
    userSearchPayload: {
      authorityName: UserTypeApplicant,
      cityId: 0,
      experience: '',
      genderType: null,
      maxAge: 0,
      minAge: 0,
      minSalary: 0,
      pageIndex: 0,
      pageSize: 50,
      professionId: 0,
      specificationId: 0,
      isAgreedPrice: false
    }
  },
  reducers: {
    setProfession: (state, action) => {
      state.userSearchPayload.professionId = action.payload;
    },
    setSpecification: (state, action) => {
      state.userSearchPayload.specificationId = action.payload !== 0 ? action.payload : null;
    },
    setOrderUsersSearchParams: (state, action:PayloadAction<UsersSearchFormProps>) => {
      const { payload } = action;
      state.jobDescription = payload.jobDescription;
      state.countOfPerson = payload.countOfPerson;
      state.userSearchPayload.cityId = payload.cityId;
      state.userSearchPayload.experience = payload.experience || null;
      state.userSearchPayload.genderType = payload.genderType !== 'BOTH' ? payload.genderType : null;
      state.userSearchPayload.minAge = payload.age[0];
      state.userSearchPayload.maxAge = payload.age[1];
      state.userSearchPayload.minSalary = payload.isAgreedPrice ? null : payload.salary;
      state.userSearchPayload.isAgreedPrice = payload.isAgreedPrice;
    },
    loadOrderUsersSearchParams: (state, action) => {
      const { payload } = action;
      state.jobDescription = payload.jobDescription;
      state.countOfPerson = payload.countOfPerson;
      state.userSearchPayload.cityId = payload.userSearchPayload.cityId;
      state.userSearchPayload.experience = payload.userSearchPayload.experience;
      state.userSearchPayload.genderType = payload.userSearchPayload.genderType;
      state.userSearchPayload.minAge = payload.userSearchPayload.minAge;
      state.userSearchPayload.maxAge = payload.userSearchPayload.maxAge;
      state.userSearchPayload.minSalary = payload.userSearchPayload.minSalary;
      state.userSearchPayload.professionId = payload.userSearchPayload.professionId;
      state.userSearchPayload.specificationId = payload.userSearchPayload.specificationId;
    }
  }
});

export const {
  setOrderUsersSearchParams, setProfession, setSpecification, loadOrderUsersSearchParams
} = orderUsersSearchParamsSlice.actions;

export const orderUsersSearchParamsReducer = orderUsersSearchParamsSlice.reducer;

export const orderUserSearchParamsSelector = {
  getParams: (state: RootState) => state.orderUsersSearchParams
};
