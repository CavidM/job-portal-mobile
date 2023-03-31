import {
  Platform,
  ScrollView, StyleSheet, Text, View
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { HStack } from 'native-base';
import { useNavigation } from '@react-navigation/core';
import Input from '../../../components/Input/Input';
import { useLayoutStyles } from '../../common/styles/LayoutStyles';
import { formFields, useRegisterUserVerificationContext } from './RegisterUserVerification.context';
import Datepicker from '../../../components/Datepicker/Datepicker';
import MaskedInput from '../../../components/MaskedInput/MaskedInput';
import { SelectNativeBase } from '../../../components/PickerSelect/SelectNativeBase';
import { addPrefix, pipe, removeSpaces } from '../../../tools/DataTransformers';
import useFontStyles from '../../../components/common/font.style';
import { ThemeContextType, useTheme } from '../../../core/theme/Theme';
import normalize from '../../common/styles/normalize';
import { countryCodes } from '../../../core/CountryCodes';
import Button from '../../../components/button/Button';
import { isPlatformIOS } from '../../../core/theme/Constants';

const RegisterUserVerificationPage = () => {
  const styles = useLayoutStyles();
  const fontStyle = useFontStyles();
  const {
    errors, onChange, formData, reset
  }: any = useRegisterUserVerificationContext();
  const { theme } = useTheme() as ThemeContextType;

  const navigation = useNavigation();

  const [countyCode, setCountyCode] = useState('+994');

  useEffect(() => {
    reset();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.pageBodyWrapper}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={{ marginBottom: 30 }}
    >
      <Text style={[styles.pageTitle, fontStyle.fontFamilyInterRegular]}>Profil təsdiqi</Text>
      <View style={styles.container}>
        <Text style={pageStyles.label}>
          {formFields.fin.label}
        </Text>
        <Input
          error={!!errors?.fin}
          errorMessage={errors?.fin}
          placeholder=""
          value={formData.fin}
          onChangeText={(value) => {
            if (value.length <= 7 && value.toUpperCase().indexOf('O') === -1 && value.toUpperCase().indexOf('I') === -1) {
              onChange('fin', value.toUpperCase());
            }
          }}
          style={{
            ...pageStyles.input,
            borderColor: errors?.fin
              ? theme.palette.color.danger
              : theme.palette.color.inputBorderColor
          }}
          variant="outline"
          autoCapitalize="none"
          secureTextEntry={!isPlatformIOS}
          keyboardType="visible-password"
        />
        <Text style={pageStyles.label}>
          {formFields.phone.label}
        </Text>
        <HStack justifyContent="space-between">
          <SelectNativeBase
            onValueChange={(value) => setCountyCode(value)}
            selectedValue={countyCode}
            style={{
              width: 90, height: 32, fontSize: 13, zIndex: 40000, color: 'transparent'
            }}
            items={countryCodes}
          />
          <Text style={{
            position: 'absolute', left: 10, top: 10, zIndex: 1
          }}
          >
            +
            {countyCode.replace(/\D/g, '')}
          </Text>
          <MaskedInput
            error={!!errors?.phone}
            errorMessage={errors?.phone}
            placeholder=""
            type="custom"
            options={{
              mask: '99 999 99 99'
            }}
            onChangeValue={(text) => {
              onChange('phone', text.length > 0 ? pipe(removeSpaces, addPrefix(countyCode))(text) : '');
            }}
            style={{
              ...pageStyles.input,
              borderColor: errors?.phone
                ? theme.palette.color.danger
                : theme.palette.color.inputBorderColor,
              width: normalize(223)
            }}
            variant="outline"
          />
        </HStack>
        <Text style={pageStyles.label}>
          {formFields.birthDate.label}
        </Text>
        <Datepicker
          error={!!errors?.birthDate}
          errorMessage={errors?.birthDate}
          placeholder=""
          onChange={(value) => {
            onChange('birthDate', value);
          }}
          style={{
            ...pageStyles.input,
            marginBottom: 0,
            borderColor: errors?.birthDate
              ? theme.palette.color.danger
              : theme.palette.color.inputBorderColor
          }}
          inputProps={{ variant: 'outline' }}
        />
      </View>

      {
        Platform.OS === 'ios' && (
          <View style={{ marginTop: normalize(30) }}>
            <Button
              onPress={() => navigation.navigate('AsanLogin')}
              title="Asan imza ilə davam et"
              variant="primary"
              size="md"
              width={250}
              color="#2678D8"
              style={{ height: normalize(50) }}
            />
          </View>
        )
      }
    </ScrollView>
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
    fontSize: 13,
    marginBottom: 24
  }
});

export default RegisterUserVerificationPage;
