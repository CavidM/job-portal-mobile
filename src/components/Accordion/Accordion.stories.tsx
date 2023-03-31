import { storiesOf } from '@storybook/react-native';
import React from 'react';
import CenterView from '../CenterView/CenterView';
import Accordion from './Accordion';
import CardListProfile from '../Card/CardProfile/CardListProfile';

const menu = [
  {
    label: 'City',
    value: 'Baku',
    key: 1
  }
];

export const AccordionStoryDefault = () => (
  <Accordion style={{ width: '90%' }} title="Information">
    <CardListProfile data={menu} />
  </Accordion>
);

storiesOf('Accordion', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Accordion', () => <AccordionStoryDefault />);
