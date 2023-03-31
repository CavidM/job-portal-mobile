import { Image } from 'react-native';
import React from 'react';
import { useAvatarStyle } from './Avatar.style';
import ProfileIcon from '../Icons/ProfileIcon';
import {IconProps} from "../../core/models/Icon.model";

interface UserPhotoAvatarProps {
  image: string;
  iconProps?: IconProps
}

export const UserPhotoAvatar = (props: UserPhotoAvatarProps) => {
  const { image, iconProps } = props;
  const styles = useAvatarStyle();

  return image
    ? (
      <Image
        source={{ uri: image }}
        style={styles.userAvatar}
      />
    )
    : <ProfileIcon {...iconProps} />;
};
