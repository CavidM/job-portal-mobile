import { storiesOf } from '@storybook/react-native';
import React from 'react';
import CenterView from '../../../../components/CenterView/CenterView';
import { UsersSearchFormPage } from './UsersSearchForm.page';

export const JobFilterOptionsStoryDefault = () => (
  <UsersSearchFormPage />
);

storiesOf('JobFilterComponent', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('JobFilterComponent', () => (
    <JobFilterOptionsStoryDefault />
  ));
