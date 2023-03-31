import { storiesOf } from '@storybook/react-native';
import React from 'react';
import CenterView from '../../components/CenterView/CenterView';
import EntryAuthPage from './EntryAuth.page';

storiesOf('Pages/Entry Auth', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Default', () => (
    <EntryAuthPage />
  ));
