import { useNavigation } from '@react-navigation/core';
import React, { createRef, useState } from 'react';
import { WebView } from 'react-native-webview';
import { useToast } from 'native-base';
import { AuthService } from '../../services/auth-service/Auth.service';
import { useAuthentication } from '../../hooks/authentication/useAuthentication';
import normalize from '../common/styles/normalize';

export const AsanLoginContainer = () => {
  const CHECK_COOKIE: string = `
  ReactNativeWebView.postMessage("Cookie: " + document.cookie);
  true;
`;

  const [flag, setFlag] = useState(false);

  const { mutate } = AuthService().useLoginViaAsan();
  const toast = useToast();

  const { saveNewVerifiedToken } = useAuthentication();

  const navigation = useNavigation();
  const webViewRef = createRef<WebView>();
  const jsCode = 'ReactNativeWebView.postMessage(document.cookie)';

  const goback = () => {
    webViewRef.current.goBack();
  };

  const onMessage = (event) => {
    const { data } = event.nativeEvent;
    if (data.includes('token')) {
      if (!flag) {
        mutate({
          asanToken: data.substring(data.indexOf('ey'))
        }, {
          onSuccess: (data) => {
            saveNewVerifiedToken(data.data.data);
            navigation.navigate('Home');
          },
          onError(err: any) {
            if (err.response?.status === 400) {
              toast.show({
                placement: 'bottom',
                title: 'Bu Asan Imza ilə istifadəçi tapılmadı.',
                status: 'error',
                width: normalize(324)
              });
              // navigation.goBack();
            }
          }
        });
      }
      setFlag(true);
    }
  };

  return (
    <WebView
      ref={webViewRef}
      javaScriptEnabled
      injectedJavaScript={jsCode}
      onMessage={onMessage}
      onNavigationStateChange={(navigationState) => {
        if (navigationState.url === 'https://asanlogin.my.gov.az/auth') {
          navigation.goBack();
          toast.show({
            placement: 'bottom',
            title: 'Asan Loqin imkanlarından sadəcə Asan İmza ilə daxil olmaq mümkündür',
            status: 'error',
            width: normalize(324)
          });
        }
        if (webViewRef.current) {
          webViewRef.current.injectJavaScript(CHECK_COOKIE);
        }
      }}
      source={{ uri: 'https://asanlogin.my.gov.az/auth/with-asan-login' }}
    />
  );
};
