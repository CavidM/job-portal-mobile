import {
  ScrollView, StyleSheet, Text, View
} from 'react-native';
import React, { useEffect } from 'react';
import { Box } from 'native-base';
import Input from '../../../components/Input/Input';
import { useLayoutStyles } from '../../common/styles/LayoutStyles';
import useFontStyles from '../../../components/common/font.style';
import { GeneralInformationFormSchema } from './GeneralInformation.context';
import { selectPickerDataFactory } from '../../../tools/data-transfer-factories/DataTransferFactories';
import { SelectNativeBase } from '../../../components/PickerSelect/SelectNativeBase';
import { ThemeContextType, useTheme } from '../../../core/theme/Theme';
import { CheckElementOutline, CheckListWrapperOutline } from '../../../components/Checkbox/CheckboxElements';
import Datepicker from '../../../components/Datepicker/Datepicker';
import DropdownIcon from '../../../components/Icons/DropdownIcon';
import { isPlatformIOS } from '../../../core/theme/Constants';
import normalize from '../../common/styles/normalize';
import { RadioList } from '../../../components/Checkbox/RadioList';
import ValidationComponent from '../../../components/Validation/ValidationComponent';

interface GeneralInformationPageProps {
  genderList: any,
  cityList: any,
  onComponentUnmount: () => void,
  errors: Partial<GeneralInformationFormSchema>,
  onChange: (...args: any) => void,
  formData: Partial<GeneralInformationFormSchema>,
  birthDate: boolean,
  isDisabledDmaForm: boolean,
}

const GeneralInformationPage = (
  {
    genderList, cityList, onComponentUnmount, errors, onChange, formData,
    birthDate, isDisabledDmaForm
  }: GeneralInformationPageProps
) => {
  const styles = useLayoutStyles();
  const fontStyle = useFontStyles();
  const { theme } = useTheme() as ThemeContextType;

  useEffect(() => {
    onComponentUnmount();
  }, []);

  // @ts-ignore
  return (
    <ScrollView
      contentContainerStyle={styles.pageBodyWrapper}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={{ marginBottom: 30 }}
    >
      <Text style={[styles.registerAfterVerificationPageTitle, fontStyle.fontFamilyInterRegular]}>
        Ümumi məlumat
      </Text>
      <View style={styles.container}>
        <Text style={pageStyles.label}>
          Adı
        </Text>
        <Input
          error={!!errors?.firstName}
          errorMessage={errors?.firstName}
          placeholder=""
          editable={!birthDate && !isDisabledDmaForm}
          onChangeText={(value) => onChange('firstName', value)}
          value={formData?.firstName}
          style={{
            ...pageStyles.input,
            borderColor: errors?.firstName
              ? theme.palette.color.danger
              : theme.palette.color.inputBorderColor
          }}
          variant="outline"
        />
        <Text style={pageStyles.label}>
          Soyad
        </Text>
        <Input
          error={!!errors?.lastName}
          errorMessage={errors?.lastName}
          placeholder=""
          editable={!birthDate && !isDisabledDmaForm}
          value={formData.lastName}
          onChangeText={(value) => onChange('lastName', value)}
          style={{
            ...pageStyles.input,
            borderColor: errors?.lastName
              ? theme.palette.color.danger
              : theme.palette.color.inputBorderColor
          }}
          variant="outline"
        />
        <Text style={pageStyles.label}>
          Ata adı
        </Text>
        <Input
          error={!!errors?.fatherName}
          errorMessage={errors?.fatherName}
          placeholder=""
          value={formData.fatherName}
          onChangeText={(value) => onChange('fatherName', value)}
          editable={!birthDate && !isDisabledDmaForm}
          style={{
            ...pageStyles.input,
            borderColor: errors?.fatherName
              ? theme.palette.color.danger
              : theme.palette.color.inputBorderColor
          }}
          variant="outline"
        />
        {birthDate && (
          <>
            <Text style={pageStyles.label}>
              Təvəllüd
            </Text>
            <Datepicker
              placeholder="Təvəllüd daxil edin"
              variant="outline"
              onChange={(value) => onChange('birthDate', value)}
              style={pageStyles.input}
              inputProps={{ variant: 'outline' }}

            />
          </>
        )}
        <Text style={pageStyles.label}>
          Cins
        </Text>
        <CheckListWrapperOutline>
          <RadioList
            onChecked={(checkedItem: any) => onChange('genderType', checkedItem)}
            data={genderList}
            defaultValue={formData.genderType}
            style={{ backgroundColor: '#F6F6F6', padding: 2, borderRadius: 8 }}
            render={(data: any, onClickItem: (e: any) => void, selectedItem: any) => (
              <CheckElementOutline
                disabled={isDisabledDmaForm && !birthDate}
                checkboxItemStyle={{ width: '50%' }}
                key={data.value}
                label={data.label}
                onPress={() => onClickItem(data.value)}
                selected={selectedItem === data.value}
                style={{
                  borderColor: 'red'
                }}
                selectedItemLabelColor={{ color: theme.palette.color.primary }}
                selectedItemBgColor={{ backgroundColor: theme.palette.color.white }}
              />
            )}
          />
          {!!errors?.genderType && <ValidationComponent errorMessage="Cins daxil edin" />}
        </CheckListWrapperOutline>

        <Box mt={3}>
          <Text style={pageStyles.label}>
            Faktiki yaşadığı şəhər
          </Text>
          <SelectNativeBase
            errorIconStyle={{ top: normalize(7), right: normalize(25) }}
            borderColor={
              errors?.cityId
                ? theme.palette.color.danger
                : theme.palette.color.inputBorderColor
            }
            onValueChange={(value: any) => onChange('cityId', value)}
            items={selectPickerDataFactory(cityList) ?? []}
            placeholder=""
            error={!!errors?.cityId}
            errorMessage="Şəhəri seçin"
            selectedValue={formData.cityId}
            variant="outline"
            dropdownIcon={<View style={{ paddingRight: 12 }}><DropdownIcon /></View>}
            // isDisabled={!birthDate}
            style={[{ fontSize: 13, paddingBottom: isPlatformIOS ? normalize(10) : normalize(8) },
            fontStyle.fontFamilyInterMedium]}
            height={39}
          />
        </Box>

      </View>
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

export default GeneralInformationPage;
