import React, { createRef, useState, useRef } from 'react';
import { WebView } from 'react-native-webview';

import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { useToast } from 'native-base';
import { UserService } from '../../services/user-service/User.service';
import { setUserInfo } from '../../store/slices/userInfoViaAsan.slice';
import { RegistrationContextType, useRegistration } from '../../context/Registration.context';
import {
  setFlowType, setAsanRegistered, setIsBirthdayInputShow
} from '../../store/slices/registrationFlow.slice';
import normalize from '../common/styles/normalize';

export const AsanRegisterContainer = () => {
  const CHECK_COOKIE: string = `
  ReactNativeWebView.postMessage("Cookie: " + document.cookie);
  true;
`;

  const [flag, setFlag] = useState(false);
  const { mutate, error } = UserService().useRegisterViaAsan();
  const dispatch = useDispatch();
  const { saveFin } = useRegistration() as RegistrationContextType;
  const { userType } = useRegistration() as RegistrationContextType;

  const webViewRef = createRef<WebView>();
  const jsCode = 'ReactNativeWebView.postMessage(document.cookie)';

  const toast = useToast();

  const navigation = useNavigation();

  // const webViewRef = useRef(null);

  const goback = () => {
    webViewRef.current.goBack();
  };

  // const fdghjm = useSelector(registrationFlowSelectors.getAsanRegistered);

  // console.log(fdghjm);

  // React.useEffect(() => {
  //   console.log('isSuccess', isSuccess);
  //   if (isSuccess) navigation.navigate('RegisterAfterVerification', { screen: 'GeneralInformation' });
  // }, [isSuccess]);

  // const asanRegistered = useSelector(registrationFlowSelectors.getAsanRegistered);

  const onMessage = (event) => {
    const { data } = event.nativeEvent;
    if (data.includes('token')) {
      let token = data.slice(data.indexOf('ey'), data.length);
      if (token.indexOf(';') !== -1) {
        token = token.substring(0, token.indexOf(';'));
      }
      if (!flag) {
        mutate({
          asanToken: token,
          authorityName: userType
        }, {
          onSuccess: (data) => {
            dispatch(setUserInfo(data.data.data));
            // dispatch(setFlowType('asan'));
            // dispatch(setAsanRegistered(true));
            saveFin(data.data.data.fin);
            dispatch(setIsBirthdayInputShow(true));
            navigation.navigate('RegisterAfterVerification', { screen: 'GeneralInformation' });
          },
          onError(err) {
            if (err.response?.status === 409) {
              toast.show({
                placement: 'bottom',
                title: 'Artıq bu istifadəçi məlumatları ilə hesab var.',
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
      onNavigationStateChange={(navigationState) => {
        // console.log(navigationState);
        if (navigationState.url === 'https://asanlogin.my.gov.az/auth') {
          navigation.goBack();
          toast.show({
            placement: 'bottom',
            title: 'Asan Loqin imkanlarından sadəcə Asan İmza ilə daxil olmaq mümkündür',
            status: 'error',
            width: normalize(324)
          });
        }
        if (webViewRef.current && navigationState.url === 'https://asanlogin.my.gov.az/dashboard') {
          webViewRef.current.injectJavaScript(CHECK_COOKIE);
        }
      }}
      onMessage={onMessage}
      source={{ uri: 'https://asanlogin.my.gov.az/auth/with-asan-login' }}
    />
  );
};
