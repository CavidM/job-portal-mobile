import { storiesOf } from '@storybook/react-native';
import React from 'react';
import CenterView from '../CenterView/CenterView';
import Input from './Input';

storiesOf('Input', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('underline', () => (
    <Input variant="underline" style={{ width: '90%' }} placeholder="FIN kod" />
  ))
  .add('outline', () => (
    <Input variant="outline" style={{ width: '90%' }} placeholder="FIN kod" />
  ))
  .add('Validation', () => (
    <Input style={{ width: '90%' }} error errorMessage="Yanlış FIN nömrə" placeholder="FIN kod" />
  ))
  .add('Mobile number', () => (
    <Input style={{ width: '90%' }} placeholder="Mobil nomre" keyboardType="phone-pad" />
  ));
