import { useMutation, useQuery } from 'react-query';
import * as FileSystem from 'expo-file-system';
import { FileSystemUploadType } from 'expo-file-system/src/FileSystem.types';
import { HTTP } from '../../core/http/HttpClient';
import { getToken } from '../../core/Token';
import { UserPhotoServiceGetType } from './UserPhotoService.types';
import { getEnvironment } from '../../core/config';

export const UserPhotoService = () => {
  const { apiUrl } = getEnvironment();

  const saveUserPhoto = (image: string) => FileSystem.uploadAsync(
    `${apiUrl}/user-photo`,
    image,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${getToken()}`
      },
      uploadType: FileSystemUploadType.MULTIPART,
      httpMethod: 'POST',
      fieldName: 'photo'
    }
  );

  const deleteUserPhoto = () => HTTP.client()
    .delete('/user-photo');

  function getUserPhoto() {
    return HTTP.client()
      .get<{ data: UserPhotoServiceGetType }>('/user-photo');
  }

  const useSaveUserPhoto = () => useMutation(saveUserPhoto);

  function useGetUserPhoto(this: any) {
    return useQuery('getUserPhoto', getUserPhoto);
  }

  function useDeleteUserPhoto() {
    return useMutation(deleteUserPhoto);
  }

  return {
    // token,
    useSaveUserPhoto,
    useGetUserPhoto,
    getUserPhoto,
    useDeleteUserPhoto
  };
};
