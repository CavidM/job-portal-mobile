import { storiesOf } from '@storybook/react-native';
import React from 'react';
import CenterView from '../CenterView/CenterView';
import ButtonWithSteps from '../button-steps/ButtonWithSteps';

storiesOf('Button With Steps', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Active Button With Steps', () => (
    <ButtonWithSteps title="Next" step={2} onPress={() => {}} />
  ))
  .add('Disable Button With Steps', () => (
    <ButtonWithSteps title="Novbeti" disabled step={1} onPress={() => {}} />
  ));
