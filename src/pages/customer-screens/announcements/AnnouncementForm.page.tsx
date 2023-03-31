import React, { useState } from 'react';
import {
  ScrollView,
  View
} from 'react-native';
import {
  FormControl, Stack, Text, TextArea, HStack
} from 'native-base';
import Box from 'native-base/src/components/primitives/Box';
import { SelectNativeBase } from '../../../components/PickerSelect/SelectNativeBase';
import { SliderComponent } from '../../../components/Slider/Slider';
import {
  CheckElementOutline,
  CheckListWrapperOutline
} from '../../../components/Checkbox/CheckboxElements';
import Button from '../../../components/button/Button';
import { ThemeContextType, useTheme } from '../../../core/theme/Theme';
import useStyles from '../../customer-screens/service-order/users-search-form/UsersSearchForm.style';
import normalize from '../../common/styles/normalize';
import { CityModel } from '../../../services/information-service/InformationService.types';
import { selectPickerDataFactory } from '../../../tools/data-transfer-factories/DataTransferFactories';
import { AnnouncementFormProps } from './AnnouncementForm.container';
import DropdownIcon from '../../../components/Icons/DropdownIcon';
import { Labels } from '../../../core/Langs';
import { isPlatformIOS } from '../../../core/theme/Constants';
import { RadioList } from '../../../components/Checkbox/RadioList';
import MaskedInput from '../../../components/MaskedInput/MaskedInput';
import { addPrefix, pipe, removeSpaces } from '../../../tools/DataTransformers';
import Input from '../../../components/Input/Input';
import Datepicker from '../../../components/Datepicker/Datepicker';
import { CalendarIcon } from '../../../components/Icons/CalendarIcon';
import { MapSearch } from '../service-order/map/MapSearch';
import { AnnouncementTypes, GenderTypesKeys } from '../../../core/Constants';
import { MultiSliderPaymentRange } from '../../../components/Slider/MultiSliderPaymentRange';
import useFontStyles from '../../../components/common/font.style';
import ValidationComponent from '../../../components/Validation/ValidationComponent';
import { countryCodes } from '../../../core/CountryCodes';

interface AnnouncementFormPageProps {
  cities: CityModel[]
  formData: AnnouncementFormProps,
  onChangeFormData: (field: string, value: any) => void
  onSubmit: () => void,
  errors: Partial<AnnouncementFormProps>
}

export const AnnouncementFormPage = (props: AnnouncementFormPageProps) => {
  const {
    cities, formData, onChangeFormData, onSubmit, errors
  } = props;

  const genderTypes = [
    {
      key: GenderTypesKeys.BOTH,
      label: Labels.noMatter
    },
    {
      key: GenderTypesKeys.MALE,
      label: 'Kişi'
    },
    {
      key: GenderTypesKeys.FEMALE,
      label: 'Qadın'
    }
  ];
  const announcementTypes = [
    {
      key: AnnouncementTypes.SEE_ALL,
      label: Labels.noMatter
    },
    {
      key: AnnouncementTypes.SEASONAL,
      label: Labels.seasonal
    },
    {
      key: AnnouncementTypes.LONG_TERM,
      label: Labels.longTerm
    }
  ];
  const { theme } = useTheme() as ThemeContextType;
  const styles = useStyles();
  const fontStyles = useFontStyles();
  const [countyCode, setCountyCode] = useState('+994');

  const errorInputBorderColor = errors?.cityId
    ? theme.palette.color.danger
    : theme.palette.color.inputBorderColor;

  return (
    <View>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{
          marginHorizontal: 15
        }}
        showsVerticalScrollIndicator={false}
      >
        <Stack space={4} px={3} mt={6}>
          {/* announcement type */}
          <Box mb={4}>
            <Text style={styles.FilterOptionsLabel}>{Labels.announcementType}</Text>
            <CheckListWrapperOutline style={{ backgroundColor: theme.palette.color.white }}>
              <RadioList
                defaultValue={AnnouncementTypes.SEE_ALL}
                onChecked={(checkedItems: any) => onChangeFormData('announcementType', checkedItems)}
                data={announcementTypes}
                render={(data: any, onClickItem: (e: any) => void, selectedItem: any) => (
                  <CheckElementOutline
                    key={data.key}
                    label={data.label}
                    onPress={() => onClickItem(data.key)}
                    selected={selectedItem === data.key}
                    selectedItemLabelColor={{ color: theme.palette.color.white }}
                    selectedItemBgColor={{ backgroundColor: theme.palette.color.primary }}
                  />
                )}
              />
            </CheckListWrapperOutline>
          </Box>
          {/* job description */}
          <Box>
            <FormControl>
              <Text style={styles.FilterOptionsLabel}>
                {Labels.jobDescription}
                {' '}
                <Text style={{ color: 'red' }}>*</Text>
                {' '}

              </Text>
              <TextArea
                borderColor={
                  errors?.description
                    ? theme.palette.color.danger
                    : theme.palette.color.inputBorderColor
                }
                maxLength={200}
                color={theme.palette.color.dark}
                _focus={{ borderColor: theme.palette.color.inputBorderColor }}
                onChangeText={(value) => onChangeFormData('description', value)}
                fontFamily="InterRegular"
                textAlignVertical="top"
              />
              <Text
                fontSize={10}
                fontFamily={fontStyles.fontFamilyInterMedium}
                mt={2}
                color={theme.palette.color.muted}
              >
                {Labels.maximum200Symbols}
              </Text>
            </FormControl>
          </Box>

          {/* phone */}
          <HStack justifyContent="space-between">
            <SelectNativeBase
              onValueChange={(value) => setCountyCode(value)}
              selectedValue={countyCode}
              style={{
                width: 90, height: normalize(37.6), fontSize: 13, zIndex: 40000, color: 'transparent'
              }}
              items={countryCodes}
              borderColor={theme.palette.color.inputBorderColor}
              borderRadius={6}
              mb={1}
            />
            <Text style={{
              position: 'absolute', left: 10, top: 11, zIndex: 1
            }}
            >
              +
              {countyCode.replace(/\D/g, '')}
            </Text>
            <View>
              <MaskedInput
                style={{ fontSize: 13, width: normalize(223) }}
                borderColor={
                  errors.phoneNumber
                    ? theme.palette.color.danger
                    : theme.palette.color.inputBorderColor
                }
                placeholder={Labels.enterPhoneNumber}
                type="custom"
                variant="outline"
                options={{
                  mask: '99 999 99 99'
                }}
                onChangeValue={(value) => {
                  onChangeFormData('phoneNumber', value.length > 0 ? pipe(removeSpaces, addPrefix(countyCode))(value) : null);
                }}
              />
            </View>
          </HStack>

          {/* email */}
          <Box>
            <Text style={styles.FilterOptionsLabel}>Email</Text>
            <Input
              placeholder="e-poçt"
              keyboardType="email-address"
              textContentType="emailAddress"
              variant="outline"
              onChangeText={(value) => onChangeFormData('emailAddress', value)}
              style={[fontStyles.fontFamilyInterMedium, { fontSize: 13 }, {
                borderColor: errors?.emailAddress
                  ? theme.palette.color.danger : theme.palette.color.inputBorderColor
              }]}
            />
            {errors?.emailAddress
              && (
                <Text
                  color={theme.palette.color.danger}
                  mt={2}
                  fontSize="xs"
                >
                  e-poçt ünvanı düzgün formatda deyil
                </Text>
              )}
          </Box>

          {/* city */}
          <Box pt={3}>
            <Text style={styles.FilterOptionsLabel}>
              {Labels.city}
              {' '}
              <Text style={{ color: 'red' }}>*</Text>
              {' '}

            </Text>
            <SelectNativeBase
              borderColor={errorInputBorderColor}
              borderBottomColor={errorInputBorderColor}
              height={38}
              items={selectPickerDataFactory(cities)}
              placeholder={Labels.select}
              onValueChange={(value) => onChangeFormData('cityId', value)}
              style={[{ fontSize: 13, paddingBottom: isPlatformIOS ? normalize(10) : normalize(8) },
              fontStyles.fontFamilyInterMedium]}
              dropdownIcon={<View style={{ paddingRight: 12 }}><DropdownIcon /></View>}
            />
          </Box>

          {/* address */}
          <Box>
            <Text style={styles.FilterOptionsLabel}>{Labels.address}</Text>
            <MapSearch />
          </Box>

          {/* Payment range */}
          <MultiSliderPaymentRange onChangeFormData={onChangeFormData} formData={formData} />

          {/* Age */}
          <Box marginBottom={6} mt={3}>
            <Text style={styles.FilterOptionsLabel}>{Labels.age}</Text>

            <SliderComponent
              onValuesChange={(value) => onChangeFormData('age', value)}
              values={formData.age}
              min={18}
              max={99}
              sliderLength={normalize(300)}
            />
            <HStack justifyContent="space-between">
              <Text
                style={{
                  fontSize: normalize(17),
                  color: theme.palette.color.dark
                }}
              >
                {formData.age[0]}
              </Text>
              <Text
                style={{
                  fontSize: normalize(17),
                  color: theme.palette.color.dark
                }}
              >
                {formData.age[1]}
              </Text>
            </HStack>

            <Text style={styles.FilterOptionalLabel}>{Labels.optional}</Text>
          </Box>

          {/* Genders */}
          <Box>
            <Text style={styles.FilterOptionsLabel}>{Labels.gender}</Text>
            <CheckListWrapperOutline>
              <RadioList
                defaultValue={GenderTypesKeys.BOTH}
                onChecked={(checkedItems: any) => onChangeFormData('genderType', checkedItems)}
                data={genderTypes}
                render={(data: any, onClickItem: (e: any) => void, selectedItem: any) => (
                  <CheckElementOutline
                    key={data.key}
                    label={data.label}
                    onPress={() => onClickItem(data.key)}
                    selected={selectedItem === data.key}
                  />
                )}
              />
            </CheckListWrapperOutline>
            <Text style={styles.FilterOptionalLabel}>{Labels.optional}</Text>
          </Box>

          {/* deadline */}
          <Box marginBottom={normalize(55)}>
            <Text style={styles.FilterOptionsLabel}>
              {Labels.announcementDeadline}
              {' '}
              {' '}
              <Text style={{ color: 'red' }}>*</Text>
              {' '}

            </Text>
            <Datepicker
              placeholder={Labels.select}
              isOpen={false}
              onChange={(value) => {
                onChangeFormData('deadlineDate', value);
              }}
              style={[{ width: normalize(160), height: 36, fontSize: 13 },
              fontStyles.fontFamilyInterMedium,
              errors.deadlineDate && { borderColor: theme.palette.color.danger }]}
              inputProps={{ variant: 'outline', icon: <CalendarIcon /> }}
            />
            {errors.deadlineDate
              && (
                <ValidationComponent
                  style={{
                    flexDirection: 'row', justifyContent: 'flex-start', position: 'relative', bottom: -7
                  }}
                  textProps={{ style: { fontSize: 13 } }}
                  errorMessage="Son müraciət tarixi zəruridir və cari tarixdən tez olmamalıdır"
                />
              )}
          </Box>
        </Stack>

      </ScrollView>
      <View style={styles.JobFilterApplyButton}>
        <Button
          buttonTextStyle={[{ fontSize: normalize(14) }, fontStyles.fontFamilyInterMedium]}
          variant="primary"
          onPress={onSubmit}
          title={Labels.createAnnouncement}
          size="sm"
        />
      </View>
    </View>
  );
};
