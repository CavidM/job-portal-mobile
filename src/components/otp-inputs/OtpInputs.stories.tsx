import { storiesOf } from '@storybook/react-native';
import React from 'react';
import CenterView from '../CenterView/CenterView';
import OtpInput from './OtpInputs.v1';

storiesOf('OtpInput', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('OTP', () => (
    <OtpInput />
  ));
