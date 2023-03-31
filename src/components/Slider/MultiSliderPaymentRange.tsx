import Box from 'native-base/src/components/primitives/Box/index';
import { Checkbox, HStack, Text } from 'native-base';
import React from 'react';
import { Labels } from '../../core/Langs';
import { SliderComponent } from './Slider';
import normalize from '../../pages/common/styles/normalize';
import { ManatIcon } from '../Icons/ManatIcon';
import { AnnouncementFilterProps } from '../../pages/applicant-screens/announcements/ApplicantAnnouncementsFilter.container';
import { ThemeContextType, useTheme } from '../../core/theme/Theme';
import useStyles from '../../pages/customer-screens/service-order/users-search-form/UsersSearchForm.style';
import { AnnouncementFormProps } from '../../pages/customer-screens/announcements/AnnouncementForm.container';

interface MultiSliderPaymentRangeProps {
    onChangeFormData: (field: string, value: string | number[] | boolean) => void,
    formData: AnnouncementFilterProps | AnnouncementFormProps,
    sliderLength?: number
}

export const MultiSliderPaymentRange = (props: MultiSliderPaymentRangeProps) => {
  const { theme } = useTheme() as ThemeContextType;
  const styles = useStyles();
  const {
    onChangeFormData, formData, sliderLength
  } = props;
  return (
    <Box style={{ width: '100%' }} pt={4}>
      <Text style={styles.FilterOptionsLabel}>{Labels.paymentRange}</Text>
      <SliderComponent
        onValuesChange={(value: number[]) => onChangeFormData('salary', value)}
        values={formData.salary}
        min={0}
        max={5000}
        enabledOne={!formData.isAgreedPrice}
        enabledTwo={!formData.isAgreedPrice}
        sliderLength={sliderLength || normalize(300)}
      />

      <HStack justifyContent="space-between">
        <Text
          style={{
            fontSize: normalize(17),
            color: formData.isAgreedPrice
              ? theme.palette.color.muted
              : theme.palette.color.dark
          }}
        >
          {formData.salary[0]}
          {' '}
          <ManatIcon
            svgProps={{
              color:
                      formData.isAgreedPrice ? theme.palette.color.muted
                        : theme.palette.color.dark
            }}
          />
        </Text>
        <Text
          style={{
            fontSize: normalize(17),
            color: formData.isAgreedPrice
              ? theme.palette.color.muted
              : theme.palette.color.dark
          }}
        >
          {formData.salary[1]}
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
        defaultIsChecked={formData.isAgreedPrice}
        onChange={(value) => onChangeFormData('isAgreedPrice', value)}
        value=""
        style={{ alignSelf: 'flex-end' }}
        colorScheme="blue"
        accessibilityLabel="OnAgreedPrice"
        mt={2}
      >
        <Text fontFamily="InterMedium" style={{ fontSize: normalize(13) }} ml={3}>
          {Labels.onAgreedPrice}
        </Text>
      </Checkbox>
    </Box>
  );
};
