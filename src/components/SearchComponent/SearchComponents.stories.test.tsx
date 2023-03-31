import { render } from '@testing-library/react-native';
import React from 'react';
import { StoryBookProviders } from '../../tools/Providers';
import { SearchBarStoryDefault } from './SearchComponents.stories';

describe('Search Component', () => {
  it('should render Searchbar', () => {
    render(<SearchBarStoryDefault />, { wrapper: StoryBookProviders });
  });
});
