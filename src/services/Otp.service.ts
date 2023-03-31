import { useMutation } from 'react-query';
import { HTTP } from '../core/http/HttpClient';

export type OtpCheckActionTypes =
  typeof OtpCheckActionLogin | typeof OtpCheckActionRegister | typeof OtpCheckActionEditPhoneNumber
export const OtpCheckActionLogin = 'LOGIN';
export const OtpCheckActionRegister = 'REGISTER';
export const OtpCheckActionEditPhoneNumber = 'EDIT-PHONE-NUMBER';

export function OtpService() {
  const checkRegisterOtp = (data: any) => HTTP.client().post('/otp/check-register', data);
  const checkLoginOtp = (data: any) => HTTP.client().post('/otp/check-login', data);
  const checkEditPhoneNumberOtp = (data: any) => HTTP.client().post('/otp/check-edit-phone-number', data);

  const otpResend = (finn: string) => HTTP.client().post(`/otp/resend/${finn}`);

  const useOtpCheck = (action: OtpCheckActionTypes) => {
    switch (action) {
      case OtpCheckActionLogin:
        return useMutation(checkLoginOtp);
      case OtpCheckActionRegister:
        return useMutation(checkRegisterOtp);
      case OtpCheckActionEditPhoneNumber:
        return useMutation(checkEditPhoneNumberOtp);
      default:
        throw new Error(`Otp check action type should be one of ${OtpCheckActionLogin} or ${OtpCheckActionRegister}`);
    }
  };

  const useOtpResend = () => useMutation(otpResend);

  return { useOtpCheck, useOtpResend };
}
