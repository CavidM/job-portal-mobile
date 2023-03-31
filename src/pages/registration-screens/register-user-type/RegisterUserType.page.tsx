import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { HStack } from 'native-base';
import LookingForJobIcon from '../../../components/Icons/LookingForJobIcon';
import Button from '../../../components/button/Button';
import LookingForEmployeeIcon from '../../../components/Icons/LookingForEmployeeIcon';
import { ThemeContextType, useTheme } from '../../../core/theme/Theme';
import { UserTypeCustomer, UserTypeApplicant, UserTypes } from '../../../context/Registration.context';
import { useLayoutStyles } from '../../common/styles/LayoutStyles';
import useFontStyles from '../../../components/common/font.style';
import normalize from '../../common/styles/normalize';

const defaultOnPressApplicantButton = () => { };
const defaultOnPressCustomerButton = () => { };

interface RegisterUserTypePageProps {
  onPressApplicantButton?: typeof defaultOnPressApplicantButton
  onPressCustomerButton?: typeof defaultOnPressCustomerButton
  userType?: UserTypes | undefined
}

const RegisterUserTypePage = ({
  onPressApplicantButton = defaultOnPressApplicantButton,
  onPressCustomerButton = defaultOnPressCustomerButton,
  userType = undefined
}: RegisterUserTypePageProps) => {
  const { theme } = useTheme() as ThemeContextType;
  const styles = useLayoutStyles();
  const fontStyle = useFontStyles();
  return (
    <View style={styles.pageBodyWrapper}>
      <Text style={[styles.pageTitle, fontStyle.fontFamilyInterRegular]}>Qeydiyyat növü</Text>
      <HStack style={{ paddingHorizontal: 20 }} justifyContent="space-between">
        <View>
          <Button
            variant="outline"
            size="lg"
            onPress={onPressCustomerButton}
            title={<LookingForEmployeeIcon pathProps={{ fill: userType === UserTypeCustomer ? 'white' : theme.palette.CustomerColor }} />}
            shadow
            color={userType === UserTypeCustomer && theme.palette.CustomerColor}
            style={{
              borderColor: theme.palette.CustomerColor,
              width: normalize(152),
              borderRadius: 40
            }}
            selected={userType === UserTypeCustomer}
          />
          <Text style={{ ...pageStyles.label, color: theme.palette.CustomerColor }}>Sifarişçi</Text>
        </View>
        <View>
          <Button
            variant="outline"
            // icon={<LookingForJobIcon pathProps={{ fill: userType === UserTypeApplicant ? 'white' : theme.palette.ApplicantColor }} />}
            size="lg"
            onPress={onPressApplicantButton}
            title={<LookingForJobIcon pathProps={{ fill: userType === UserTypeApplicant ? 'white' : theme.palette.ApplicantColor }} />}
            shadow
            style={{
              borderColor: theme.palette.ApplicantColor,
              width: normalize(152),
              borderRadius: 40
            }}
            color={userType === UserTypeApplicant && theme.palette.ApplicantColor}
            selected={userType === UserTypeApplicant}
          />
          <Text style={{ ...pageStyles.label, color: theme.palette.ApplicantColor }}>İş axtaran</Text>
        </View>
      </HStack>
    </View>
  );
};

const pageStyles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center'
  }
});

export default RegisterUserTypePage;
