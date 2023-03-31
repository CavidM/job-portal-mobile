import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { HTTP } from '../../core/http/HttpClient';

export const AsanLoginService = () => {
  const checkToken = () => axios.get('https://asanlogin.my.gov.az/ssoauthz/api/v1/token',
    {
      headers: {
        Authorization: ''
      }
    });
  // const useEditProfession = () => useMutation(editProfession);

  // const deactivateProfession = (id: string) => HTTP.client().put(`/user-professions/${id}`);
  // const useDeactivateProfession = (id: string) => useMutation([deactivateProfession, id], () => deactivateProfession(id));

  // const getProfession = (userProfessionId: number) => HTTP.client().get<{ data: UserProfessionServiceResponseProps }>(`/user-professions/${userProfessionId}`);
  const useCheckToken = () => useQuery('checkToken', checkToken);
  return {
    checkToken
    // useEditProfession,
    // useGetProfession,
    // useDeactivateProfession
  };
};
