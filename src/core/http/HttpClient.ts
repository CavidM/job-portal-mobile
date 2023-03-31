import axios, { AxiosInstance } from 'axios';
import { getToken } from '../Token';

export const HTTP = (() => {
  let $client:AxiosInstance;

  return {
    createClient(url:string): AxiosInstance {
      if ($client) {
        return $client;
      }

      $client = axios.create({
        baseURL: url || 'http://localhost:4000/api/',
        responseType: 'json'
      });

      return $client;
    },
    client() {
      const token = getToken();

      if (token) {
        $client.defaults.headers.common.Authorization = `Bearer ${getToken()}`;
      } else {
        delete $client.defaults.headers.common.Authorization;
      }

      return $client;
    }
  };
})();
