import { useMutation } from 'react-query';
import { HTTP } from '../../core/http/HttpClient';
import { RefreshTokenResponse } from './AuthService.types';

export function AuthService() {
  // todo. data type definition missed
  const loginUser = (data: any) => HTTP.client().post('/auth', data);
  const loginViaAsan = (data: any) => HTTP.client().post('/auth/asan', data);
  const refreshUserToken = (data: string) => HTTP.client().post<{ data: RefreshTokenResponse }>('/auth/refresh-token', {
    refreshToken: data
  });
  const validateUserToken = (token: string) => HTTP.client().post('/auth/validate-token', null, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const useLoginUser = () => useMutation(loginUser);
  const useRefreshUsertoken = () => useMutation(refreshUserToken);
  const useValidateUsertoken = () => useMutation(validateUserToken);
  const useLoginViaAsan = () => useMutation(loginViaAsan);

  return {
    useLoginViaAsan,
    useLoginUser,
    useRefreshUsertoken,
    useValidateUsertoken
  };
}
