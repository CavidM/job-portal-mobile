import React, { useEffect, useState } from 'react';

import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-root-toast';
import { useSelector } from 'react-redux';
import useForm, { inputOnChangeType } from '../../../core/form/Form';
import { AppScreens } from '../../../routes/Navigator.types';
import {
  RegistrationContextType,
  useRegistration,
  UserTypeApplicant
} from '../../../context/Registration.context';
import { UserService } from '../../../services/user-service/User.service';
import { ThemeContextType, useTheme } from '../../../core/theme/Theme';
import { useAuthentication } from '../../../hooks/authentication/useAuthentication';
import { userInfoViaAsanSelectors } from '../../../store/slices/userInfoViaAsan.slice';

export type GeneralInformationFormContextType = {
  formData: Partial<GeneralInformationFormSchema>,
  onChange: inputOnChangeType,
  validate: () => void,
  errors: Partial<GeneralInformationFormSchema>,
  onSubmitGeneralInformation: (navigation: any) => void,
  reset: () => void,
  generalInformation: Partial<GeneralInformationFormSchema>
}
export const GeneralInformationFormContext = React
  .createContext<
    GeneralInformationFormContextType | undefined
  >(undefined);

export interface FormContextProviderProps {
  children: React.ReactNode
}

export interface GeneralInformationFormSchema {
  firstName: string,
  lastName: string,
  fatherName: string,
  genderType: string,
  cityId: number | undefined,
  birthDate?: string
}

const schema: yup.SchemaOf<GeneralInformationFormSchema> = yup.object().shape({
  firstName: yup.string().required('Adı daxil edin'),
  lastName: yup.string().required('Soyadı daxil edin'),
  fatherName: yup.string().required('Ata adını daxil edin'),
  genderType: yup.string().required('Cinsi seçin'),
  cityId: yup.number().required('Şəhəri seçin'),
  birthDate: yup.string()
});

export const GeneralInformationContextProvider = (
  { children }: FormContextProviderProps
) => {
  // const navigation = useNavigation();
  const { userType } = useRegistration() as RegistrationContextType;
  const { saveNewVerifiedToken } = useAuthentication();
  const userService = UserService();
  const useFillPersonalData = userService.useFillPersonalData();
  const { theme } = useTheme() as ThemeContextType;

  const [generalInformation, setGeneralInformation] = useState<
    Partial<GeneralInformationFormSchema>
  >();

  useEffect(() => {
    AsyncStorage.getItem('GeneralInformation', (error, result) => {
      if (result) {
        setGeneralInformation(JSON.parse(result));
      }
    });
  }, []);

  const userInfo = useSelector(userInfoViaAsanSelectors.getUserInfo);

  const initialFormData = {
    firstName: userInfo?.firstName,
    lastName: userInfo?.lastName,
    fatherName: userInfo?.fatherName,
    genderType: userInfo?.gender,
    cityId: null,
    birthDate: ''
  };

  const {
    formData, onChange, validate, errors, handleSubmit, reset, bulkUpdate
  } = useForm<GeneralInformationFormSchema>(initialFormData, schema);

  useEffect(() => {
    bulkUpdate(initialFormData);
  }, [userInfo]);

  const onSubmitGeneralInformation = (navigation: any) => handleSubmit(async () => {
    setGeneralInformation(formData);
    AsyncStorage.setItem('GeneralInformation', JSON.stringify(formData));

    if (userType === UserTypeApplicant) {
      navigation.navigate(AppScreens.SpecialInformation);
      return true;
    }

    useFillPersonalData.mutate(formData, {
      async onSuccess(res) {
        await saveNewVerifiedToken(res.data.data);
        navigation.navigate(AppScreens.UploadPhoto);
      },
      onError() {
        Toast.show('Information could not saved', {
          backgroundColor: theme.palette.color.danger,
          duration: Toast.durations.LONG
        });
      }
    });

    return true;
  });

  const pass = {
    formData,
    onChange,
    validate,
    errors,
    onSubmitGeneralInformation,
    reset,
    generalInformation
  };

  return (
    // @ts-ignore
    <GeneralInformationFormContext.Provider value={pass}>
      {children}
    </GeneralInformationFormContext.Provider>
  );
};

export const useGeneralInformationContext = () => React.useContext(GeneralInformationFormContext);
