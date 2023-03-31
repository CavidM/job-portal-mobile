import React from 'react';
import {
  TouchableOpacityProps, View
} from 'react-native';
import useStyles from '../CardList.style';
import { CardListProfileItem, CardListItemProps } from './CardListProfileItem';

interface CardProps extends TouchableOpacityProps {
  data?: CardListItemProps[],
  children?: React.ReactNode,
  backgroundColor?: string,
  opacity?: number,
  width?: number | string
}

const CardListProfile: React.FC<CardProps> = (props) => {
  const styles = useStyles();

  const {
    data,
    children,
    backgroundColor,
    opacity,
    width
  } = props;
  return (
    <View style={[styles.card, styles.cardOrders, { backgroundColor, opacity, width }]}>
      <View style={[styles.cardListWrapper]}>
        {children || data?.map((i: any) => (
          <CardListProfileItem key={i.id} {...i} />
        ))}
      </View>

    </View>
  );
};

export default CardListProfile;
