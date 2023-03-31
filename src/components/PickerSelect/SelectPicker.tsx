/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  View
} from 'react-native';
import { Picker, PickerProps } from '@react-native-picker/picker';
import ValidationComponent from '../Validation/ValidationComponent';
import useStyles from '../Input/Input.style';

// @todo refactor styles, add error icon

interface SelectPickerType extends PickerProps{
  items: any;
  placeholder: string;
  error?: boolean;
  errorMessage?: string;
  style?: any
}

const SelectPicker = (props: SelectPickerType) => {
  const {
    items,
    placeholder,
    style,
    error,
    errorMessage,
    ...rest
  } = props;

  const styles = useStyles();

  const inputStyle: [Object] = [styles.selectPickerWrapper];

  if (error) {
    inputStyle.push({ borderBottomColor: 'red' });
  }

  return (
    <View style={style}>
      <View style={inputStyle}>
        <Picker
          mode="dropdown"
          testID={`select-picker-${placeholder}`}
          {...rest}
          style={{ marginLeft: -8 }}
        >
          <Picker.Item label={placeholder} value="" enabled={false} style={{ ...styles.input, ...styles.selectPickerPlaceholder }} />
          {
            items.map((item:any) => (
              <Picker.Item
                label={item.label}
                value={item.value}
                key={item.value}
                style={styles.input}
              />
            ))
          }
        </Picker>
      </View>
      {
        error
        && (
        <ValidationComponent errorMessage={errorMessage} />
        )
      }
    </View>
  );
};

export default SelectPicker;
