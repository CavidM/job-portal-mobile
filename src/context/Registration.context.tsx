import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserTypeApplicant = 'B';
export const UserTypeCustomer = 'C';
export type UserTypes = typeof UserTypeApplicant | typeof UserTypeCustomer;
export type RegistrationContextType = {
  userType: UserTypes;
  handleChangeUserType: (userType: UserTypes) => Promise<void>,
  temporaryToken: string,
  saveTemporaryToken: (token: string) => void
  fin: string,
  saveFin: (fin: string) => void,
}

export const RegistrationContext = React.createContext<
  RegistrationContextType | undefined
>(undefined);

export const useRegistration = () => React.useContext(RegistrationContext);

interface RegistrationProviderProps {
  children: React.ReactNode,
  defaultUserType?: UserTypes | undefined
}

export interface VerifiedToken {
  token: string
  refreshToken?: string
}

export interface TemporaryToken {
  token: string
}

export const RegistrationProvider = (
  { children, defaultUserType = undefined }: RegistrationProviderProps
) => {
  const [userType, setUserType] = useState<string | undefined>(defaultUserType);
  const [temporaryToken, setTemporaryToken] = useState<string | undefined>(undefined);
  const [fin, setFin] = useState<string | undefined>(undefined);

  useEffect(() => {
    AsyncStorage.getItem('userType', (error, result) => {
      if (error) {
        console.log(error);
      }
      if (result) {
        setUserType(result);
      }
    });

    AsyncStorage.getItem('temporaryToken', (error, result) => {
      if (error) {
        console.log(error);
      }
      if (result) {
        setTemporaryToken(result);
      }
    });

    AsyncStorage.getItem('fin', (error, result) => {
      if (error) {
        console.log(error);
      }
      if (result) { setFin(result); }
    });
  }, []);

  const handleChangeUserType = async (inputUserType: UserTypes) => {
    setUserType(inputUserType);
    AsyncStorage.setItem('userType', inputUserType);
  };

  const saveTemporaryToken = (token: string) => {
    setTemporaryToken(token);
    AsyncStorage.setItem('temporaryToken', token);
  };

  const saveFin = (newFin: string) => {
    setFin(newFin);
    AsyncStorage.setItem('fin', newFin);
  };

  const value = {
    userType,
    handleChangeUserType,
    temporaryToken,
    saveTemporaryToken,
    fin,
    saveFin
  } as RegistrationContextType;

  return (
    <RegistrationContext.Provider value={value}>
      {children}
    </RegistrationContext.Provider>
  );
};
