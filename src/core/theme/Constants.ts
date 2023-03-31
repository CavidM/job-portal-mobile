// import { ColorValue } from 'react-native';
import { Dimensions, Platform } from 'react-native';

export type AppMainColorTypes = typeof ApplicantColor | typeof CustomerColor;

export const ApplicantColor = '#EA9444';
export const CustomerColor = '#2054BE';

export const COLORS = {
  primary: CustomerColor,
  secondary: ApplicantColor,
  guestColor: '#949494',
  white: 'white',
  dark: '#000',
  gray: '#E3E3E3',
  textWhite: 'white',
  textDark: '#000',
  grey: '#D0D0D0',
  darkGray: '#8D97B5',
  disabled: '#838383',
  stepColor: 'rgba(255, 255, 255, 0.3)',
  inputBorderColor: '#E5EAF6',
  otpDisabledInputColor: '#E6E6E6',
  otpDisabledTextColor: '#ACACAC',
  success: '#4DB270',
  danger: '#F44336',
  colorless: '#8D97B5',
  cardBorderColor: '#E5E5E5',
  lightgray: '#e5e5e580',
  cardBackgroundColor: '#FBFBFB',
  cardListLabelColor: '#909090',
  bgGray: '#F1EFEF',
  checkboxBgColor: '#F6F6F6',
  muted: '#B5B5BD',
  solitude: '#E4ECF7',
  neutral: '#EFF1F3',
  infoColor: '#838383',
  bgSuccess: 'rgba(2, 182, 74, 0.5)',
  bgWarning: 'rgba(234, 148, 68, 0.5)',
  bgDanger: 'rgba(221, 0, 0, 0.5)',
  green: '#02B64A',
  lightBlack: '#425466',
  silver: '#C9CED6',
  lightDark: '#27272E'
};

export const statusColors = {
  ACTIVE: COLORS.green,
  DELETED: COLORS.danger,
  EXPIRED: ApplicantColor,
  DECLINED: COLORS.danger,
  PENDING: ApplicantColor,
  ACCEPTED: COLORS.success,
  DONE: COLORS.success,
  IN_PROGRESS: ApplicantColor,
  CANCELLED: COLORS.danger
};

export type ButtonVariantTypes = 'primary' | 'outline' | 'default' | 'secondary';

export const ButtonVariants = {
  primary: 'primary',
  outline: 'outline',
  default: 'default',
  secondary: 'secondary'
};

export type SizeType = 'sm' | 'md' | 'lg'

export const SIZE = {
  sm: 'sm',
  md: 'md',
  lg: 'lg'
};

export default {
  light: {
    palette: {
      color: COLORS,
      ApplicantColor,
      CustomerColor
    }
  }
};
export const Dimension = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};
export const isPlatformIOS = Platform.OS === 'ios';

export type CheckboxVariantTypes = 'multiple' | 'single';

export const CheckboxVariants = {
  single: 'single',
  multiple: 'multiple'
};

export type InputVariantTypes = 'underline' | 'outline';

export const InputVariants = {
  underline: 'underline',
  outline: 'outline'
};
