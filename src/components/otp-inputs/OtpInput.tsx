import React, { CSSProperties, useEffect, useState } from 'react';
import {
  StyleSheet, TextInput, TextInputProps, View
} from 'react-native';
import useFontStyles from '../common/font.style';
import useStyles from './OtpInputs.style';

// @TODO refactor this module partial or whole

interface OtpInputProps extends TextInputProps {
  getOtp: (otp: string) => void,
  disabled?: boolean
}

export default function OtpInput(props: OtpInputProps) {
  const [otp, setOtp] = useState([]);
  const [otpTextInput, setOtpTextInput] = useState([]);
  const styles = useStyles();
  const fontStyle = useFontStyles();

  const { getOtp, disabled, ...rest } = props;

  const inputStyle: [CSSProperties] = [styles.input];
  const inputContainerStyle: [Object] = [styles.containerInput];

  useEffect(() => {
    otpTextInput[0].focus();

    return () => {
      setOtp([]);
    };
  }, []);

  let editable = true;

  if (disabled) {
    editable = false;
    inputStyle.push({
      backgroundColor: '#E5E5E5'
    });
  }

  const renderInputs = () => {
    const inputs = Array(4).fill(0);
    const txt = inputs.map(
      (i, j) => (

        <TextInput
          accessible
          accessibilityLabel={`otp-input-${j}`}
          accessibilityState={{ disabled: !editable }}
          key={j}
          style={[inputStyle, fontStyle.fontFamilyInterRegular]}
          keyboardType="numeric"
          editable={editable}
          maxLength={1}
          onChangeText={(v) => focusNext(j, v)}
          // onEndEditing={(e) => console.log('tt: ', e.currentTarget)}
          // onTextInput={(e) => console.log('pressssed')}
          onKeyPress={(e) => focusPrevious(e.nativeEvent.key, j)}
          ref={(ref) => otpTextInput[j] = ref}
          {...rest}
        />
      )
    );
    return txt;
  };

  const focusPrevious = (key, index) => {
    if (key === 'Backspace' && index !== 0) otpTextInput[index - 1].focus();
  };

  const focusNext = (index, value) => {
    if (index < otpTextInput.length - 1 && value) {
      otpTextInput[index + 1].focus();
    }
    if (index === otpTextInput.length - 1) {
      otpTextInput[index].blur();
    }
    const newOtp = otp;
    newOtp[index] = value;
    setOtp(newOtp);
    getOtp(otp.join(''));
  };

  return (
    <View style={inputContainerStyle}>
      {renderInputs()}
    </View>
  );
}

// const styles = StyleSheet.create({
//   gridPad: { padding: 30 },
//   txtMargin: { margin: 3 },
//   inputRadius: {
//     height: 69,
//     width: 69,
//     marginEnd: 10,
//     borderWidth: 1,
//     borderRadius: 5,
//     borderColor: '#999',
//     fontSize: 35,
//     textAlign: 'center',
//     paddingTop: 10,
//     fontWeight: '400',
//     alignSelf: 'center'
//   }
// });
