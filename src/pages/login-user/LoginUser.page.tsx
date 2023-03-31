import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Input from '../../components/Input/Input';
import { useLayoutStyles } from '../common/styles/LayoutStyles';
import { formFields } from './LoginUser.context';
import { ThemeContextType, useTheme } from '../../core/theme/Theme';
import Datepicker from '../../components/Datepicker/Datepicker';
import { isPlatformIOS } from '../../core/theme/Constants';

interface LoginUserPageProps {
  errors: any,
  formData: any,
  onChange: any
}

const LoginUserPage = (props: LoginUserPageProps) => {
  const { errors, formData, onChange } = props;
  const styles = useLayoutStyles();

  const { theme } = useTheme() as ThemeContextType;

  return (
    <View style={{ ...styles.container, width: '90%' }}>
      <View>
        <Text style={pageStyles.label}>
          {formFields.fin.label}
        </Text>
        <Input
          variant="outline"
          error={!!errors?.fin}
          errorMessage={errors?.fin}
          placeholder=""
          value={formData.fin}
          onChangeText={(value) => {
            if (value.length <= 7 && value.toUpperCase().indexOf('O') === -1 && value.toUpperCase().indexOf('I') === -1) {
              onChange('fin', value.toUpperCase());
            }
          }}
          autoCapitalize="none"
          secureTextEntry={!isPlatformIOS}
          keyboardType="visible-password"
          style={{
            ...pageStyles.input,
            marginBottom: 24,
            borderColor: errors?.fin
              ? theme.palette.color.danger
              : theme.palette.color.inputBorderColor
          }}
        />
        <Text style={pageStyles.label}>
          {formFields.birthDate.label}
        </Text>
        <Datepicker
          inputProps={{ variant: 'outline' }}
          error={!!errors?.birthDate}
          errorMessage={errors?.birthDate}
          placeholder=""
          onChange={(value) => {
            onChange('birthDate', value);
          }}
          style={{
            ...pageStyles.input,
            borderColor: errors?.birthDate
              ? theme.palette.color.danger
              : theme.palette.color.inputBorderColor
          }}
        // style={{ ...styles.formInput, margin: 0 }}
        />
      </View>
    </View>
  );
};

const pageStyles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: '#939396',
    marginBottom: 14
  },
  input: {
    height: 36,
    fontSize: 13
  }
});

export default LoginUserPage;
