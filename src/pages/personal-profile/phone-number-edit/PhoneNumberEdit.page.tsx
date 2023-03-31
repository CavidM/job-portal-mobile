import { HStack, Text } from 'native-base';
import {
  View, ScrollView, StyleSheet
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Button from '../../../components/button/Button';
import Input from '../../../components/Input/Input';
import { ThemeContextType, useTheme } from '../../../core/theme/Theme';
import MaskedInput from '../../../components/MaskedInput/MaskedInput';
import { addPrefix, pipe, removeSpaces } from '../../../tools/DataTransformers';
import normalize from '../../common/styles/normalize';
import { Labels } from '../../../core/Langs';
import { countryCodes } from '../../../core/CountryCodes';
import { SelectNativeBase } from '../../../components/PickerSelect/SelectNativeBase';
import ValidationComponent from '../../../components/Validation/ValidationComponent';

interface IProps {
  formData: any,
  onChange: any,
  onSubmitChange: any,
  currentPhoneNumber: any,
  errors: any,
}

const PhoneNumberEdit = ({
  formData, onChange, onSubmitChange, currentPhoneNumber, errors
}: IProps) => {
  const { theme } = useTheme() as ThemeContextType;

  const [countyCode, setCountyCode] = useState('+994');

  const navigation = useNavigation();
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ padding: 20 }}>
        <Text style={styles.label}>
          {Labels.phoneNumber}
        </Text>
        <Input placeholder={Labels.phoneNumber} style={{ color: 'rgba(39, 39, 46, 0.5)', marginBottom: 20, fontSize: 13 }} editable={false} value={currentPhoneNumber} variant="outline" />
        <Text color={theme.palette.color.primary} style={styles.label}>
          {Labels.newPhoneNumber}
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
          <View>
            <MaskedInput
              style={{ fontSize: 13, width: normalize(223), marginBottom: 10 }}
              borderColor={
                errors
                  ? theme.palette.color.danger
                  : theme.palette.color.inputBorderColor
              }
              error={!!errors?.phone || formData.phone === currentPhoneNumber}
              placeholder={Labels.enterPhoneNumber}
              type="custom"
              variant="outline"
              options={{
                mask: '99 999 99 99'
              }}
              onChangeValue={(value) => {
                onChange('phone', value.length > 0 ? pipe(removeSpaces, addPrefix(countyCode))(value) : null);
              }}
            />
            {!!errors?.phone && <ValidationComponent errorMessage={Labels.phoneNumberisNotValid} />}
          </View>
        </HStack>

        <View style={{
          display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 30
        }}
        >
          <Button style={{ marginHorizontal: 0 }} width={normalize(160)} disabled={false} onPress={onSubmitChange} size="sm" variant="primary" title="Təsdiqlə" />
          <Button
            style={{ marginHorizontal: 0, borderWidth: 1, borderColor: theme.palette.color.danger }}
            width={normalize(160)}
            buttonTextStyle={{ color: theme.palette.color.danger }}
            disabled={false}
            onPress={() => navigation.goBack()}
            size="sm"
            variant="outline"
            title={Labels.cancel}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 14
  }
});

export default PhoneNumberEdit;
