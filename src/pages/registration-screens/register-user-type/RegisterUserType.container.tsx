import React from 'react';
import { ThemeContextType, useTheme } from '../../../core/theme/Theme';
import { CustomerColor, ApplicantColor } from '../../../core/theme/Constants';
import RegisterUserTypePage from './RegisterUserType.page';
import {
  RegistrationContextType,
  useRegistration, UserTypeCustomer,
  UserTypeApplicant
} from '../../../context/Registration.context';

export const RegisterUserTypeContainer = () => {
  const { setPrimaryColor } = useTheme() as ThemeContextType;
  const { userType, handleChangeUserType } = useRegistration() as RegistrationContextType;

  const onPressApplicantButton = () => {
    handleChangeUserType(UserTypeApplicant);
    setPrimaryColor(ApplicantColor);
  };
  const onPressCustomerButton = () => {
    handleChangeUserType(UserTypeCustomer);
    setPrimaryColor(CustomerColor);
  };

  return (
    <RegisterUserTypePage
      userType={userType}
      onPressApplicantButton={onPressApplicantButton}
      onPressCustomerButton={onPressCustomerButton}
    />
  );
};

export default RegisterUserTypePage;
