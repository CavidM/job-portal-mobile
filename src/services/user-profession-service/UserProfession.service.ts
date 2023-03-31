import { useMutation, useQuery } from 'react-query';
import { HTTP } from '../../core/http/HttpClient';
import { UserProfessionServiceResponseProps } from './UserProfessionService.types';

export const UserProfessionService = () => {
  const editProfession = (payload: any) => HTTP.client().post('/user-professions', payload);
  const useEditProfession = () => useMutation(editProfession);

  const deactivateProfession = (id: string) => HTTP.client().put(`/user-professions/${id}`);
  const useDeactivateProfession = (id: string) => useMutation([deactivateProfession, id], () => deactivateProfession(id));

  const getProfession = (userProfessionId: number) => HTTP.client().get<{ data: UserProfessionServiceResponseProps }>(`/user-professions/${userProfessionId}`);
  const useGetProfession = (id: number) => useQuery(['getProfession', id], () => getProfession(id));

  return {
    useEditProfession,
    useGetProfession,
    useDeactivateProfession
  };
};
