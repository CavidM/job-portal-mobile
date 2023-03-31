import { storiesOf } from '@storybook/react-native';
import React from 'react';
import CenterView from '../CenterView/CenterView';
import SelectPicker from './SelectPicker';
import { SelectNativeBase } from './SelectNativeBase';
import SelectIcon from '../Icons/SelectIcon';

const sports = [
  {
    label: 'Football',
    value: 'football'
  },
  {
    label: 'Baseball',
    value: 'baseball'
  },
  {
    label: 'Hockey',
    value: 'hockey'
  }
];
storiesOf('PickerSelect', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('PickerSelect', () => (

    <SelectPicker
      style={{ width: '90%' }}
      items={sports ?? []}
      placeholder="Şəhər"
      mode="dropdown"
    />
  ))
  .add('PickerSelectValidation', () => (
    <SelectPicker
      style={{ width: '90%' }}
      items={sports ?? []}
      placeholder="idman"
      mode="dropdown"
      error
      errorMessage="Idmani seçin"
      onValueChange={() => {}}
    />
  ))
  .add('native base select', () => (
    <SelectNativeBase
      style={{ width: '90%' }}
      placeholder="sports"
      items={sports}
      variant="underlined"
      dropdownIcon={<SelectIcon />}
      paddingLeft={0}
    />
  ))
  .add('native base select with validation', () => (
    <SelectNativeBase
      style={{ width: '90%' }}
      placeholder="sports"
      items={sports}
      variant="underlined"
      dropdownIcon={<SelectIcon />}
      paddingLeft={0}
      error
      errorMessage="Please select item"
    />
  ));
