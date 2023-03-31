import store from '../store/store';

export const getToken = () => store.getState().authentication.userToken;
