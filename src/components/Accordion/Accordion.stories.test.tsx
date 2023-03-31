import { render } from '@testing-library/react-native';
import React from 'react';
import { StoryBookProviders } from '../../tools/Providers';
import { AccordionStoryDefault } from './Accordion.stories';

describe('Accordion Component', () => {
  it('should render Accordion', () => {
    render(<AccordionStoryDefault />, { wrapper: StoryBookProviders });
  });
});
