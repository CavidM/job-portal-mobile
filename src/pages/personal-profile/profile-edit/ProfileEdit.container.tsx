import React from 'react';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from 'react-query';

import useForm from '../../../core/form/Form';

import { InformationService } from '../../../services/information-service/Information.service';
import { UserService } from '../../../services/user-service/User.service';

import ProfileEdit from './ProfileEdit.page';
import { RegistrationContextType, useRegistration } from '../../../context/Registration.context';

interface schemaType {
  city: number
}

const schema: yup.SchemaOf<schemaType> = yup.object().shape({
  city: yup.number().required()
});

export const ProfileEditContainer = ({ route }: any) => {
  const informationService = InformationService();
  const userService = UserService();
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const { mutate } = userService.useEditCity();

  const { userType } = useRegistration() as RegistrationContextType;

  const { data: cities } = informationService.useGetCities();

  const initialFormData = {
    city: route.params.cityid
  };

  const onSave = () => {
    mutate(formData.city, {
      onSuccess: () => {
        switch (userType) {
          case 'C':
            navigation.navigate('CustomerProfile');
            break;
          case 'B':
            navigation.navigate('ApplicantProfile');
            break;
          default:
            break;
        }
        queryClient.invalidateQueries('getUser');
      }
    });
  };
  const {
    formData, onChange
  } = useForm<schemaType>(initialFormData, schema);

  return (
    <ProfileEdit
      formData={formData}
      onChange={onChange}
      cities={cities?.data.data}
      phoneNumber={route.params.phoneNumber}
      onSave={onSave}
      initialFormData={initialFormData}
    />
  );
};
