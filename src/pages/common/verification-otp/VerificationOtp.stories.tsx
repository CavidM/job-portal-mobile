import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Alert } from 'react-native';
import VerificationOtpPage from './VerificationOtp.page';
import CenterView from '../../../components/CenterView/CenterView';
import { OtpPageRenderProps } from './VerificationOtp.types';

const defaultArgs: OtpPageRenderProps = {
  onSubmitOtp: () => Alert.alert('onsubmit clicked'),
  onChangeOtp: (otp: any) => console.log('otp: ', otp),
  otpExpiryTime: 10,
  onOtpTimeEnd: () => Alert.alert('Otp time was end'),
  onResendOtp: () => Alert.alert('Request new otp'),
  isOtpEmpty: true,
  isOtpHasTime: true
};

export const OtpVerificationDefault = () => <VerificationOtpPage {...defaultArgs} />;
export const OTPVerificationResend = () => (
  <VerificationOtpPage
    {...defaultArgs}
    isOtpHasTime={false}
  />
);
export const OTPVerificationFillInput = () => (
  <VerificationOtpPage
    {...defaultArgs}
    isOtpEmpty={false}
  />
);
export const OTPVerificationLoading = () => <VerificationOtpPage {...defaultArgs} isLoading />;
export const OTPVerificationSuccess = () => <VerificationOtpPage {...defaultArgs} isSuccess />;
export const OTPVerificationWrongCode = () => <VerificationOtpPage {...defaultArgs} isError />;

storiesOf('Pages/Verification Otp', module)
  .addDecorator((getStory) => <CenterView style={{ marginTop: 60 }}>{getStory()}</CenterView>)
  .add('OTP Verfication default', () => (
    <OtpVerificationDefault />
  ))
  .add('OTP Verification resend', () => (
    <OTPVerificationResend />
  ))
  .add('OTP Verification fill input', () => (
    <OTPVerificationFillInput />
  ))
  .add('OTP Verification loading', () => (
    <OTPVerificationLoading />
  ))
  .add('OTP Verification success', () => (
    <OTPVerificationSuccess />
  ))
  .add('OTP Verification wrong code', () => (
    <OTPVerificationWrongCode />
  ));
