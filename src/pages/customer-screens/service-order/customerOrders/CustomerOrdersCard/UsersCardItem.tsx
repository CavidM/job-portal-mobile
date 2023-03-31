// this file contains the user information on the order card

import React from 'react';
import {
  Avatar, Box, Flex, Text, View
} from 'native-base';
import AvatarIcon from '../../../../../components/Icons/AvatarIcon';
import normalize from '../../../../common/styles/normalize';
import useStyles from '../../../../../components/Card/CardList.style';
import { statusColors } from '../../../../../core/theme/Constants';
import { CallButton } from './CallButton';
import {
  ApplicantOrderStatusKeys,
  CustomerOrderStatusLabels
} from '../../../../../core/Constants';
import { UserPhotoServiceGetType } from '../../../../../services/user-photo-service/UserPhotoService.types';

interface UsersCardItemProps {
    userPhotoDTO: null | UserPhotoServiceGetType,
    firstName: string
    lastName: string
    serviceOrderUserStatus: string
    phoneNumber: string,
    date: string
}

export const UsersCardItem = (props: UsersCardItemProps) => {
  const styles = useStyles();

  const {
    userPhotoDTO, firstName, lastName, date, serviceOrderUserStatus, phoneNumber
  } = props;
  return (
    <Box style={styles.usersCardItemContainer}>
      <Flex direction="row" align="center">
        {/* Avatar */}
        <Flex>
          {userPhotoDTO
            ? (
              <Avatar
                marginRight={6}
                mx={2.5}
                marginY={4}
                width={60}
                height={60}
                source={{
                  uri: `data:image/png;base64,${userPhotoDTO?.fileData}`
                }}
              />
            )
            : (
              <View
                marginRight={6}
                mx={2.5}
                marginY={4}
                alignItems="center"
                justifyContent="center"
              >
                <AvatarIcon />
              </View>
            )}
        </Flex>

        {/* Full name */}
        <Flex marginLeft={1}>
          <Flex direction="row" mt={3}>
            <Text
              isTruncated
              fontSize={14}
              maxWidth={normalize(145)}
              marginBottom={2}
              fontFamily="InterMedium"
              color="black"
            >
              {firstName}
              {' '}
              {lastName}
            </Text>
          </Flex>

          {/* Status */}
          <Flex direction="row">
            <Text
              isTruncated
              fontSize={12}
              maxWidth={normalize(128)}
              marginBottom={2}
              fontFamily="InterRegular"
              color={statusColors[serviceOrderUserStatus]}
            >
              {CustomerOrderStatusLabels[serviceOrderUserStatus]}
            </Text>

          </Flex>

          {/* Created */}
          <Flex direction="row">
            <Text
              isTruncated
              fontSize={12}
              maxWidth={normalize(128)}
              marginBottom={2}
              fontFamily="InterRegular"
              color="#838383"
            >
              {date.slice(0, 10)}
            </Text>
          </Flex>
        </Flex>

        <CallButton
          phone={phoneNumber}
          active={[
            ApplicantOrderStatusKeys.Accepted,
            ApplicantOrderStatusKeys.Done
          ].includes(serviceOrderUserStatus)}
        />
      </Flex>
    </Box>
  );
};
