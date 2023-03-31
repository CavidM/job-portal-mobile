import { Text } from 'native-base';
import {
  View, ScrollView, StyleSheet, TouchableOpacity, Platform
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ThemeContextType, useTheme } from '../../../core/theme/Theme';
import { SelectNativeBase } from '../../../components/PickerSelect/SelectNativeBase';
import { selectPickerDataFactory } from '../../../tools/data-transfer-factories/DataTransferFactories';
import Button from '../../../components/button/Button';
import Input from '../../../components/Input/Input';
import AngelRightIcon from '../../../components/Icons/AngelRightIcon';
import normalize from '../../common/styles/normalize';
import { Labels } from '../../../core/Langs';

interface IProps {
  cities: any,
  formData: any,
  onChange: any,
  phoneNumber: any,
  onSave: () => any,
  initialFormData: any
}

const ProfileEdit = ({
  cities, formData, onChange, phoneNumber, onSave, initialFormData
}: IProps) => {
  const { theme } = useTheme() as ThemeContextType;

  const navigation = useNavigation();
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ padding: 20 }}>
        <Text style={styles.label}>
          {Labels.phoneNumber}
        </Text>
        <TouchableOpacity onPress={() => {
          if (Platform.OS === 'android') {
            navigation.navigate('PhoneNumberEdit', phoneNumber);
          }
        }}
        >
          <Input
            style={{ color: 'rgba(39, 39, 46, 0.5)', fontSize: 13 }}
            onTouchStart={() => navigation.navigate('PhoneNumberEdit', phoneNumber)}
            placeholder="previous phone number"
            variant="outline"
            value={phoneNumber}
            editable={false}
            icon={<AngelRightIcon />}
          />
        </TouchableOpacity>
        <Text style={{ ...styles.label, marginTop: 20 }}>
          {Labels.city}
        </Text>
        <SelectNativeBase
          placeholder="Sheher"
          variant="outline"
          selectedValue={formData.city}
          items={selectPickerDataFactory(cities) ?? []}
          onValueChange={(value: string) => { onChange('city', value); }}
          style={{ fontSize: 13, height: 40 }}
        />
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button color={formData.city === initialFormData.city ? theme.palette.color.bgGray : theme.palette.color.green} style={{ marginHorizontal: 0 }} width={normalize(160)} disabled={formData.city === initialFormData.city} onPress={() => onSave()} size="sm" variant={formData.city === initialFormData.city ? 'default' : 'primary'} title={Labels.save} />
          <Button
            style={{
              marginHorizontal: 0, borderWidth: 1, borderColor: theme.palette.color.danger
            }}
            buttonTextStyle={{ color: theme.palette.color.danger }}
            width={normalize(160)}
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

export default ProfileEdit;
