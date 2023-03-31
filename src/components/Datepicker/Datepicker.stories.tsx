import { storiesOf } from '@storybook/react-native';
import React from 'react';
import CenterView from '../CenterView/CenterView';
import Datepicker from './Datepicker';

storiesOf('Datepicker', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Datepicker', () => (
    <Datepicker
      placeholder="Təvəllüd"
      onChange={() => {}}
      style={{ width: '90%' }}
    />
  ))
  .add('Datepicker Validation', () => (
    <Datepicker
      error
      errorMessage="Təvəllüdü seçin"
      placeholder="Təvəllüd"
      onChange={() => {}}
      style={{ width: '90%' }}
    />
  ));
