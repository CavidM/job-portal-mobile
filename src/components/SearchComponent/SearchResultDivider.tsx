import React from 'react';
import {
  Text,
  TouchableOpacity, TouchableWithoutFeedbackProps, View
} from 'react-native';
import useFontStyles from '../common/font.style';
import useStyles from './SearchComponents.style';

export interface SearchResultDividerProps extends TouchableWithoutFeedbackProps {
  text: string,
  style?: any
}

export const SearchResultDivider: React.FC<SearchResultDividerProps> = (props) => {
  const {
    text,
    ...restProps
  } = props;
  const styles = useStyles();
  const fontStyle = useFontStyles();
  return (
    <TouchableOpacity {...restProps}>
      <View style={styles.searchResultDividerWrapper}>
        <Text style={[styles.searchResultDivider, fontStyle.fontFamilyInterMedium]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>

  );
};
