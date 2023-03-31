import React from 'react';
import { storiesOf } from '@storybook/react-native';
import CenterView from '../CenterView/CenterView';
import { SliderComponent } from './Slider';
import { SliderContainer } from './SliderContainer';

export const SliderStoryDefault = () => (
  <SliderComponent />
);

storiesOf('Slider', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Slider', () => (
    <SliderStoryDefault />
  ))
  .add('SliderContainer', () => (
    <SliderContainer />
  ));
