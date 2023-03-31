import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { ThemeContextType, useTheme } from '../../core/theme/Theme';
import XIcon from '../Icons/XIcon';

interface ClearSearchButtonProps extends TouchableOpacityProps {
}
export const ClearSearchButton: React.FC<ClearSearchButtonProps> = (props) => {
  const { theme } = useTheme() as ThemeContextType;
  const { ...rest } = props;
  return (
    <TouchableOpacity
      style={{
        borderRadius: 100 / 2,
        backgroundColor: theme.palette.color.bgGray,
        width: 38,
        height: 38,
        alignItems: 'center',
        justifyContent: 'center'
      }}
      {...rest}
    >
      <View>
        <XIcon />
      </View>
    </TouchableOpacity>
  );
};
