import { getFocusedRouteNameFromRoute, useNavigation, useRoute } from '@react-navigation/native';
import {
  GeneralInformationFormContextType,
  useGeneralInformationContext
} from '../../registration-screens/register-user-with-generalinfo/GeneralInformation.context';
import {
  AppScreens
} from '../../../routes/Navigator.types';
import { useRegisterUserVerificationContext } from '../../registration-screens/register-user-verification/RegisterUserVerification.context';
import { useSpecialInformationContext } from '../../registration-screens/register-user-with-specialinfo/SpecialInformation.context';
import {
  RegistrationContextType,
  useRegistration,
  UserTypeApplicant, UserTypeCustomer
} from '../../../context/Registration.context';
import {setRegistered} from "../../../store/slices/authenticationSlice";
import {useDispatch} from "react-redux";

export const RegistrationSteps = {
  RegisterUserType: 1,
  RegisterUserVerification: 2,
  GeneralInformation: 3,
  SpecialInformation: 4,
  UploadPhoto: 5
};

type useRegistrationStepsReturn = {
  handleOnPressNext: () => void,
  step: number
}

const getRegistrationStep = (routeName: string) => {
  let step;

  switch (routeName) {
    case AppScreens.RegisterUserType: {
      step = RegistrationSteps.RegisterUserType;
      break;
    }
    case AppScreens.RegisterUserVerification: {
      step = RegistrationSteps.RegisterUserVerification;
      break;
    }
    case AppScreens.GeneralInformation: {
      step = RegistrationSteps.GeneralInformation;
      break;
    }
    case AppScreens.SpecialInformation: {
      step = RegistrationSteps.SpecialInformation;
      break;
    }
    case AppScreens.UploadPhoto: {
      step = RegistrationSteps.UploadPhoto;
      break;
    }
    default: {
      step = RegistrationSteps.RegisterUserType;
      break;
    }
  }

  return step;
};

export const useRegistrationSteps = (initialRoute = 'RegisterUserType'): useRegistrationStepsReturn => {
  const route = useRoute();
  const routeName = getFocusedRouteNameFromRoute(route) ?? initialRoute;
  const navigation = useNavigation<any>();

  const {
    onSubmitGeneralInformation
  } = useGeneralInformationContext() as GeneralInformationFormContextType;
  const { onSubmitSpecialInformation } = useSpecialInformationContext();
  const { userType } = useRegistration() as RegistrationContextType;

  const { onSubmit } = useRegisterUserVerificationContext();

  const dispatch = useDispatch()

  const handleOnPressNext = () => {
    switch (routeName) {
      case AppScreens.RegisterUserType: {
        navigation.navigate(AppScreens.RegisterUserVerification);
        break;
      }
      case AppScreens.RegisterUserVerification: {
        onSubmit(navigation);
        break;
      }
      case AppScreens.GeneralInformation: {
        onSubmitGeneralInformation(navigation);
        break;
      }
      case AppScreens.SpecialInformation: {
        onSubmitSpecialInformation(navigation);
        break;
      }
      case AppScreens.UploadPhoto: {
          dispatch(setRegistered())
        switch (userType) {
          case UserTypeApplicant: {
            setTimeout(() => {
              navigation.navigate(AppScreens.Home, { screen: AppScreens.ApplicantScreen })
            }, 300)

            break;
          }
          case UserTypeCustomer: {
            setTimeout(() => {
              navigation.navigate(AppScreens.Home, { screen: AppScreens.CustomerScreen })
            }, 300)
            break;
          }
          default: {
            throw new Error('Unknown user type');
          }
        }
        break;
      }
      default: {
        break;
      }
    }
  };

  const step = getRegistrationStep(routeName);

  return { handleOnPressNext, step };
};
