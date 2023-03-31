import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import CenterView from '../CenterView/CenterView';
import { SearchBar } from './SearchBar';
import { SearchByJob } from './SearchByJob.page';
import { SearchResultDivider } from './SearchResultDivider';
import { SearchResultDividerBase } from './SearchResultDividerBase';

export const SearchBarStoryDefault = () => (
  <SearchBar width={324} placeholder="Search" />
);

storiesOf('SearchComponent', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('SearchComponent', () => (
    <SearchBarStoryDefault />
  ))
  .add('SearchResultDivider', () => (
    <View style={{ width: 324 }}>
      <SearchResultDivider text="teacher" />

    </View>
  ))
  .add('SearchresultDividerBase', () => (
    <View style={{ width: 324 }}>
      <SearchResultDividerBase text="job" />
    </View>

  ))
  .add('Search by Job', () => (
    <SearchByJob />
  ));
