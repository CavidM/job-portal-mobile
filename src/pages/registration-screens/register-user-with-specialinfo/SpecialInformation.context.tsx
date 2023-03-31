import React from 'react';

import * as yup from 'yup';
import Toast from 'react-native-root-toast';
import useForm from '../../../core/form/Form';
import { AppScreens } from '../../../routes/Navigator.types';
import {
  GeneralInformationFormContextType,
  useGeneralInformationContext
} from '../register-user-with-generalinfo/GeneralInformation.context';
import { InputGeneralAndSpecialInfoType, UserService } from '../../../services/user-service/User.service';
import { ThemeContextType, useTheme } from '../../../core/theme/Theme';
import { useAuthentication } from '../../../hooks/authentication/useAuthentication';

export const FormContext = React.createContext<any | undefined>(undefined);

export interface FormContextProviderProps {
  children: React.ReactNode
}

export interface SpecialInformationFormSchemaType {
  professionId: string,
  specificationId: string,
  experience: string,
  salary: [number, number]
}

const schema: yup.SchemaOf<SpecialInformationFormSchemaType> = yup.object().shape({
  professionId: yup.string().required('İşi seçin'),
  specificationId: yup.string().required('Spesifikasiyanı seçin'),
  experience: yup.string().required('Təcrübəni seçin'),
  salary: yup.array().required('Əməkhaqqını daxil edin')
});

export const SpecialInformationContextProvider = (
  { children }: FormContextProviderProps
) => {
  const initialFormData = {
    professionId: '',
    specificationId: '',
    experience: '',
    salary: [1, 5000]
  };
  const { theme } = useTheme() as ThemeContextType;

  const userService = UserService();
  const useFillPersonalData = userService.useFillPersonalData();

  const { saveNewVerifiedToken } = useAuthentication();

  const {
    generalInformation
  } = useGeneralInformationContext() as GeneralInformationFormContextType;

  const {
    formData, onChange, validate, errors, handleSubmit, reset
  } = useForm<SpecialInformationFormSchemaType>(initialFormData, schema);

  const onSubmitSpecialInformation = (navigation: any) => handleSubmit(() => {
    const reqData: InputGeneralAndSpecialInfoType = { ...formData, ...generalInformation };

    const { salary } = formData;
    reqData.minSalary = salary && salary[0];
    reqData.maxSalary = salary && salary[1];

    useFillPersonalData.mutate(reqData, {
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
  });

  const pass = {
    formData, onChange, validate, errors, onSubmitSpecialInformation, reset
  };

  return (
    <FormContext.Provider value={pass}>
      {children}
    </FormContext.Provider>
  );
};

export const useSpecialInformationContext = () => React.useContext(FormContext);
