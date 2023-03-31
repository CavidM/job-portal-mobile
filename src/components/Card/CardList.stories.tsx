import { storiesOf } from '@storybook/react-native';
import React from 'react';
import CenterView from '../CenterView/CenterView';
import Card from './CardProfile/CardListProfile';
import { CustomerOrdersCardList } from '../../pages/customer-screens/service-order/customerOrders/CustomerOrdersCard/CustomerOrdersCardList';

export const CardStoryDefault = () => <Card data={data} />;
const orders = [{
  jobType: 'Master/Plumber',
  created: '20/01/2021',
  description: 'Lorem ipsum janoz narelo munca ksd nuda kilorado msnids dklawokdl nkdlwanwjlndj ndklanwdk knitodr...',
  id: '2239022',
  status: 'Canceled'

}];
const data = [
  {
    label: 'City',
    value: 'Baku',
    key: 1
  }
];
storiesOf('CardListProfileInformation', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('CardListProfile', () => <CardStoryDefault />)
  .add('CustomerOrdersCard', () => <CustomerOrdersCardList data={orders} />);
