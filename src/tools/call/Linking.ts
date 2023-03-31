import { Alert, Linking, Platform } from 'react-native';

// Function to make phone call
export const Call = (mobileNo: string) => {
  let phoneNumber = mobileNo;
  if (Platform.OS !== 'android') {
    phoneNumber = `telprompt:${mobileNo}`;
  } else {
    phoneNumber = `tel:${mobileNo}`;
  }
  Linking.canOpenURL(phoneNumber)
  // eslint-disable-next-line consistent-return
    .then((supported) => {
      if (!supported) {
        Alert.alert('Number is not available');
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch((err) => console.log(err));
};

// Function to email
export const Email = (emailAddress: string) => {
  let email = emailAddress;
  email = `mailto:${emailAddress}`;
  Linking.canOpenURL(email)
  // eslint-disable-next-line consistent-return
    .then((supported) => {
      if (!supported) {
        Alert.alert('Email is not available');
      } else {
        return Linking.openURL(email);
      }
    })
    .catch((err) => console.log(err));
};
