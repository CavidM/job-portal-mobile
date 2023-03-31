import React, { useEffect } from 'react';
import {
  View, Text, ScrollView, StyleSheet
} from 'react-native';
import { Checkbox, HStack, Divider } from 'native-base';
import { SliderComponent } from '../../../components/Slider/Slider';
import Button from '../../../components/button/Button';
import { ManatIcon } from '../../../components/Icons/ManatIcon';
import normalize from '../../common/styles/normalize';
import { ThemeContextType, useTheme } from '../../../core/theme/Theme';
import { selectPickerListDataFactory, selectPickerDataFactory } from '../../../tools/data-transfer-factories/DataTransferFactories';
import {
  CheckElementWhite,
  CheckListWrapper
} from '../../../components/Checkbox/CheckboxElements';
import { CheckboxSingleList } from '../../../components/Checkbox/CheckboxSingleList';
import { SelectNativeBase } from '../../../components/PickerSelect/SelectNativeBase';
import { Labels } from '../../../core/Langs';

function ProfessionAdd(props: any) {
  const {
    experiences,
    professions,
    onChange,
    formData,
    specifications,
    errors,
    onSubmit
  } = props;

  const { theme } = useTheme() as ThemeContextType;

  useEffect(() => {
    onChange('specification', null);
  }, [formData.profession]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ padding: 20 }}>
        <Text style={{ ...styles.inputLabel }}>{Labels.profession}</Text>
        <SelectNativeBase
          errorIconStyle={{ top: normalize(10) }}
          borderColor={
            errors?.profession
              ? theme.palette.color.danger
              : theme.palette.color.inputBorderColor
          }
          error={!!errors?.profession}
          errorMessage={Labels.enterProfession}
          placeholder={Labels.enterProfession}
          variant="outline"
          style={{ fontSize: 13, height: 40 }}
          selectedValue={formData.profession}
          items={selectPickerDataFactory(professions?.data.data) ?? []}
          onValueChange={(value: string) => onChange('profession', value)}
        />
        <Text style={{ ...styles.inputLabel, marginTop: 40 }}>{Labels.specification}</Text>
        <SelectNativeBase
          errorIconStyle={{ top: normalize(10) }}
          borderColor={
            errors?.specification
              ? theme.palette.color.danger
              : theme.palette.color.inputBorderColor
          }
          error={!!errors?.specification}
          errorMessage={Labels.enterSpecification}
          placeholder={Labels.enterSpecification}
          variant="outline"
          style={{ fontSize: 13, height: 40 }}
          selectedValue={formData.specification}
          items={selectPickerDataFactory(specifications?.data.data) ?? []}
          onValueChange={(value: string) => { onChange('specification', value); }}
        />
        <Divider my="30" />
        <Text style={styles.inputLabel}>{Labels.expectedSalary}</Text>
        <SliderComponent
          onValuesChange={(value) => onChange('salary', value)}
          values={formData.salary}
          min={0}
          max={5000}
          sliderLength={normalize(320)}
          enabledOne={!formData.isAgreedPrice}
          enabledTwo={!formData.isAgreedPrice}
        />
        <HStack justifyContent="space-between">
          <Text style={{
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
                viewBox: '0 0 18 12',
                color:
                  formData.isAgreedPrice ? theme.palette.color.muted
                    : theme.palette.color.dark
              }}
            />
          </Text>
          <Text style={{
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
                viewBox: '0 0 18 12',
                color:
                  formData.isAgreedPrice ? theme.palette.color.muted
                    : theme.palette.color.dark
              }}
            />
          </Text>
        </HStack>
        <Checkbox
          isChecked={formData.isAgreedPrice}
          onChange={(value) => onChange('isAgreedPrice', value)}
          value=""
          style={{ alignSelf: 'flex-end' }}
          colorScheme="blue"
          mt={3}
        >
          <Text style={{ fontSize: normalize(14), ...styles.grayColor }}>
            {'  '}
            {Labels.onAgreedPrice}
          </Text>
        </Checkbox>
        <Divider my="30" />
        <Text style={styles.inputLabel}>{Labels.experience}</Text>
        <CheckListWrapper>
          <CheckboxSingleList
            onChecked={(checkedItem: any) => onChange('experience', checkedItem === 0 ? null : checkedItem)}
            data={selectPickerListDataFactory(experiences?.data.data) ?? []}
            render={(data: any, onClickItem: (e: any) => void, selectedItem: any) => (
              <CheckElementWhite
                style={{
                  borderColor: errors?.experience ? 'red' : theme.palette.ApplicantColor,
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
        <View style={{
          marginTop: 30
        }}
        >
          <Button variant="primary" color="#02B64A" size="sm" title={Labels.save} onPress={onSubmit} style={{ margin: 0, width: '100%' }} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 14,
    color: 'black'
  },

  grayColor: {
    color: '#B5B5BD'
  }
});

export default ProfessionAdd;
