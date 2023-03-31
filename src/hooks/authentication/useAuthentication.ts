// set authentication status to 'loading'. isLoading: true
// Restore token
// Validate token
// If token is invalid invalidate token with refresh token
// Set new token to secure storage
// Set new token to Registration context
// Set isloading: false
// Return token and status

import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EventSource from 'react-native-sse';
import {
  restoreToken, signOut, signIn, saveToken, invalidate
} from '../../store/slices/authenticationSlice';
import { AuthService } from '../../services/auth-service/Auth.service';
import { SecureStorage } from '../../tools/SecureStore';
import { REFRESH_TOKEN_KEY, TOKEN_KEY } from '../../core/Constants';
import { TokenType } from '../../services/auth-service/AuthService.types';
import { resetNavigationState } from '../NavigationState';
import { RegistrationContextType, useRegistration } from '../../context/Registration.context';
import { getUserType } from '../../core/jwt';
import { useRegisterUserVerificationContext } from '../../pages/registration-screens/register-user-verification/RegisterUserVerification.context';
import { getEnvironment } from '../../core/config';
import { getToken } from '../../core/Token';

export const useAuthentication = () => {
  const authService = AuthService();
  const validateUserToken = authService.useValidateUsertoken();
  const refreshUserToken = authService.useRefreshUsertoken();
  const { handleChangeUserType } = useRegistration() as RegistrationContextType;

  const { reset: resetRegistrationFin }: any = useRegisterUserVerificationContext();

  const dispatch = useDispatch();

  async function restoreTokenWithRefreshToken() {
    let verifiedToken;
    try {
      const refreshToken = await SecureStorage.getAsync(REFRESH_TOKEN_KEY);

      if (refreshToken) {
        verifiedToken = await refreshUserToken.mutateAsync(refreshToken);

        const { token: newToken } = verifiedToken.data.data;

        await SecureStorage.saveAsync(TOKEN_KEY, newToken);

        dispatch(signIn(verifiedToken.data.data.token));
      }
    } catch (e) {
      dispatch(invalidate());
      throw new Error(e);
    }

    return verifiedToken;
  }

  async function bootstrapRestoreToken() {
    let verifiedToken;
    try {
      const token = await SecureStorage.getAsync(TOKEN_KEY);
      if (token) {
        // Uncomment it on development when want to delete token from secure store
        // SecureStorage.deleteAsync(TOKEN_KEY);

        await validateUserToken.mutateAsync(token);
        dispatch(restoreToken(token));
      } else {
        dispatch(invalidate());
      }
    } catch (e) {
      await restoreTokenWithRefreshToken();
    }

    return verifiedToken;
  }

  async function saveNewVerifiedToken(data: TokenType) {
    await SecureStorage.saveAsync(TOKEN_KEY, data.token);
    await SecureStorage.saveAsync(REFRESH_TOKEN_KEY, data.refreshToken);

    handleChangeUserType(getUserType(data.token));
    dispatch(saveToken(data.token));

    return new Promise((resolve) => {
      setTimeout(() => { resolve(); }, 0);
    });
  }

  async function logOut(): Promise<void> {
    const token = getToken();
    const environment = getEnvironment();
    const eventSource = new EventSource(`${environment.notificationUrl}/subscribe?token=${token}`);
    dispatch(signOut());
    const res = SecureStorage.deleteAsync(TOKEN_KEY);
    await AsyncStorage.clear();
    await resetNavigationState();
    resetRegistrationFin();
    return res;
  }

  return {
    restoreTokenWithRefreshToken,
    bootstrapRestoreToken,
    saveNewVerifiedToken,
    logOut
  };
};
