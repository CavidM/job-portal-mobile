import React, { useEffect, useState } from 'react';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';
import Toast from 'react-native-root-toast';
import ImagePickerComponent from '../../../components/ImagePicker/ImagePickerComponent';
import { UserPhotoEditAvatar } from '../../../components/Avatar/UserPhotoEditAvatar';
import { UserPhotoService } from '../../../services/user-photo-service/UserPhoto.service';
import { ThemeContextType, useTheme } from '../../../core/theme/Theme';
import {saveUserPhotoToRedux} from "../../../store/slices/userInfo";
import {useDispatch} from "react-redux";
import {IconProps} from "../../../core/models/Icon.model";

interface UserPhotoUploadContainerProps {
  defaultImage?: ImageInfo | unknown;
  iconProps?: IconProps
}

export const UserPhotoUploadContainer = (props: UserPhotoUploadContainerProps) => {
  const { defaultImage, iconProps } = props;
  const [image, setImage] = useState<ImageInfo | unknown>(defaultImage);
  const userPhotoService = UserPhotoService();
  const useSaveUserPhoto = userPhotoService.useSaveUserPhoto();
  const useDeleteUserPhoto = userPhotoService.useDeleteUserPhoto();
  const { theme } = useTheme() as ThemeContextType;
  const dispatch = useDispatch();

  useEffect(() => {
    setImage(defaultImage);
  }, [defaultImage]);

  const onImageLoad = async (uploadedImage: ImageInfo) => {
    try {
      const res = await useSaveUserPhoto.mutateAsync(uploadedImage.uri);
      setImage(uploadedImage.uri);
      dispatch(saveUserPhotoToRedux(uploadedImage.uri))
      return res;
    } catch (e) {
      Toast.show('Photo could not saved', {
        backgroundColor: theme.palette.color.danger,
        duration: Toast.durations.LONG
      });
      setImage(null);
    }
  };

  const onDeleteUserPhoto = async () => {
    try {
      await useDeleteUserPhoto.mutateAsync();
      setImage(null);
      dispatch(saveUserPhotoToRedux(null))
    } catch (e) {
      Toast.show('Photo could not delete, try again', {
        backgroundColor: theme.palette.color.danger,
        duration: Toast.durations.LONG
      });
    }
  };

  return (
    <ImagePickerComponent
      image={image}
      onImageLoad={onImageLoad}
      onDeleteImage={onDeleteUserPhoto}
      renderImage={(image, onclick) => (
        <UserPhotoEditAvatar image={image} onPress={onclick} iconProps={iconProps} />
      )}
    />
  );
};
