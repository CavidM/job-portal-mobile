import { storiesOf } from '@storybook/react-native';
import React from 'react';
import CenterView from '../CenterView/CenterView';
import Loader from './Loader';

storiesOf('Loader', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Loader', () => (
    <Loader />
  ));
