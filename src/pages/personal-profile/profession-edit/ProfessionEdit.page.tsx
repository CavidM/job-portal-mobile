import React from 'react';
import { isEqual } from 'lodash';
import {
  View, Text, ScrollView, StyleSheet
} from 'react-native';
import { Checkbox, HStack, Divider } from 'native-base';
import { SliderComponent } from '../../../components/Slider/Slider';
import Button from '../../../components/button/Button';
import { ManatIcon } from '../../../components/Icons/ManatIcon';
import Input from '../../../components/Input/Input';
import normalize from '../../common/styles/normalize';
import { ThemeContextType, useTheme } from '../../../core/theme/Theme';
import { selectPickerListDataFactory } from '../../../tools/data-transfer-factories/DataTransferFactories';
import {
  CheckElementWhite,
  CheckListWrapper
} from '../../../components/Checkbox/CheckboxElements';
import { CheckboxSingleList } from '../../../components/Checkbox/CheckboxSingleList';
import { Labels } from '../../../core/Langs';

function ProfessionEdit(props: any) {
  const {
    experiences,
    onChange,
    formData,
    professionInformation,
    onSubmit,
    initialFormData,
    deactivateProfession

  } = props;

  const { theme } = useTheme() as ThemeContextType;

  const isInformationChanged: boolean = isEqual(initialFormData, formData);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ padding: 20 }}>
        <Text style={{ ...styles.inputLabel, ...styles.grayColor }}>{Labels.profession}</Text>
        <Input placeholder={Labels.profession} style={{ marginBottom: 20, ...styles.grayColor, ...styles.disabledInput }} editable={false} variant="outline" value={professionInformation?.professionDTO.name} />
        <Text style={{ ...styles.inputLabel, ...styles.grayColor }}>{Labels.specification}</Text>
        <Input placeholder={Labels.specification} style={{ ...styles.grayColor, ...styles.disabledInput }} editable={false} variant="outline" value={professionInformation?.specificationDTO.name} />
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
            onChecked={(checkedItems: any) => onChange('experience', checkedItems)}
            data={selectPickerListDataFactory(experiences?.data.data) ?? []}
            defaultValue={formData.experience}
            render={(data: any, onClickItem: (e: any) => void, selectedItem: any) => (
              <CheckElementWhite
                // style={{ height: 50 }}
                key={data.key}
                label={data.label}
                onPress={() => onClickItem(data.key)}
                selected={selectedItem === data.key}
              />
            )}
          />
        </CheckListWrapper>
        <View style={{
          marginTop: 30, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'
        }}
        >
          <Button
            style={{ marginHorizontal: 0 }}
            disabled={isInformationChanged}
            variant={isInformationChanged ? 'default' : 'primary'}
            color={isInformationChanged ? theme.palette.color.bgGray : theme.palette.color.green}
            width={normalize(160)}
            size="sm"
            title={Labels.save}
            onPress={onSubmit}
          />
          <Button
            style={{ marginHorizontal: 0, borderColor: theme.palette.color.danger, borderWidth: 1 }}
            buttonTextStyle={{ color: theme.palette.color.danger }}
            variant="outline"
            color="#fff"
            width={normalize(160)}
            size="sm"
            title={professionInformation?.status === 'INACTIVE' ? 'Aktiv Et' : 'Deaktiv Et'}
            onPress={deactivateProfession}
          />
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
  disabledInput: {
    fontSize: 13
  },
  grayColor: {
    color: '#B5B5BD'
  }
});

export default ProfessionEdit;
