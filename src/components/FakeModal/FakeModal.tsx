import { Box, Center } from 'native-base';
import React from 'react';
import { ViewStyle } from 'react-native';
import { FakeModalStyle } from './FakeModal.style';

interface FakeModalProps {
  children: React.ReactNode
  modalWrapperStyle?: ViewStyle
  bodyWrapperStyle?: ViewStyle
}

export const FakeModal = (props: FakeModalProps) => {
  const styles = FakeModalStyle();
  const { children, modalWrapperStyle, bodyWrapperStyle } = props;

  return (
    <Center style={[styles.modalWrapper, modalWrapperStyle]}>
      <Box style={[styles.bodyWrapper, bodyWrapperStyle]}>
        {children}
      </Box>
    </Center>
  );
};
