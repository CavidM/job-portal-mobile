import React from 'react';

import {
  View, TouchableOpacity, Modal
} from 'react-native';
import useStyles from './ModalComponent.style';

export interface ModalComponentProps {
  isModalVisible?: boolean,
  onCloseModal?: () => void
}

const ModalComponent: React.FC<ModalComponentProps> = (props) => {
  const styles = useStyles();
  const { isModalVisible, children, onCloseModal } = props;

  return (
    <View>
      <Modal
        transparent
        animationType="slide"
        visible={isModalVisible}
      >
        <View
          style={styles.centeredView}
        >

          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onCloseModal}
            >
              <View style={styles.closeIcon} />

            </TouchableOpacity>
            {children}
          </View>

        </View>
      </Modal>
    </View>
  );
};
export default ModalComponent;
