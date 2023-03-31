import { StackNavigationProp } from '@react-navigation/stack';
import {
  NavigatorScreenParams,
  RouteProp
} from '@react-navigation/native';

// Definition application root navigation stack
export type RootStackParamList = {
  // Registration. Entry Authentication screen. First screen shown to anonymous user.
  EntryAuth: undefined;
  // Registration. Stack of screens shown before otp verification
  RegisterBeforeVerification: NavigatorScreenParams<
    RegisterBeforeVerificationStackParamList
  >;
  // Registration. Otp verification screen
  RegisterVerificationOTP: undefined,
  LoginVerificationOTP: undefined,
  GuestsAnnouncements: undefined,
  RegisterAfterVerification: NavigatorScreenParams<RegisterAfterVerificationStackParamList>,
  Home: NavigatorScreenParams<HomeStackParamList>
};

// Definition Screens for {RegisterBeforeVerification}
export type RegisterBeforeVerificationStackParamList = {
  // Clarify user type screen
  RegisterUserType?: undefined;
  // User verification screen
  RegisterUserVerification?: undefined;
}
// Definition Screens for {RegisterAfterVerification}
export type RegisterAfterVerificationStackParamList = {
  GeneralInformation?: undefined;
  SpecialInformation?: undefined;
  UploadPhoto?: undefined
}

export type HomeStackParamList = {
  ApplicantScreen: NavigatorScreenParams<ApplicantScreenStackParamList>,
  CustomerScreen: NavigatorScreenParams<CustomerScreenStackParamList>,
}

// Definition {navigation} property for {EntryAuth} screen
export type EntryAuthScreenNavigationProp = StackNavigationProp<RootStackParamList,
  'EntryAuth'>;
export type ApplicantScreenStackParamList = {
  ApplicantBottomNavigator: undefined,
  ApplicantProfile: undefined,
  ApplicantOrders: undefined,
  ApplicantOrdersDetails: undefined,
  ApplicantEvaluateOrder: undefined,
  ApplicantAnnouncements: undefined,
  FilteredApplicantAnnouncements: undefined,
  ApplicantAnnouncementDetails: undefined,
  ApplicantAnnouncementsFilter: undefined,
  ApplicantNotifications: undefined,
  AnnouncementSpecifications: undefined,
  ApplicantSupportScreen: undefined
}
export type CustomerScreenStackParamList = {
  CustomerProfile: undefined,
  CustomerBottomNavigator: undefined;
  ServiceOrderProfessions?: undefined;
  ServiceOrderSpecifications?: { professionId: number },
  ServiceOrderJobDescription?: undefined,
  ServiceOrderUsersSearchResult: undefined,
  ServiceOrderUsersSearchSchedule: undefined,
  ServiceOrderMapFullScreen: undefined
  ServiceOrderMapSearch: undefined,
  CustomerOrders: undefined,
  CustomerOrdersDetails: undefined
  CustomerNotifications: undefined,
  CustomerAnnouncements: undefined,
  CustomerAnnouncementDetails: undefined,
  CustomerAnnouncementsFilter: undefined,
  CustomerAnnouncementForm: undefined,
  CustomerEvaluateOrder: undefined,
  AddProfessionWithSwitchUserType: undefined,
  CustomerSupportScreen: undefined
}

// Definition for {route} property for {EntryAuth} screen
export type EntryAuthScreenRouteProp = RouteProp<RootStackParamList, 'EntryAuth'>;

export type AppScreensType =
  'EntryAuth'
  | 'RegisterUserType'
  | 'RegisterUserVerification'
  | 'GeneralInformation'
  | 'SpecialInformation'
  | 'UploadPhoto'
  | 'Home'
  | 'GuestsAnnouncements'
  | 'ApplicantBottomNavigator'
  | 'ApplicantOrders'
  | 'ApplicantOrdersDetails'
  | 'ApplicantEvaluateOrder'
  | 'ApplicantProfile'
  | 'ApplicantAnnouncements'
  | 'FilteredApplicantAnnouncements'
  | 'ApplicantAnnouncementDetails'
  | 'ApplicantAnnouncementsFilter'
  | 'ApplicantNotifications'
  | 'CustomerProfile'
  | 'CustomerBottomNavigator'
  | 'CustomerOrders'
  | 'CustomerOrdersDetails'
  | 'ServiceOrderProfessions'
  | 'ServiceOrderSpecifications'
  | 'ServiceOrderJobDescription'
  | 'ServiceOrderUsersSearchResult'
  | 'ServiceOrderUsersSearchSchedule'
  | 'ServiceOrderMap'
  | 'CustomerNotifications'
  | 'CustomerAnnouncements'
  | 'CustomerAnnouncementDetails'
  | 'CustomerAnnouncementsFilter'
  | 'CustomerAnnouncementForm'
  | 'CustomerEvaluateOrder'
  | 'ApplicantSupportScreen'
  | 'CustomerSupportScreen'
  | 'AnnouncementSpecifications'

export const AppScreens = {
  EntryAuth: 'EntryAuth',
  RegisterUserType: 'RegisterUserType',
  RegisterBeforeVerification: 'RegisterBeforeVerification',
  RegisterUserVerification: 'RegisterUserVerification',
  RegisterVerificationOTP: 'RegisterVerificationOTP',
  LoginVerificationOTP: 'LoginVerificationOTP',
  GeneralInformation: 'GeneralInformation',
  SpecialInformation: 'SpecialInformation',
  UploadPhoto: 'UploadPhoto',
  Home: 'Home',
  GuestsAnnouncements: 'GuestsAnnouncements',
  ApplicantScreen: 'ApplicantScreen',
  ApplicantBottomNavigator: 'ApplicantBottomNavigator',
  ApplicantOrders: 'ApplicantOrders',
  ApplicantOrdersDetails: 'ApplicantOrdersDetails',
  ApplicantEvaluateOrder: 'ApplicantEvaluateOrder',
  ApplicantProfile: 'ApplicantProfile',
  ApplicantAnnouncements: 'ApplicantAnnouncements',
  FilteredApplicantAnnouncements: 'FilteredApplicantAnnouncements',
  ApplicantAnnouncementDetails: 'ApplicantAnnouncementDetails',
  ApplicantAnnouncementsFilter: 'ApplicantAnnouncementsFilter',
  ApplicantNotifications: 'ApplicantNotifications',
  CustomerProfile: 'CustomerProfile',
  CustomerScreen: 'CustomerScreen',
  CustomerBottomNavigator: 'CustomerBottomNavigator',
  CustomerOrders: 'CustomerOrders',
  CustomerOrdersDetails: 'CustomerOrdersDetails',
  ServiceOrderProfessions: 'ServiceOrderProfessions',
  ServiceOrderSpecifications: 'ServiceOrderSpecifications',
  ServiceOrderJobDescription: 'ServiceOrderJobDescription',
  ServiceOrderUsersSearchResult: 'ServiceOrderUsersSearchResult',
  ServiceOrderUsersSearchSchedule: 'ServiceOrderUsersSearchSchedule',
  ServiceOrderMapFullScreen: 'ServiceOrderMapFullScreen',
  ServiceOrderMapSearch: 'ServiceOrderMapSearch',
  CustomerNotifications: 'CustomerNotifications',
  CustomerAnnouncements: 'CustomerAnnouncements',
  CustomerAnnouncementDetails: 'CustomerAnnouncementDetails',
  CustomerAnnouncementsFilter: 'CustomerAnnouncementsFilter',
  CustomerAnnouncementForm: 'CustomerAnnouncementForm',
  CustomerEvaluateOrder: 'CustomerEvaluateOrder',
  AnnouncementSpecifications: 'AnnouncementSpecifications',
  AddProfessionWithSwitchUserType: 'AddProfessionWithSwitchUserType',
  ApplicantSupportScreen: 'ApplicantSupportScreen',
  CustomerSupportScreen: 'CustomerSupportScreen'
};

export const AppNavigator = {
  EntryAuth: AppScreens.EntryAuth,
  RegisterBeforeVerification: {
    RegisterUserType: AppScreens.RegisterUserType,
    RegisterUserVerification: AppScreens.RegisterUserVerification
  },
  RegisterVerificationOTP: AppScreens.RegisterVerificationOTP,
  LoginVerificationOTP: AppScreens.LoginVerificationOTP,
  GuestsAnnouncements: AppScreens.GuestsAnnouncements,
  RegisterAfterVerification: {
    GeneralInformation: AppScreens.GeneralInformation,
    SpecialInformation: AppScreens.SpecialInformation,
    UploadPhoto: AppScreens.UploadPhoto
  },
  ApplicantScreen: {
    ApplicantBottomNavigator: AppScreens.ApplicantBottomNavigator,
    ApplicantOrders: AppScreens.ApplicantOrders,
    ApplicantOrdersDetails: AppScreens.ApplicantOrdersDetails,
    ApplicantEvaluateOrder: AppScreens.ApplicantEvaluateOrder,
    ApplicantProfile: AppScreens.ApplicantProfile,
    ApplicantAnnouncements: AppScreens.ApplicantAnnouncements,
    FilteredApplicantAnnouncements: AppScreens.FilteredApplicantAnnouncements,
    ApplicantAnnouncementDetails: AppScreens.ApplicantAnnouncementDetails,
    ApplicantAnnouncementsFilter: AppScreens.ApplicantAnnouncementsFilter,
    ApplicantNotifications: AppScreens.ApplicantNotifications,
    AnnouncementSpecifications: AppScreens.AnnouncementSpecifications,
    ApplicantSupportScreen: AppScreens.ApplicantSupportScreen
  },
  CustomerScreen: {
    CustomerProfile: AppScreens.CustomerProfile,
    CustomerBottomNavigator: AppScreens.CustomerBottomNavigator,
    CustomerOrders: AppScreens.CustomerOrders,
    CustomerOrdersDetails: AppScreens.CustomerOrdersDetails,
    ServiceOrderProfessions: AppScreens.ServiceOrderSpecifications,
    ServiceOrderSpecifications: AppScreens.ServiceOrderSpecifications,
    ServiceOrderJobDescription: AppScreens.ServiceOrderJobDescription,
    ServiceOrderMap: AppScreens.ServiceOrderMap,
    CustomerAnnouncements: AppScreens.CustomerAnnouncements,
    CustomerAnnouncementDetails: AppScreens.CustomerAnnouncementDetails,
    CustomerAnnouncementsFilter: AppScreens.CustomerAnnouncementsFilter,
    CustomerAnnouncementForm: AppScreens.CustomerAnnouncementForm,
    CustomerEvaluateOrder: AppScreens.CustomerEvaluateOrder,
    CustomerSupportScreen: AppScreens.CustomerSupportScreen
  }
};
