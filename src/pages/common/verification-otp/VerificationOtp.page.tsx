import React from 'react';
import {
  ScrollView,
  Text, TouchableOpacity, View
} from 'react-native';
import OtpInput from '../../../components/otp-inputs/OtpInput';
import CountdownTimer from '../../../components/CountdownTimer/CountdownTimer';
import { useOtpPageStyle } from './OtpPage.style';
import Button from '../../../components/button/Button';
import { ThemeContextType, useTheme } from '../../../core/theme/Theme';
import useStyles from '../../../components/CountdownTimer/CountdownTimer.style';
import Loader from '../../../components/Loader/Loader';
import { OtpPageRenderProps } from './VerificationOtp.types';
import useFontStyles from '../../../components/common/font.style';
import normalize from '../styles/normalize';

export default function VerificationOtpPage(props: OtpPageRenderProps) {
  const styles = useStyles();
  const pageStyle = useOtpPageStyle();
  const fontStyle = useFontStyles();

  const { theme } = useTheme() as ThemeContextType;

  const {
    grey, primary, danger, success
  } = theme.palette.color;

  const {
    onSubmitOtp, onChangeOtp,
    isOtpHasTime, isOtpEmpty,
    isError, isLoading, isSuccess,
    onOtpTimeEnd, otpExpiryTime, onResendOtp
  } = props;

  const isOtpHasTimeAndNotEmpty = () => isOtpHasTime && !isOtpEmpty;

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={pageStyle.OtpPageWrapper}>
        <Text style={[pageStyle.pageTitle, fontStyle.fontFamilyInterRegular]}>
          Mobil nömrənizə göndərilən təsdiqləmə
          kodunu daxil edin
        </Text>
        <OtpInput getOtp={(otp) => onChangeOtp(otp)} disabled={!isOtpHasTime} />
        {isLoading && (
          <View style={pageStyle.OtpItemSpacing}>
            <Loader />
          </View>
        )}
        {isSuccess && (
          <View style={pageStyle.OtpItemSpacing}>
            <Text style={[{ color: success }, fontStyle.fontFamilyInterRegular]}>Uğurlu</Text>
          </View>
        )}
        {isError && (
          <View style={pageStyle.OtpItemSpacing}>
            <Text
              style={[{ color: danger, fontSize: normalize(17) }, fontStyle.fontFamilyInterRegular]}
            >
              Şifrə səhvdir
            </Text>
          </View>
        )}
        {isOtpHasTime && (
          <CountdownTimer
            duration={otpExpiryTime}
            onFinish={onOtpTimeEnd}
          />
        )}
        {!isOtpHasTime
          && (
            <Text
              style={styles.CountdownTimerText}
            >
              00:00
            </Text>
          )}
        <TouchableOpacity
          disabled={isOtpHasTime}
          onPress={onResendOtp}
          accessible
          accessibilityLabel="resend-otp-button"
          accessibilityState={{ disabled: isOtpHasTime }}
        >
          <Text style={{
            color: isOtpHasTime ? 'gray' : '#2054BE', marginTop: 5, fontSize: normalize(17), fontFamily: 'InterMedium'
          }}
          >
            Yenidən göndərin
          </Text>
        </TouchableOpacity>
      </View>
      <View style={pageStyle.OtpButton}>
        <Button
          accessible
          accessibilityLabel="otp-submit-button"
          accessibilityRole="button"
          accessibilityState={{ disabled: !isOtpHasTimeAndNotEmpty() }}
          variant="primary"
          title="Təsdiq et"
          onPress={onSubmitOtp}
          size="sm"
          disabled={!isOtpHasTimeAndNotEmpty()}
          color={!isOtpHasTimeAndNotEmpty() ? grey : primary}
        />
      </View>
    </ScrollView>
  );
}
