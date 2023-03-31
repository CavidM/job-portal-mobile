import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { VerificationOtpContainer } from '../../common/verification-otp/VerificationOtp.container';
import { OtpCheckActionRegister } from '../../../services/Otp.service';
import {
  RegistrationContextType, TemporaryToken,
  useRegistration,
  VerifiedToken
} from '../../../context/Registration.context';

export default function RegisterVerificationOtpPage() {
  const navigation = useNavigation();
  const { saveTemporaryToken } = useRegistration() as RegistrationContextType;

  const onSuccess = (data: VerifiedToken | TemporaryToken) => {
    saveTemporaryToken(data.token);
    navigation.navigate('RegisterAfterVerification');
  };

  return (
    <VerificationOtpContainer
      callback={onSuccess}
      otpExpiryTime={180}
      action={OtpCheckActionRegister}
    />
  );
}
