import React from 'react';
import {
  VStack, Input, Icon, IInputProps, Box
} from 'native-base';
import { View } from 'react-native';
import { ThemeContextType, useTheme } from '../../core/theme/Theme';
import SearchIcon from '../Icons/SearchIcon';

interface searchBarBaseProps extends IInputProps, React.RefAttributes<unknown>{
  placeholder: string;
}
export const SearchBar = (props: searchBarBaseProps) => {
  const { theme } = useTheme() as ThemeContextType;
  const {
    placeholder, ...rest
  } = props;

  return (
    <VStack>
      <Box>
        <Input
          _focus={{ borderColor: theme.palette.color.inputBorderColor }}
          placeholder={placeholder}
          bg="#fff"
          borderRadius={6}
          px={2}
          fontSize={14}
          InputLeftElement={(
            <Icon
              size="sm"
              m={2}
              color="gray.400"
              as={
                <View style={{ paddingLeft: 12 }}><SearchIcon /></View>
          }
            />
)}
          {...rest}
        />
      </Box>
    </VStack>
  );
};
