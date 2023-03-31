import React from 'react';
import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';
import Toast from 'react-native-root-toast';
import { Alert } from 'react-native';
import EntryAuthPage from './EntryAuth.page';
import { formFields } from '../login-user/LoginUser.context';
import useForm from '../../core/form/Form';
import { AppScreens } from '../../routes/Navigator.types';
import { AuthService } from '../../services/auth-service/Auth.service';
import { RegistrationContextType, useRegistration } from '../../context/Registration.context';

export const EntryAuthContainer = () => {
  const navigation = useNavigation();
  const useLoginUser = AuthService().useLoginUser();
  const { saveFin, handleChangeUserType } = useRegistration() as RegistrationContextType;
  interface schemaType {
    fin: string
    birthDate: string;
  }
  const initialFormData = {
    fin: '',
    birthDate: ''
  };

  const schema: yup.SchemaOf<schemaType> = yup.object().shape({
    fin: yup.string()
      .required(formFields.fin.errorMessage)
      .min(7, 'FIN 7 simvoldan az olmamalıdır')
      .max(7, 'FIN 7 simvoldan çox olmamalıdır')
      .matches(
        /^[A-Z0-9]+$/,
        'Loqin düzgün daxil edilməyib'
      ),
    birthDate: yup.string().required(formFields.birthDate.errorMessage)
  });
  const {
    formData, onChange, errors, handleSubmit
  } = useForm(initialFormData, schema);
  const onSubmit = () => handleSubmit((data: schemaType) => {
    useLoginUser.mutate({
      ...data
    }, {
      onError() {
        Toast.show('Request failed to send.', {
          duration: Toast.durations.LONG
        });
        Alert.alert('Fin və ya doğum tarixi düzgün deyil.');
      },
      onSuccess(res) {
        navigation.navigate(AppScreens.LoginVerificationOTP);
        saveFin(data.fin);
        handleChangeUserType(res.data.data.authority);
      }
    });
  });

  return (
    <EntryAuthPage
      onChange={onChange}
      formData={formData}
      errors={errors}
      onPressSignup={() => navigation.navigate('RegisterBeforeVerification')}
      onPressLogin={() => onSubmit()}
    />
  );
};
