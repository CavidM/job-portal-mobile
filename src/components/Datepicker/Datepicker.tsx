import React, {
  useEffect, useState
} from 'react';
import {
  View, Platform, TouchableOpacity, Keyboard
} from 'react-native';
import DateTimePicker, {
  AndroidNativeProps,
  BaseProps,
  IOSNativeProps, WindowsNativeProps
} from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Input, { InputProps } from '../Input/Input';
import ModalComponent from '../Modal/ModalComponent';

// @TD do not need to extend all platforms. should be union type.
export interface DatepickerProps extends
  IOSNativeProps, AndroidNativeProps, WindowsNativeProps {
  placeholder: string,
  error?: boolean,
  errorMessage?: string
  onChange: (date: string) => void,
  style?: any,
  isOpen: boolean,
  openWith: (showMode: () => void) => React.ReactNode | undefined,
  minimumDate?: Date,
  inputProps?: InputProps
}

const Datepicker: React.FC<DatepickerProps> = (props) => {
  const {
    placeholder, error, errorMessage, style, inputProps,
    mode, display, isOpen, openWith, minimumDate
  } = props;
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const isPlatformIOS = Platform.OS === 'ios';
  useEffect(() => {
    props.onChange(selectedDate ? moment(selectedDate).format('YYYY-MM-DD') : '');
  }, [selectedDate]);

  useEffect(() => {
    if (isOpen) {
      showMode();
    }
  }, [isOpen]);

  const onChange = (event: any, value: any) => {
    const currentDate = value || date;
    setShow(isPlatformIOS);
    setSelectedDate(value);
    setDate((currentDate));
  };

  const showMode = () => {
    if (isPlatformIOS) {
      setModalVisible(!modalVisible);
    } else { setShow(true); }
  };

  const onCloseModal = () => {
    setModalVisible(false);
  };
  const value = selectedDate ? moment(selectedDate).format('YYYY-MM-DD') : '';

  // @TD need to clarify type definition for pickerProps
  const pickerProps: BaseProps = {
    value: date,
    mode: mode || 'date',
    is24Hour: true,
    display: display || 'spinner',
    onChange,
    minimumDate
  };

  return (
    <View style={style} onTouchStart={Keyboard.dismiss}>
      {
        openWith ? openWith(showMode)
          : (
            <TouchableOpacity onPress={showMode}>
              <Input
                style={style}
                error={error}
                errorMessage={errorMessage}
                placeholder={placeholder}
                value={value}
                editable={false}
                pointerEvents="none"
                {...inputProps}
              />
            </TouchableOpacity>
          )
      }
      {!isPlatformIOS ? (
        show && (
          <DateTimePicker
            {...pickerProps}
            display="spinner"
            themeVariant="light"
          />
        )
      )
        : (
          <ModalComponent
            onCloseModal={onCloseModal}
            isModalVisible={modalVisible}
          >
            <DateTimePicker
              textColor="black"
              {...pickerProps}
            />
          </ModalComponent>
        )}
    </View>
  );
};
export default Datepicker;
