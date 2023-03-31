import { StyleSheet } from 'react-native';
import normalize from '../styles/normalize';

export const useOtpPageStyle = () => StyleSheet.create({

  pageTitle: {
    fontSize: normalize(17),
    fontStyle: 'normal',
    textAlign: 'center',
    marginTop: normalize(71)
  },
  OtpHeading: {
    fontSize: normalize(17)
  },
  OtpItemSpacing: {
    marginTop: normalize(40),
    marginBottom: normalize(30)
  },
  OtpContentContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  OtpPageWrapper: {
    alignItems: 'center',
    height: '70%',
    justifyContent: 'center'
  },
  OtpButton: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: normalize(18)
  }
});
