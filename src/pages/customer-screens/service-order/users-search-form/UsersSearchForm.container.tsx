import { View } from 'react-native';
import React from 'react';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { UsersSearchFormPage } from './UsersSearchForm.page';
import { InformationService } from '../../../../services/information-service/Information.service';
import useForm from '../../../../core/form/Form';
import { setOrderUsersSearchParams } from '../../../../store/slices/orderUsersSearchParams.slice';
import { AppScreens } from '../../../../routes/Navigator.types';

/**
 * create getOrderUsersBySearchParams payload and type definitions in "order service"
 * create redux store which hold a flow and all data related the steps of getOrderUsersBySearchParams
 * save professionId in redux
 * save specificationId in redux
 * create form validation for orderUsersBySearchParams form
 * save orderUsersBySearchParams form data in redux when form will submit
 * navigate user to usersResultForOrder
 */

export interface UsersSearchFormProps {
  jobDescription: string
  cityId: number
  experience: string
  genderType: string
  age: [number, number]
  salary: number
  isAgreedPrice: boolean
  countOfPerson: number
}

const initialFormData:UsersSearchFormProps = {
  jobDescription: '',
  cityId: 0,
  experience: '',
  genderType: 'BOTH',
  age: [18, 99],
  salary: 0,
  isAgreedPrice: false,
  countOfPerson: 1
};

const formDataSchema: yup.SchemaOf<UsersSearchFormProps> = yup.object().shape({
  jobDescription: yup.string().required('job description is required'),
  cityId: yup.number().min(1).required('city is required'),
  experience: yup.string(),
  genderType: yup.string(),
  age: yup.array(),
  salary: yup.number(),
  isAgreedPrice: yup.boolean(),
  countOfPerson: yup.number().required('person is required')
});

export const UsersSearchFormContainer = () => {
  const informationService = InformationService();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { data: cities } = informationService.useGetCities();

  const {
    formData, onChange, errors, handleSubmit
  } = useForm(initialFormData, formDataSchema);

  const onChangeFormData = (field: string, value: any) => {
    onChange(field, value);
  };

  const onSubmit = () => handleSubmit((formData) => {
    dispatch(setOrderUsersSearchParams(formData));
    navigation.navigate(AppScreens.ServiceOrderUsersSearchResult);
  });

  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start'
    }}
    >
      <UsersSearchFormPage
        cities={cities?.data.data ?? []}
        formData={formData}
        onChangeFormData={onChangeFormData}
        onSubmit={onSubmit}
        errors={errors}
      />
    </View>
  );
};
