import React, {
  useState, useRef, useEffect, useCallback
} from 'react';
import {
  TextInputProps, TextInput, View, Text
} from 'react-native';
import useFontStyles from '../common/font.style';
import useStyles from './OtpInputs.style';

interface InputProps extends TextInputProps { }

const OtpInput: React.FC<InputProps> = () => {
  // @TODO textInput ref issue
  const textInput = useRef(null);
  const lengthInput = 4;
  const [internalVal, setInternalVal] = useState('');

  const onChangeText = (val: string) => {
    setInternalVal(val);
  };

  useEffect(() => {
    textInput.current.focus();
  }, []);
  const styles = useStyles();
  const fontStyle = useFontStyles();

  const inputStyle: [Object] = [styles.input];
  const inputContainerStyle: [Object] = [styles.containerInput];

  const onPressInput = () => {
    textInput.current.focus();
  };

  return (
    <View>
      <TextInput
        autoFocus
        ref={textInput}
        blurOnSubmit={false}
        onChangeText={onChangeText}
        style={fontStyle.fontFamilyInterRegular}
        value={internalVal}
        maxLength={lengthInput}
        returnKeyType="next"
        focusable
        keyboardType="numeric"
      />
      <View style={inputContainerStyle}>
        {Array(lengthInput).fill(lengthInput).map((data, index) => (

          <Text key={index} style={[inputStyle, fontStyle.fontFamilyInterRegular]} onPress={onPressInput}>
            {internalVal && internalVal.length > 0 ? internalVal[index] : ''}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default OtpInput;
