import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet, View
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useDispatch } from 'react-redux';
import Logo from '../../assets/mol-logo-v2.svg';
import Button from '../../components/button/Button';
import normalize from '../common/styles/normalize';
import LoginUserPage from '../login-user/LoginUser.page';
import { setRegistered } from '../../store/slices/authenticationSlice';

const defaultOnPressSignup = () => { };
const defaultOnPressLogin = () => { };

interface EntryAuthPageProps {
  onPressSignup?: typeof defaultOnPressSignup;
  onPressLogin?: typeof defaultOnPressLogin;
  errors?: any,
  formData?: any,
  onChange?: any
}

export default function EntryAuthPage({
  onPressSignup = defaultOnPressSignup,
  onPressLogin = defaultOnPressLogin,
  errors, formData, onChange

}: EntryAuthPageProps) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Logo style={styles.logo} />
      <View style={styles.buttonsWrapper}>
        <View style={[{ maxHeight: normalize(200), marginTop: normalize((30)) }, styles.container]}>
          <LoginUserPage errors={errors} formData={formData} onChange={onChange} />
        </View>
        <Button
          style={styles.resetMarginBottom}
          size="sm"
          variant="default"
          onPress={onPressSignup}
          title="Qeydiyyatdan keç"
        />
        <Button
          style={styles.resetMarginBottom}
          variant="primary"
          onPress={onPressLogin}
          title="Daxil ol"
          size="sm"
        />
        {
          Platform.OS === 'ios' && (
            <Button
              style={styles.resetMarginBottom}
              variant="primary"
              onPress={() => { navigation.navigate('AsanLogin1'); dispatch(setRegistered()); }}
              size="sm"
              color="#2678D8"
              title="Asan imza ilə davam et"
            />
          )
        }
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  logo: {
    width: normalize(209),
    height: normalize(209)
  },
  buttonsWrapper: {
    bottom: normalize(41)
  },
  resetMarginBottom: {
    marginBottom: 0
  }
});
