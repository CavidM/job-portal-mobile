import { Text, View } from 'react-native';
import React from 'react';
import useStyles from '../CardList.style';
import useFontStyles from '../../common/font.style';

export interface CardListItemProps {
  key?: string
  value?: string
  label?: string
}

export const CardListProfileItem = (props: CardListItemProps) => {
  const styles = useStyles();
  const fontStyle = useFontStyles();

  const { value, label } = props;

  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={[styles.cardListLabel, fontStyle.fontFamilyInterRegular]}>{label}</Text>
      <Text style={[styles.cardListValue, fontStyle.fontFamilyInterRegular]}>{value}</Text>
    </View>
  );
};
