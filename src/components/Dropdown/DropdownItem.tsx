import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import useStyles from './Dropdown.styles';
import useFontStyles from '../common/font.style';

export interface DropdownItemProps {
  label?: any,
  selected?: any,
  additionalLabel?: React.ReactNode,
  onPress?: () => void,
  paddingBottom: number
}
export const DropdownItem: React.FC<DropdownItemProps> = (props) => {
  const {
    label, selected, additionalLabel, paddingBottom, ...rest
  } = props;
  const styles = useStyles();
  const fontStyle = useFontStyles();
  const DropdownItemStyle: [Object] = [styles.DropdownItem];

  if (selected) {
    DropdownItemStyle.push(styles.DropdownItemSelected);
  }
  return (
    <TouchableWithoutFeedback {...rest}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={[
          DropdownItemStyle,
          fontStyle.fontFamilyInterMedium,
          { paddingBottom: paddingBottom || 0 }
        ]}
        >
          {label}
        </Text>
        <View style={styles.DropdownItem}>
          { additionalLabel }
        </View>

      </View>
    </TouchableWithoutFeedback>
  );
};
export const DropdownWrapper = ({ children }:any) => (
  <View>
    {children}
  </View>

);
