import React from 'react';
import VerificationOtpPage from './VerificationOtp.page';
import useVerificationOtp from './VerificationOtp.hook';
import { OtpContainerRenderProps } from './VerificationOtp.types';

export const VerificationOtpContainer = (
  { callback, otpExpiryTime, action }: OtpContainerRenderProps
) => {
  const {
    onSubmitOtp,
    onChangeOtp,
    onOtpTimeEnd,
    onResendOtp,
    isLoading,
    isSuccess,
    isError,
    isOtpEmpty,
    isOtpHasTime
  } = useVerificationOtp(callback, action);

  return (
    <VerificationOtpPage
      onSubmitOtp={onSubmitOtp}
      onChangeOtp={onChangeOtp}
      otpExpiryTime={otpExpiryTime}
      onOtpTimeEnd={onOtpTimeEnd}
      onResendOtp={onResendOtp}
      isLoading={isLoading}
      isSuccess={isSuccess}
      isError={isError}
      isOtpEmpty={isOtpEmpty}
      isOtpHasTime={isOtpHasTime}
    />
  );
};
