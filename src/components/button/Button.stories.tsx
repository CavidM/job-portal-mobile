import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import CenterView from '../CenterView/CenterView';
import LookingForEmployeeIcon from '../Icons/LookingForEmployeeIcon';
import LookingForJobIcon from '../Icons/LookingForJobIcon';
import Button from './Button';

export const PrimaryButton = () => (
  <Button variant="primary" onPress={action('clicked-text')} title="Primary" shadow />
);

storiesOf('Button', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Primary', PrimaryButton)
  .add('Outline', () => (
    <Button variant="outline" onPress={action('clicked-text')} title="Outline" shadow />
  ))
  .add('Default', () => (
    <Button variant="default" onPress={action('clicked-text')} title="Default" shadow />
  ))
  .add('Small', () => (
    <Button variant="primary" onPress={action('clicked-text')} title="Sm Button" shadow size="sm" />
  ))
  .add('With Job Icon', () => (
    <Button variant="secondary" selected icon={<LookingForJobIcon />} size="lg" onPress={action('clicked-text')} title="Button" shadow />
  ))
  .add('With Employee Icon', () => (
    <Button variant="primary" icon={<LookingForEmployeeIcon />} size="lg" onPress={action('clicked-text')} title="Button with Icon" shadow />
  ))
  .add('With Employee Icon Selected', () => (
    <Button variant="secondary" selected icon={<LookingForEmployeeIcon />} size="lg" onPress={action('clicked-text')} title="Button with Icon" shadow />
  ));
