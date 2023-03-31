import React from 'react';
import PersonalProfilePage from './PersonalProfile.page';
import { UserPhotoService } from '../../services/user-photo-service/UserPhoto.service';
import { UserService } from '../../services/user-service/User.service';
import CenterView from '../../components/CenterView/CenterView';
import Loader from '../../components/Loader/Loader';

export const PersonalProfileContainer = ({ navigation }) => {
  const userPhotoService = UserPhotoService();
  const userService = UserService();

  const { data: userPhoto } = userPhotoService.useGetUserPhoto();
  const { data: userData, isLoading } = userService.useGetUser();

  if (isLoading) {
    return <CenterView><Loader /></CenterView>;
  }

  return (
    <PersonalProfilePage
      navigation={navigation}
      personalData={userData?.data.data.userDTO}
      specialData={userData?.data.data.userProfessionsDTO}
      userPhoto={userPhoto?.data?.data}
      cityData={userData?.data?.data.cityDTO}
      userRateVoteCount={userData?.data?.data.userRateVoteCount}
      userRating={userData?.data?.data.userRating}
    />
  );
};
