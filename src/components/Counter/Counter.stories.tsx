import React from 'react';
import { storiesOf } from '@storybook/react-native';
import CenterView from '../CenterView/CenterView';
import { CounterContainer } from './Countercontainer';

export const CounterStoryDefault = () => (
  <CounterContainer />
);

storiesOf('Counter', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Counter', () => (
    <CounterStoryDefault />
  ));
