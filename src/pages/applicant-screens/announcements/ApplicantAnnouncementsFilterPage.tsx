import { View } from 'react-native';
import React from 'react';
import {
  Button, Checkbox, Divider, HStack, ScrollView, Text
} from 'native-base';
import Box from 'native-base/src/components/primitives/Box/index';
import { useNavigation } from '@react-navigation/native';
import normalize from '../../common/styles/normalize';
import { Labels } from '../../../core/Langs';
import { ThemeContextType, useTheme } from '../../../core/theme/Theme';
import {
  CheckElementOutline,
  CheckListWrapperOutline
} from '../../../components/Checkbox/CheckboxElements';
import { RadioList } from '../../../components/Checkbox/RadioList';
import ButtonComponent from '../../../components/button/Button';
import { AnnouncementTypes, GenderTypesKeys } from '../../../core/Constants';
import useStyles from '../../customer-screens/service-order/users-search-form/UsersSearchForm.style';
import { SelectNativeBase } from '../../../components/PickerSelect/SelectNativeBase';
import { selectPickerDataFactory } from '../../../tools/data-transfer-factories/DataTransferFactories';
import { isPlatformIOS } from '../../../core/theme/Constants';
import DropdownIcon from '../../../components/Icons/DropdownIcon';
import { CityModel } from '../../../services/information-service/InformationService.types';
import { AnnouncementFilterProps } from './ApplicantAnnouncementsFilter.container';
import { MultiSliderPaymentRange } from '../../../components/Slider/MultiSliderPaymentRange';
import { AppScreens } from '../../../routes/Navigator.types';
import useFontStyles from '../../../components/common/font.style';
import { ArrowForwardIcon } from '../../../components/Icons/ArrowForwardIcon';

interface ApplicantAnnouncementsFilterPageProps {
  onClickCancelButton: () => void,
  cities: CityModel[],
  onChangeFormData: (field: string, value: string | number[] | boolean) => void,
  announcementCount: number | undefined,
  onClickShowResultButton: () => void,
  formData: AnnouncementFilterProps,
  selectedSpecificationsIds: number[]
}

export const ApplicantAnnouncementsFilterPage = (props: ApplicantAnnouncementsFilterPageProps) => {
  // @todo checkbox border color
  const { theme } = useTheme() as ThemeContextType;
  const styles = useStyles();
  const navigation = useNavigation();
  const fontStyle = useFontStyles();

  const {
    announcementCount, formData, selectedSpecificationsIds,
    onClickCancelButton, cities, onChangeFormData, onClickShowResultButton
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

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center' }} showsVerticalScrollIndicator={false}>
      <View style={{ marginTop: 20, width: '90%' }}>
        {/* Specifications */}
        <HStack
          justifyContent="space-between"
          onTouchStart={() => navigation.navigate(AppScreens.AnnouncementSpecifications)}
          pb={6}
          pt={3}
        >
          <Text
            style={fontStyle.fontFamilyInterMedium}
          >
            {Labels.specifications}
            (
            {selectedSpecificationsIds?.length}
            )
          </Text>
          <ArrowForwardIcon />
        </HStack>
        <Divider bgColor={theme.palette.color.silver} mb={6} />
        {/* announcement type */}
        <Box style={{ width: '100%' }}>
          <Text mb={3}>{Labels.announcementType}</Text>
          <CheckListWrapperOutline style={{ width: '100%' }}>
            <RadioList
              defaultValue={formData.announcementType}
              onChecked={(checkedItems: string) => onChangeFormData('announcementType', checkedItems)}
              data={announcementTypes}
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
        </Box>
        <Divider mt={6} mb={4} bgColor={theme.palette.color.silver} />
        {/* Payment range */}
        <MultiSliderPaymentRange
          onChangeFormData={onChangeFormData}
          formData={formData}
          sliderLength={normalize(310)}
        />

        <Divider my={4} bgColor={theme.palette.color.silver} />

        {/* Genders */}
        <Box>
          <Text style={styles.FilterOptionsLabel}>{Labels.gender}</Text>
          <CheckListWrapperOutline>
            <RadioList
              defaultValue={formData.gender}
              onChecked={(checkedItems: string) => onChangeFormData('gender', checkedItems)}
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
        </Box>
        <Divider my={6} bgColor={theme.palette.color.silver} />
        {/* city */}
        <Box>
          <Text style={styles.FilterOptionsLabel}>{Labels.city}</Text>
          <SelectNativeBase
            defaultValue={formData.cityId}
            height={38}
            items={selectPickerDataFactory(cities)}
            placeholder={Labels.select}
            onValueChange={(value) => onChangeFormData('cityId', value)}
            style={{ fontFamily: 'InterMedium', fontSize: 13, paddingBottom: isPlatformIOS ? normalize(10) : normalize(8) }}
            dropdownIcon={<View style={{ paddingRight: 12 }}><DropdownIcon /></View>}
          />
        </Box>

        <Divider my={6} bgColor={theme.palette.color.silver} />
        <View style={{ flexDirection: 'row' }}>
          <Checkbox
            onChange={(value) => onChangeFormData('isStarred', value)}
            defaultIsChecked={formData.isStarred}
            textColor="red"
            style={{ justifyContent: 'flex-start', width: '100%', borderColor: theme.palette.ApplicantColor }}
            colorScheme="orange"
            size="sm"
            value=""
          >
            Ancaq favoritlər
          </Checkbox>
        </View>
        <Divider my={6} bgColor={theme.palette.color.silver} />

        {/* action buttons */}
        <Button.Group
          variant="solid"
          isAttached
          space={6}
          mx={{
            base: 'auto',
            md: 0
          }}
        >
          <ButtonComponent
            buttonTextStyle={{ fontSize: normalize(14), fontFamily: 'InterRegular', color: theme.palette.color.danger }}
            variant="outline"
            title={Labels.cancel}
            size="sm"
            onPress={onClickCancelButton}
            style={{
              margin: 5,
              width: normalize(153),
              height: normalize(44),
              borderColor: theme.palette.color.danger,
              borderWidth: 2
            }}
          />
          <ButtonComponent
            buttonTextStyle={{ fontSize: normalize(14), fontFamily: 'InterRegular' }}
            variant="primary"
            title={`${Labels.showResult} (${announcementCount})`}
            size="sm"
            onPress={onClickShowResultButton}
            style={{
              margin: 5,
              width: normalize(153),
              height: normalize(44)
            }}
          />
        </Button.Group>
      </View>
    </ScrollView>

  );
};
