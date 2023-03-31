import { storiesOf } from '@storybook/react-native';
import React from 'react';
import CenterView from '../../../../components/CenterView/CenterView';
import { UsersSearchResultItem } from './UsersSearchResultItem';

export const UsersSearchResultItemStory = () => <UsersSearchResultItem />;

storiesOf('Service order users search result', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Default', () => <UsersSearchResultItemStory />);
