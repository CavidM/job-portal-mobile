import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from 'react-query';
import { VerificationOtpContainer } from '../../common/verification-otp/VerificationOtp.container';
import { OtpCheckActionEditPhoneNumber } from '../../../services/Otp.service';
import { RegistrationContextType, useRegistration } from '../../../context/Registration.context';

const EditPhoneNumberVerificationOtpPafe = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const { userType } = useRegistration() as RegistrationContextType;

  const onSuccess = () => {
    switch (userType) {
      case 'C':
        navigation.navigate('CustomerProfile');
        break;
      case 'B':
        navigation.navigate('ApplicantProfile');
        break;
      default:
        break;
    }
    queryClient.invalidateQueries('getUser');
  };

  return (
    <VerificationOtpContainer
      callback={onSuccess}
      otpExpiryTime={180}
      action={OtpCheckActionEditPhoneNumber}
    />
  );
};

export default EditPhoneNumberVerificationOtpPafe;
