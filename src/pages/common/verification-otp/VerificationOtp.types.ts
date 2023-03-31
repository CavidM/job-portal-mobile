import { OtpCheckActionTypes } from '../../../services/Otp.service';
import { TemporaryToken, VerifiedToken } from '../../../context/Registration.context';

export interface OtpPageRenderProps extends OtpTime, OtpSubmit{
  onChangeOtp: (otp: string) => void
  onResendOtp: () => void
  isOtpEmpty: boolean
}

export interface OtpTime {
  isOtpHasTime: boolean
  otpExpiryTime: number
  onOtpTimeEnd: () => void
}

export interface OtpSubmit {
  onSubmitOtp: () => void,
  isLoading?: boolean
  isSuccess?: boolean
  isError?: boolean,
}

export interface OtpVerificationHookProps extends Omit<OtpPageRenderProps, 'otpExpiryTime'> {
}

export interface OtpContainerRenderProps {
  callback: (data: VerifiedToken | TemporaryToken) => void
  otpExpiryTime: number,
  action: OtpCheckActionTypes
}
