import { useMutation } from 'react-query';
import { HTTP } from '../core/http/HttpClient';

export const SupportService = () => {
  const useContactWithDMA = () => useMutation(contactWithDMA);
  const contactWithDMA = (payload: string) => HTTP.client().post('/contact', { message: payload });
  return {
    useContactWithDMA
  };
};
