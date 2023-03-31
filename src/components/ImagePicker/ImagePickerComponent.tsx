import React, { useEffect, useState } from 'react';
import {
  Alert,
  Platform,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';
import CameraIcon from '../Icons/CameraIcon';
import GalleryIcon from '../Icons/GalleryIcon';
import useStyles from './ImagePicker.style';
import ModalComponent from '../Modal/ModalComponent';
import useFontStyles from '../common/font.style';
import ErrorIcon from '../Icons/ErrorIcon';

type imageType = ImageInfo | unknown

interface ImagePickerComponentProps {
  onImageLoad: (image: ImageInfo) => void;
  image: imageType;
  renderImage: (image: imageType, onClick: () => void) => React.ReactNode;
  onDeleteImage?: () => void;
}

export default function ImagePickerComponent(props: ImagePickerComponentProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const styles = useStyles();
  const fontStyle = useFontStyles();
  const [count, setCount] = useState(0);
  const {
    onImageLoad,
    image,
    renderImage,
    onDeleteImage
  } = props;

  useEffect(() => {
    setModalVisible(false);
  }, [image]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web' && count) {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, [count]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.cancelled) {
      onImageLoad(result);
    }
    setModalVisible(false);
  };

  const takeImage = async () => {
    setCount(count + 1);

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true
    });
    if (!result.cancelled) {
      onImageLoad(result);
    }
    setModalVisible(false);
  };
  const onCloseModal = () => {
    setModalVisible(false);
  };
  return (
    <View>
      <ModalComponent
        onCloseModal={onCloseModal}
        isModalVisible={modalVisible}
      >
        <TouchableOpacity
          onPress={takeImage}
        >
          <View style={styles.options}>
            <CameraIcon />
            <Text style={[styles.textStyle, fontStyle.fontFamilyInterRegular]}>
              Kameradan çəkin
            </Text>
          </View>

        </TouchableOpacity>
        <TouchableOpacity
          onPress={pickImage}
        >
          <View style={styles.options}>
            <GalleryIcon />
            <Text style={[styles.textStyle, fontStyle.fontFamilyInterRegular]}>
              Qalereyadan seçin
            </Text>
          </View>
        </TouchableOpacity>

        {
          image
          && (
            <TouchableOpacity
              onPress={onDeleteImage}
            >
              <View style={styles.options}>
                <ErrorIcon />
                <Text style={[styles.textStyle, fontStyle.fontFamilyInterRegular]}>
                  Şəkli silin
                </Text>
              </View>
            </TouchableOpacity>
          )
        }

      </ModalComponent>

      {
        renderImage(image, () => setModalVisible(true))
      }

    </View>
  );
}
