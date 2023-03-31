import React from 'react';
import {
  ScrollView,
  View
} from 'react-native';
import {
  FormControl, Checkbox, Stack, Text, TextArea, HStack
} from 'native-base';
import Box from 'native-base/src/components/primitives/Box';
import { SelectNativeBase } from '../../../../components/PickerSelect/SelectNativeBase';
import { SliderComponent } from '../../../../components/Slider/Slider';
import { ManatIcon } from '../../../../components/Icons/ManatIcon';
import { Counter } from '../../../../components/Counter/Counter';
import {
  CheckElementOutline,
  CheckElementWhite,
  CheckListWrapper, CheckListWrapperOutline
} from '../../../../components/Checkbox/CheckboxElements';
import Button from '../../../../components/button/Button';
import { ThemeContextType, useTheme } from '../../../../core/theme/Theme';
import useStyles from './UsersSearchForm.style';
import normalize from '../../../common/styles/normalize';
import { CheckboxSingleList } from '../../../../components/Checkbox/CheckboxSingleList';
import { CityModel } from '../../../../services/information-service/InformationService.types';
import { selectPickerDataFactory } from '../../../../tools/data-transfer-factories/DataTransferFactories';
import { UsersSearchFormProps } from './UsersSearchForm.container';
import DropdownIcon from '../../../../components/Icons/DropdownIcon';
import { Labels } from '../../../../core/Langs';
import { isPlatformIOS } from '../../../../core/theme/Constants';
import { RadioList } from '../../../../components/Checkbox/RadioList';

interface UsersSearchFormPageProps {
  cities: CityModel[]
  formData: UsersSearchFormProps,
  onChangeFormData: (field: string, value: any) => void
  onSubmit: () => void,
  errors: Partial<UsersSearchFormProps>
}

export const UsersSearchFormPage = (props: UsersSearchFormPageProps) => {
  const {
    cities, formData, onChangeFormData, onSubmit, errors
  } = props;

  const experiences = [
    {
      key: '0-3',
      label: '0-3 il'
    },
    {
      key: '3-6',
      label: '3-6 il'
    },
    {
      key: '6-10',
      label: '6-10 il'
    },
    {
      key: '10+',
      label: '10+'
    }
  ];
  const genderTypes = [
    {
      key: 'BOTH',
      label: 'Fərqi yoxdur'
    },
    {
      key: 'MALE',
      label: 'Kişi'
    },
    {
      key: 'FEMALE',
      label: 'Qadın'
    }
  ];
  const { theme } = useTheme() as ThemeContextType;
  const styles = useStyles();

  const errorInputBorderColor = errors?.cityId
    ? theme.palette.color.danger
    : theme.palette.color.inputBorderColor;

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        style={{
          marginHorizontal: 15
        }}
      >
        <Stack space={4} px={3} mt={6}>
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
                fontFamily="InterRegular"
                borderColor={
                  errors?.jobDescription
                    ? theme.palette.color.danger
                    : theme.palette.color.inputBorderColor
                }
                maxLength={200}
                color={theme.palette.color.dark}
                _focus={{ borderColor: theme.palette.color.inputBorderColor }}
                onChangeText={(value) => onChangeFormData('jobDescription', value)}
                textAlignVertical="top"
              />
              <Text fontSize={10} fontFamily="InterMedium" mt={2} color={theme.palette.color.muted}>
                {Labels.maximum200Symbols}
              </Text>
            </FormControl>
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
              style={{ fontFamily: 'InterMedium', fontSize: 13, paddingBottom: isPlatformIOS ? normalize(10) : normalize(8) }}
              dropdownIcon={<View style={{ paddingRight: 12 }}><DropdownIcon /></View>}
            />
          </Box>

          {/* Payment range */}
          <Box pt={4}>
            <Text style={styles.FilterOptionsLabel}>{Labels.paymentRange}</Text>
            <HStack justifyContent="space-between">
              <SliderComponent
                onValuesChange={(value) => onChangeFormData('salary', value[0])}
                values={[formData.salary]}
                min={0}
                max={5000}
                enabledOne={!formData.isAgreedPrice}
                enabledTwo={false}
                sliderLength={normalize(235)}
              />
              <Text
                style={{
                  fontSize: normalize(17),
                  color: formData.isAgreedPrice
                    ? theme.palette.color.muted
                    : theme.palette.color.dark
                }}
                mt={3}
                ml={3}
              >
                {formData.salary}
                {' '}
                <ManatIcon
                  svgProps={{
                    color:
                      formData.isAgreedPrice ? theme.palette.color.muted
                        : theme.palette.color.dark
                  }}
                />
              </Text>
            </HStack>
            <Checkbox
              isChecked={formData.isAgreedPrice}
              onChange={(value) => onChangeFormData('isAgreedPrice', value)}
              value=""
              style={{ alignSelf: 'flex-end' }}
              colorScheme="blue"
              accessibilityLabel="OnAgreedPrice"
              mt={1.5}
            >
              <Text fontFamily="InterMedium" style={{ fontSize: normalize(13) }} ml={3}>
                {Labels.onAgreedPrice}
              </Text>
            </Checkbox>
          </Box>

          {/* Amount of people */}
          <Box pt={6} pb={3}>
            <HStack justifyContent="space-between">
              <Text mt={3} style={styles.FilterOptionsLabel}>{Labels.amountOfPeople}</Text>
              <Counter
                onPressDecrement={() => onChangeFormData('countOfPerson', formData.countOfPerson - 1)}
                onPressIncrement={() => onChangeFormData('countOfPerson', formData.countOfPerson + 1)}
                count={formData.countOfPerson}
              />
            </HStack>
            <Text style={styles.FilterOptionalLabel}>{Labels.optional}</Text>
          </Box>

          {/* Age */}
          <Box marginBottom={6} mt={3}>
            <HStack justifyContent="space-between">
              <Text style={styles.FilterOptionsLabel}>{Labels.age}</Text>
              <Text style={styles.SliderRangeValue}>
                (
                {formData.age[0]}
                {' '}
                {Labels.with}
                {' '}
                {formData.age[1]}
                {' '}
                {Labels.between.toLocaleLowerCase()}
                )
              </Text>
            </HStack>

            <SliderComponent
              onValuesChange={(value) => onChangeFormData('age', value)}
              values={formData.age}
              min={18}
              max={99}
              sliderLength={normalize(300)}
            />
            <Text style={[styles.FilterOptionalLabel, { marginTop: 0 }]}>{Labels.optional}</Text>
          </Box>

          {/* Work experience */}
          <Box>
            <Text style={styles.FilterOptionsLabel}>{Labels.workExperience}</Text>
            <CheckListWrapper>
              <CheckboxSingleList
                onChecked={(checkedItems: any) => onChangeFormData('experience', checkedItems)}
                data={experiences}
                render={(data: any, onClickItem: (e: any) => void, selectedItem: any) => (
                  <CheckElementWhite
                    key={data.key}
                    label={data.label}
                    onPress={() => onClickItem(data.key)}
                    selected={selectedItem === data.key}
                  />
                )}
              />
            </CheckListWrapper>
            <Text style={styles.FilterOptionalLabel}>{Labels.optional}</Text>
          </Box>
          {/* Genders */}
          <Box marginBottom={normalize(55)}>
            <Text style={styles.FilterOptionsLabel}>{Labels.gender}</Text>
            <CheckListWrapperOutline>
              <RadioList
                defaultValue="BOTH"
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

        </Stack>

      </ScrollView>
      <View style={styles.JobFilterApplyButton}>
        <Button buttonTextStyle={{ fontSize: normalize(14), fontFamily: 'InterMedium' }} variant="primary" onPress={onSubmit} title={Labels.createOrder} size="sm" />
      </View>
    </View>
  );
};
