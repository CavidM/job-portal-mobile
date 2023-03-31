import React, { useRef, useState } from 'react';
import {
  ScrollView, Text, useToast, View
} from 'native-base';
import { TextInput } from 'react-native';
import Button from '../../../components/button/Button';
import normalize from '../styles/normalize';
import useFontStyles from '../../../components/common/font.style';
import { ThemeContextType, useTheme } from '../../../core/theme/Theme';
import { isPlatformIOS } from '../../../core/theme/Constants';
import { SupportService } from '../../../services/supportService';
import Loader from '../../../components/Loader/Loader';

export const SupportPage = () => {
  const fontStyles = useFontStyles();
  const { theme } = useTheme() as ThemeContextType;
  const { color } = theme.palette;
  const toast = useToast();
  const [message, setMessage] = useState<string>('');
  const textRef = useRef();
  const { mutate, isLoading } = SupportService().useContactWithDMA();
  const onPressSendMessageButton = () => {
    mutate(message, {
      onSuccess: (res) => {
        setMessage('');
        textRef?.current?.clear();
        toast.show({
          placement: 'top',
          title: res?.data?.message,
          status: 'success',
          width: normalize(344),
          alignItems: 'center'
        });
      },
      onError: () => {
        toast.show({
          placement: 'top',
          title: 'Xəta baş verdi',
          status: 'error',
          width: normalize(344)
        });
      }
    });
  };

  return (
    <View style={{ backgroundColor: theme.palette.color.checkboxBgColor }}>
      <ScrollView
        mt={3}
        width={normalize(340)}
        alignSelf="center"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text marginY={3} textAlign="center" style={[{ fontSize: normalize(16) }, fontStyles.fontFamilyInterMedium]}>
          Müraciətinizi qeyd edin
        </Text>
        <TextInput
          ref={textRef}
          style={{
            backgroundColor: '#fff',
            height: isPlatformIOS ? normalize(440, 'height')
              : normalize(470, 'height'),
            borderRadius: 6,
            borderWidth: 1,
            borderColor: color.cardBorderColor,
            padding: 10
          }}
          onChangeText={(e) => setMessage(e)}
          multiline
          textAlignVertical="top"
        />
        <Button
          buttonTextStyle={{ fontSize: normalize(14), fontFamily: 'InterMedium' }}
          variant="primary"
          onPress={() => onPressSendMessageButton()}
          title="Göndər"
          size="sm"
          width="100%"
          style={{ alignSelf: 'center', marginTop: normalize(20), backgroundColor: !message.length ? theme.palette.color.muted : color.primary }}
          disabled={!message.length}
        />
      </ScrollView>
      {isLoading && (
        <View style={{
          position: 'absolute', alignItems: 'center', alignSelf: 'center', top: '46%'
        }}
        >
          <Loader />
        </View>
      )}
    </View>
  );
};
