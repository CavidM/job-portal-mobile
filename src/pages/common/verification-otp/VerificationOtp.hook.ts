import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { OtpVerificationHookProps } from './VerificationOtp.types';
import { OtpCheckActionTypes, OtpService } from '../../../services/Otp.service';
import { RegistrationContextType, useRegistration } from '../../../context/Registration.context';

const isOtpValid = (otp: string) => otp.length === 4;

export default function useVerificationOtp(
  callback: (data: any) => void,
  action: OtpCheckActionTypes
): OtpVerificationHookProps {
  const [isOtpEmpty, setIsOtpEmpty] = useState(true);
  const [isOtpHasTime, setIsOtpHasTime] = useState(true);
  const [otp, setOtp] = useState('');

  const useOtpResend = OtpService().useOtpResend();
  const useOtpCheck = OtpService().useOtpCheck(action);

  const { saveTemporaryToken, fin } = useRegistration() as RegistrationContextType;

  useEffect(() => {
    if (isOtpValid(otp)) {
      setIsOtpEmpty(false);
    } else {
      setIsOtpEmpty(true);
    }
  }, [otp]);

  const onChangeOtp = (value: string) => {
    setOtp(value);
  };

  const onOtpTimeEnd = () => {
    setIsOtpHasTime(false);
  };

  // eslint-disable-next-line consistent-return
  const onSubmitOtp = () => {
    if (otp.length === 0) {
      Alert.alert('Please, enter otp');
      return false;
    }

    const reqBody = {
      fin,
      keyword: otp
    };

    useOtpCheck.mutate(reqBody, {
      onSuccess(res) {
        // @todo: moves to on success callback
        saveTemporaryToken(res.data.data?.token);
        setTimeout(() => {
          callback(res.data.data);
        }, 100);
      },
      onError() {
      }
    });
  };

  const onResendOtp = () => {
    useOtpResend.mutate(fin, {
      onSuccess() {
        useOtpCheck.reset();
        setIsOtpHasTime(true);
      },
      onError() {
        setIsOtpHasTime(false);
      }
    });
  };

  return {
    onSubmitOtp,
    onChangeOtp,
    onOtpTimeEnd,
    onResendOtp,
    isLoading: useOtpCheck.isLoading,
    isSuccess: useOtpCheck.isSuccess,
    isError: useOtpCheck.isError,
    isOtpEmpty,
    isOtpHasTime
  };
}
