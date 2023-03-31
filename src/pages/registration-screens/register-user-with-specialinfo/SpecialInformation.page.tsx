import {
  ScrollView, StyleSheet, Text, View
} from 'react-native';
import React, { useEffect } from 'react';
import { Divider, HStack } from 'native-base';
import { useNavigation } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import { useLayoutStyles } from '../../common/styles/LayoutStyles';
import { SpecialInformationFormSchemaType } from './SpecialInformation.context';
import useFontStyles from '../../../components/common/font.style';
import { ThemeContextType, useTheme } from '../../../core/theme/Theme';
import { selectPickerListDataFactory } from '../../../tools/data-transfer-factories/DataTransferFactories';
import { CheckElementWhite, CheckListWrapper } from '../../../components/Checkbox/CheckboxElements';
import { CheckboxSingleList } from '../../../components/Checkbox/CheckboxSingleList';
import { SliderComponent } from '../../../components/Slider/Slider';
import normalize from '../../common/styles/normalize';
import { setSpecification, specialInformationSelectors } from '../../../store/slices/specialInformation.slice';
import { ArrowForwardIcon } from '../../../components/Icons/ArrowForwardIcon';
import ValidationComponent from '../../../components/Validation/ValidationComponent';

interface SpecialInformationPageProps {
  experiences: any
  errors: Partial<SpecialInformationFormSchemaType>,
  onChange: (...args: any) => void,
  formData: Partial<SpecialInformationFormSchemaType>
}

const SpecialInformationPage = (props: SpecialInformationPageProps) => {
  const styles = useLayoutStyles();
  const fontStyle = useFontStyles();
  const {
    formData, errors, onChange, experiences
  } = props;
  const { theme } = useTheme() as ThemeContextType;

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const currentProfession = useSelector(specialInformationSelectors.getProfession);
  const currentSpecification = useSelector(specialInformationSelectors.getSpecification);

  useEffect(() => {
    onChange('professionId', currentProfession?.id);
    dispatch(setSpecification({ itemId: '', itemName: 'Spesifikasiya' }));
  }, [currentProfession]);

  useEffect(() => {
    onChange('specificationId', currentSpecification?.id);
  }, [currentSpecification]);

  return (
    <ScrollView
      contentContainerStyle={styles.pageBodyWrapper}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={{ marginBottom: 30 }}
    >
      <Text style={[styles.registerAfterVerificationPageTitle, fontStyle.fontFamilyInterRegular]}>
        Xüsusi məlumat
      </Text>
      <View style={styles.container}>
        <HStack justifyContent="space-between" onTouchStart={() => navigation.navigate('RegisterProfessionsList')}>
          <Text
            style={[fontStyle.fontFamilyInterMedium, { color: currentProfession.name === 'Peşə' ? '#939396' : '#000' }]}
          >
            {currentProfession.name}
          </Text>
          <ArrowForwardIcon />
        </HStack>
        {errors.professionId
          && (
            <ValidationComponent
              style={{
                flexDirection: 'row', justifyContent: 'flex-start', position: 'relative', bottom: -7
              }}
              textProps={{ style: { fontSize: 13 } }}
              errorMessage={errors?.professionId}
            />
          )}
        <Divider my={3} bgColor={theme.palette.color.inputBorderColor} />

        <HStack
          justifyContent="space-between"
          onTouchStart={() => navigation.navigate('RegisterSpecificationsList', { professionId: currentProfession.id })}
          mt={4}
        >
          <Text
            style={[fontStyle.fontFamilyInterMedium, { color: currentSpecification.name === 'Spesifikasiya' ? '#939396' : '#000' }]}
          >
            {currentSpecification.name}
          </Text>
          <ArrowForwardIcon />
        </HStack>
        {errors.specificationId
          && (
            <ValidationComponent
              style={{
                flexDirection: 'row', justifyContent: 'flex-start', position: 'relative', bottom: -7
              }}
              textProps={{ style: { fontSize: 13 } }}
              errorMessage={errors?.specificationId}
            />
          )}

        <Divider my={3} mb={6} bgColor={theme.palette.color.inputBorderColor} />

        <Text style={pageStyles.label}>
          Təcrübə
        </Text>
        <CheckListWrapper>
          <CheckboxSingleList
            onChecked={(checkedItem: any) => onChange('experience', checkedItem === 0 ? null : checkedItem)}
            data={selectPickerListDataFactory(experiences) ?? []}
            render={(data: any, onClickItem: (e: any) => void, selectedItem: any) => (
              <CheckElementWhite
                style={{
                  borderColor: errors?.experience ? 'red' : theme.palette.ApplicantColor,
                  marginBottom: 40,
                  borderWidth: 2
                }}
                key={data.key}
                label={data.label}
                onPress={() => onClickItem(data.key)}
                selected={selectedItem === data.key}
              />
            )}
          />
        </CheckListWrapper>
        <Text style={pageStyles.label}>
          İstənilən əmək haqqı (min - max)
        </Text>
        <SliderComponent
          onValuesChange={(value) => onChange('salary', value)}
          values={formData.salary ?? [1, 5000]}
          min={1}
          max={5000}
          sliderLength={normalize(300)}
        />
        <HStack justifyContent="space-between">
          <Text style={{
            fontSize: normalize(17)
          }}
          >
            {formData?.salary[0]}
            {' '}
          </Text>
          <Text style={{
            fontSize: normalize(17)
          }}
          >
            {formData?.salary[1]}
            {' '}
          </Text>
        </HStack>
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

export default SpecialInformationPage;
