import React from 'react';
import * as yup from 'yup';
import { AxiosError } from 'axios';
import { useToast } from 'native-base';
import { useDispatch } from 'react-redux';
import useForm from '../../../core/form/Form';
import { CLIENT_TYPE } from '../../../core/config';
import { AppScreens } from '../../../routes/Navigator.types';
import { UserService } from '../../../services/user-service/User.service';
import { RegistrationContextType, useRegistration } from '../../../context/Registration.context';
import { Lang } from '../../../tools/LangTools';
import normalize from '../../common/styles/normalize';
import { setUserInfo } from '../../../store/slices/userInfoViaAsan.slice';
import { setFlowType, setGeneralInfoFormIsDisabled } from '../../../store/slices/registrationFlow.slice';

export const FormContext = React.createContext<any | undefined>(undefined);

export interface FormContextProviderProps {
  children: React.ReactNode
}

interface schemaType {
  fin: string
  phone: string
  birthDate: string;
}

const FIN_LABEL = 'FİN kod və ya 7 simvollu istənilən loqin';
const PHONE_LABEL = 'Mobil Nömrə';
const BIRTHDAY_LABEL = 'Təvəllüd';

export const formFields = {
  fin: {
    label: FIN_LABEL,
    errorMessage: `${FIN_LABEL}u daxil edin`
  },
  phone: {
    label: PHONE_LABEL,
    errorMessage: `${PHONE_LABEL}ni daxil edin`
  },
  birthDate: {
    label: BIRTHDAY_LABEL,
    errorMessage: `${BIRTHDAY_LABEL}ü daxil edin`
  }
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
  phone: yup.string().required(formFields.phone.errorMessage),
  birthDate: yup.string().required(formFields.birthDate.errorMessage)
});

export const RegisterUserVerificationContextProvider = (
  { children }: FormContextProviderProps
) => {
  const useRegisterUser = UserService().useRegisterUser();
  const { userType, saveFin } = useRegistration() as RegistrationContextType;
  const toast = useToast();
  // const navigation = useNavigation();

  const initialFormData = {
    fin: '',
    phone: '',
    birthDate: ''
  };

  const {
    formData, onChange, validate, errors, handleSubmit, reset
  } = useForm<schemaType>(initialFormData, schema);

  const dispatch = useDispatch();

  const onSubmit = (navigation: any) => handleSubmit((data: schemaType) => {
    useRegisterUser.mutate({
      ...data,
      authorityName: userType,
      userType: CLIENT_TYPE
    }, {
      onError(e: AxiosError) {
        let message = 'Request failed to send.';
        if (e.response?.data?.message === 'Invalid birth day') {
          message = 'Minimum yaş həddi 18-dir';
        }

        if (e.response?.status === 409) {
          if (e.response.data.message === 'BirtDates arent\'t equal') {
            message = 'Doğum tarixi düzgün daxil edilməyib';
          } else {
            message = Lang.getLang('User already exists');
          }
        }

        toast.show({
          duration: 3000,
          placement: 'bottom',
          title: message,
          status: 'error',
          width: normalize(324)
        });
      },
      onSuccess(res) {
        if (res.data.data.firstName) {
          const transformedResponse = {
            ...res.data.data,
            firstName: res.data.data.firstName[0]
              + res.data.data.firstName.slice(1).toLocaleLowerCase(),
            lastName: res.data.data.lastName[0]
              + res.data.data.lastName.slice(1).toLocaleLowerCase(),
            fatherName: res.data.data.fatherName[0]
              + res.data.data.fatherName.slice(1).toLocaleLowerCase()
          };
          dispatch(setUserInfo(transformedResponse));
          // dispatch(setFlowType('dma'));
          dispatch(setGeneralInfoFormIsDisabled(true));
        } else {
          dispatch(setUserInfo(null));
          dispatch(setGeneralInfoFormIsDisabled(false));
        }
        navigation.navigate(AppScreens.RegisterVerificationOTP);
        saveFin(data.fin);
      }
    });
  });

  const pass = {
    formData, onChange, validate, errors, onSubmit, reset
  };

  return (
    <FormContext.Provider value={pass}>
      {children}
    </FormContext.Provider>
  );
};

interface useRegisterUserVerificationContextProps {
  formData: {
    fin: string
    phone: string
    birthdate: string
  }
}

export const useRegisterUserVerificationContext = ():
  useRegisterUserVerificationContextProps => React.useContext(FormContext);
