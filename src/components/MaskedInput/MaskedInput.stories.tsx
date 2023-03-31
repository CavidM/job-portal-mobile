import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import CenterView from '../CenterView/CenterView';
import MaskedInput from './MaskedInput';

storiesOf('MaskedInput', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('MaskedInput', () => (
    <View style={{ width: '90%' }}>
      <MaskedInput
        placeholder="Mobile number"
        type="custom"
        options={{
          mask: '99 999 99 99'
        }}
        onChangeValue={() => {}}
      />
    </View>
  ))
  .add('MaskedInput Validation', () => (
    <View style={{ width: '90%' }}>
      <MaskedInput
        error
        errorMessage="Please enter mobile number"
        placeholder="Mobile number"
        type="custom"
        options={{
          mask: '99 999 99 99'
        }}
        onChangeValue={() => {}}
      />
    </View>
  ));
