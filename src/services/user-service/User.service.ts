import { useMutation, useQuery } from 'react-query';
import { HTTP } from '../../core/http/HttpClient';
import { GeneralInformationFormSchema } from '../../pages/registration-screens/register-user-with-generalinfo/GeneralInformation.context';
import { RegistrationContextType, useRegistration } from '../../context/Registration.context';
import { SpecialInformationFormSchemaType } from '../../pages/registration-screens/register-user-with-specialinfo/SpecialInformation.context';
import { SwitchUser, UserServiceResponseProps } from './UserService.types';
import { ServiceResponseProps } from '../service.types';

/**
 * - [PUT] /user fillPersonalData API can be accept only general information
 * or can accept general and special information together
 * - Because of Fin does not enter into non of this forms
 * it included from previous form (RegistrationVerification)
 */

interface InputGeneralInfoType extends Partial<GeneralInformationFormSchema> {
}

interface InputSpecialInfoType extends Partial<Pick<SpecialInformationFormSchemaType, 'salary'>> {
}
export interface InputGeneralAndSpecialInfoType extends InputGeneralInfoType, InputSpecialInfoType {
  minSalary?: number,
  maxSalary?: number
}
interface FillPersonalDataType extends InputGeneralAndSpecialInfoType {
  fin?: string,
}
export function UserService() {
  const { fin } = useRegistration() as RegistrationContextType;

  const registerUser = (data: any) => HTTP.client().post('/users', data, {
    headers: {
      Authorization: null
    }
  });

  const editPhoneNumber = (data: any) => HTTP.client().put('/users/edit-phone-number', data);

  const registerViaAsan = (data: any) => HTTP.client().post('/users/asan/register', data, {
    headers: {
      Authorization: ''
    }
  });

  const editCity = (cityId: any) => HTTP.client()
    .put(`/users/city/${cityId}`);

  // @todo. needs to be update under new style Response<ResponseType>
  const getUser = () => HTTP.client()
    .get<{ data: UserServiceResponseProps }>('/users');

  const fillPersonalData = (data: InputGeneralInfoType | InputGeneralAndSpecialInfoType) => {
    const payload: FillPersonalDataType = data;
    payload.fin = fin;
    return HTTP.client()
      .put('/users', payload);
  };

  const switchUser = () => HTTP.client()
    .put<ServiceResponseProps<SwitchUser>>('/users/switch');
  const useSwitchUser = useMutation(switchUser);

  const useEditCity = () => useMutation(editCity);
  // const useEditCity = (cityId) => useMutation(['/users/city', cityId], () => editCity(cityId));
  const useRegisterUser = () => useMutation(registerUser);
  const useRegisterViaAsan = () => useMutation(registerViaAsan);
  const useFillPersonalData = () => useMutation(fillPersonalData);
  const useGetUser = () => useQuery('getUser', getUser);
  const useEditPhoneNumber = () => useMutation(editPhoneNumber);

  return {
    useRegisterUser,
    useFillPersonalData,
    useGetUser,
    useEditPhoneNumber,
    useEditCity,
    useRegisterViaAsan,
    useSwitchUser
  };
}
