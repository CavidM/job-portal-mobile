import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import CenterView from '../../../components/CenterView/CenterView';
import RegisterUserTypePage from './RegisterUserType.page';
import ButtonWithSteps from '../../../components/button-steps/ButtonWithSteps';

storiesOf('Pages/Register user type', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Default', () => (
    <RegisterUserTypePage />
  ))
  .add('With Button steps', () => (
    <View>
      <RegisterUserTypePage />
      <View style={{ alignItems: 'center', bottom: 30 }}>
        <ButtonWithSteps title="Next" onPress={() => {}} />
      </View>
    </View>
  ));
