// Container for Orders' card

import React from 'react';
import {
  TouchableOpacityProps, View
} from 'react-native';
import useStyles from '../../../../components/Card/CardList.style';
import { ApplicantOrdersCardItem } from './ApplicantOrdersCadItem';

interface CardProps extends TouchableOpacityProps {
    data?: any,
    children?: React.ReactNode,
    backgroundColor?: string,
    withDetailedContent: boolean
}
export const ApplicantOrdersCardList: React.FC<CardProps> = (props) => {
  const styles = useStyles();
  const {
    data,
    children,
    backgroundColor,
    withDetailedContent
  } = props;
  return (
    <View style={[styles.card, styles.cardOrders, { backgroundColor }]}>
      <View style={styles.cardListWrapper}>
        <ApplicantOrdersCardItem
          key={data?.id}
          {...data}
          withDetailedContent={withDetailedContent}
        >
          {children}
        </ApplicantOrdersCardItem>
      </View>
    </View>
  );
};
