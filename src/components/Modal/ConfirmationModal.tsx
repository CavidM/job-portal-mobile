import {
  Button, Modal, Text
} from 'native-base';
import React from 'react';
import { ThemeContextType, useTheme } from '../../core/theme/Theme';
import useFontStyles from '../common/font.style';

export interface ConfirmationModalProps{
    confirmText: string,
    closeText: string,
    isOpen: boolean,
    onClose: () => void
    onConfirm: ()=> void,
    modalHeaderText?: string
}

export const ConfirmationModal = (props: ConfirmationModalProps) => {
  const {
    confirmText,
    closeText,
    isOpen,
    onClose,
    onConfirm,
    modalHeaderText
  } = props;
  const { theme } = useTheme() as ThemeContextType;
  const { color } = theme.palette;
  const fontStyle = useFontStyles();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      overlayVisible
      backdropVisible
    >
      <Modal.Content
        borderRadius={16}
        paddingLeft={0}
        py={7}
        alignItems="center"
        justifyContent="center"
      >
        <Modal.Header paddingRight={0} paddingBottom={4}>
          <Text style={[fontStyle.fontFamilyInterMedium, { fontSize: 13 }]}>
            {modalHeaderText}
          </Text>
        </Modal.Header>
        <Modal.Footer paddingRight={0} paddingBottom={0}>
          <Button.Group space={3}>
            <Button
              onPress={onConfirm}
              backgroundColor={color.primary}
              width={134}
              borderRadius={10}
              py={0}
              height={45}
            >
              <Text
                color={color.white}
                style={[fontStyle.fontFamilyInterRegular, { fontSize: 14 }]}
              >
                {confirmText}
              </Text>
            </Button>
            <Button
              onPress={onClose}
              borderColor={color.danger}
              borderWidth={2}
              borderRadius={10}
              width={134}
              py={0}
              height={45}
              variant="outline"
            >
              <Text
                style={[fontStyle.fontFamilyInterRegular, { fontSize: 14 }]}
                color={color.danger}
              >
                {closeText}
              </Text>
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>

  );
};
