import React from 'react';
import {
  Divider,
  Box,
  Text, IBoxProps
} from 'native-base';
import { TouchableOpacity } from 'react-native';
import useFontStyles from '../common/font.style';
import { ThemeContextType, useTheme } from '../../core/theme/Theme';

export interface SearchResultDividerBaseProps extends IBoxProps {
  text: string,
  style?: any
}

export const SearchResultDividerBase: React.FC<SearchResultDividerBaseProps > = (props) => {
  const fontStyle = useFontStyles();
  const { theme } = useTheme() as ThemeContextType;

  const {
    text
  } = props;
  return (
    <TouchableOpacity>
      <Box>
        <Text my={4} style={[fontStyle.fontFamilyInterMedium, { fontSize: 14, color: theme.palette.color.dark }]} mx={3} d="flex" alignItems="center" flexDirection="row">
          {text}
        </Text>
        <Divider />
      </Box>
    </TouchableOpacity>

  );
};
