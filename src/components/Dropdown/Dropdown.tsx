import React, { useEffect, useState } from 'react';
import {
  LayoutAnimation,
  Platform, TouchableOpacity,
  UIManager,
  View
} from 'react-native';
import DropdownIcon from '../Icons/DropdownIcon';
import useStyles from './Dropdown.styles';
import Input, { InputProps } from '../Input/Input';

export interface DropdownProps extends InputProps{
  data: any,
  render: any,
  onSelected: (i: any) => void
}
export const Dropdown: React.FC<DropdownProps> = (props) => {
  const {
    data,
    render,
    onSelected,
    ...rest
  } = props;
  const [isDropdownOpened, setIsDropdownOpened] = useState(true);
  const [selectedItemKey, setSelectedItemKey] = useState('');
  const [selectedItemLabel, setSelectedItemLabel] = useState('');
  const onClickItem = (value: any) => {
    setSelectedItemKey(value.key);
    setSelectedItemLabel(value.label);
    setIsDropdownOpened(!isDropdownOpened);
  };

  useEffect(() => {
    onSelected(selectedItemKey);
  }, [selectedItemKey]);
  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsDropdownOpened(!isDropdownOpened);
  };
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  const styles = useStyles();
  const paddingBottom = 32;
  return (
    <View>
      <TouchableOpacity onPress={toggleExpand}>
        <Input
          value={selectedItemLabel}
          editable={false}
          pointerEvents="none"
          icon={isDropdownOpened ? (
            <View style={{ transform: [{ rotate: '-90deg' }] }}>
              <DropdownIcon />
            </View>
          )
            : <DropdownIcon />}
          {...rest}
        />
      </TouchableOpacity>

      {
        !isDropdownOpened && (
          <View style={styles.Dropdown}>
            {data.map((item: any, i: number) => render(
              item,
              onClickItem,
              selectedItemKey,
              i === data.length - 1 && paddingBottom
            ))}
          </View>
        )
      }

    </View>

  );
};
