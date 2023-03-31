import { storiesOf } from '@storybook/react-native';
import React from 'react';
import CenterView from '../CenterView/CenterView';
import ImagePickerComponent from './ImagePickerComponent';

storiesOf('ImagePicker', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('ImagePicker', () => (
    <ImagePickerComponent onImageLoad={() => {}} />
  ));
