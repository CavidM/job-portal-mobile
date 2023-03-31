import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Alert } from 'react-native';
import CenterView from '../CenterView/CenterView';
import CountdownTimer from './CountdownTimer';

storiesOf('CountdownTimer', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Countdown Timer', () => (
    <CountdownTimer duration={5} onFinish={() => { Alert.alert('finished'); }} />
  ));
