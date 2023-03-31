// Container for Orders' card

import React from 'react';
import {
  TouchableOpacityProps, View
} from 'react-native';
import useStyles from '../../../../../components/Card/CardList.style';
import { CustomerOrdersCardItem } from './CustomerOrdersCardItem';

interface CardProps extends TouchableOpacityProps {
  data?: any,
  children?: React.ReactNode,
  backgroundColor?: string,
  withDetailedContent: boolean,
  countOfPerson?: number
}
export const CustomerOrdersCardList: React.FC<CardProps> = (props) => {
  const styles = useStyles();
  const {
    data,
    children,
    backgroundColor,
    withDetailedContent,
    countOfPerson
  } = props;
  return (
    <View style={[styles.card, styles.cardOrders, { backgroundColor }]}>
      <View style={styles.cardListWrapper}>
        <CustomerOrdersCardItem
          key={data?.id}
          {...data}
          withDetailedContent={withDetailedContent}
          countOfPerson={countOfPerson}
        >
          {children}
        </CustomerOrdersCardItem>
      </View>
    </View>
  );
};
