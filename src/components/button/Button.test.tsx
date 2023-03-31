import { render } from '@testing-library/react-native';
import React from 'react';
import { PrimaryButton } from './Button.stories';
import { StoryBookProviders } from '../../tools/Providers';

describe('should render Button stories', () => {
  it('should render Primary Button', () => {
    render(<PrimaryButton />, { wrapper: StoryBookProviders });
  });
});
