import React from 'react';
import {
  View, TouchableOpacity
} from 'react-native';
import useStyles from '../ImagePicker/ImagePicker.style';
import { UserPhotoAvatar } from './UserPhotoAvatar';
import PlusIcon from '../Icons/PlusIcon';
import { EditIcon } from '../Icons/EditIcon';
import normalize from '../../pages/common/styles/normalize';
import {IconProps} from "../../core/models/Icon.model";

interface ImagePickerProps {
  onPress?: () => void,
  image?: any,
  iconProps?: IconProps
}

export const UserPhotoEditAvatar: React.FC<ImagePickerProps> = (props) => {
  const styles = useStyles();
  const {
    onPress,
    image,
    iconProps
  } = props;

  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <UserPhotoAvatar image={image} iconProps={iconProps} />
        <View style={styles.plusIcon}>
          {
            image
              ? (
                <View style={{ position: 'relative', top: normalize(-7) }}>
                  <EditIcon />
                </View>
              )
              : <PlusIcon />
          }
        </View>
      </TouchableOpacity>
    </View>
  );
};
