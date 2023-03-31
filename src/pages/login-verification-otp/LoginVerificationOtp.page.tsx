import React from 'react';
import { VerificationOtpContainer } from '../common/verification-otp/VerificationOtp.container';
import { OtpCheckActionLogin } from '../../services/Otp.service';
import {
  VerifiedToken
} from '../../context/Registration.context';
import { useAuthentication } from '../../hooks/authentication/useAuthentication';
import {setRegistered} from "../../store/slices/authenticationSlice";
import {useDispatch} from "react-redux";

export default function LoginVerificationOtpPage() {
  const { saveNewVerifiedToken } = useAuthentication();
  const dispatch = useDispatch()

  const onSuccess = async (data: VerifiedToken) => {
    dispatch(setRegistered())
    await saveNewVerifiedToken(data);
  };

  return (
    <VerificationOtpContainer
      callback={onSuccess}
      otpExpiryTime={180}
      action={OtpCheckActionLogin}
    />
  );
}
