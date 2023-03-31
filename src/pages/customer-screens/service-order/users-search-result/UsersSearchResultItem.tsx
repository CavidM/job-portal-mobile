import React from 'react';
import {
  Avatar, Box, Flex, Text, View
} from 'native-base';
import { UsersSearchResultStyle } from './UsersSearchResult.style';
import { StarIcon } from '../../../../components/Icons/StarIcon';
import normalize from '../../../common/styles/normalize';
import AvatarIcon from '../../../../components/Icons/AvatarIcon';

interface UsersSearchResultItemProps {
  id: number
  avatar: string
  fullName: string
  profession: string
  specification: string
  professionStarCount: string
  personalStarCount: string
  selected: boolean
}

const ItemSelectedFlag = ({ selected }: {selected: boolean}) => {
  const styles = UsersSearchResultStyle(selected);
  return (
    <Box style={styles.selectedFlag} />
  );
};

export const UsersSearchResultItem = (props: UsersSearchResultItemProps) => {
  const styles = UsersSearchResultStyle();

  const {
    id, avatar, fullName, profession, specification,
    personalStarCount, professionStarCount, selected
  } = props;

  let professionAndSpecification = `${profession}`;

  if (specification) {
    professionAndSpecification += `/${specification}`;
  }

  return (
    <Box style={styles.itemContainer} shadow={2} key={id}>
      <Flex direction="row" align="center">
        <Flex>
          {avatar
            ? (
              <Avatar
                marginRight={6}
                mx={2.5}
                marginY={4}
                width={67}
                height={67}
                source={{
                  uri: `data:image/png;base64,${avatar?.fileData}`
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
        <Flex marginLeft={1}>
          <Flex direction="row">
            <Text
              isTruncated
              fontSize={14}
              maxWidth={normalize(145)}
              marginBottom={2}
              fontFamily="InterSemiBold"
              color="black"
            >
              {fullName}
            </Text>
            <Box style={styles.starIconStyle}>
              <StarIcon />
            </Box>
            <Text
              fontSize={13}
              fontFamily="InterRegular"
              color="black"
            >
              {personalStarCount}
            </Text>
          </Flex>
          <Flex direction="row">
            <Text
              isTruncated
              fontSize={13}
              maxWidth={normalize(128)}
              marginBottom={2}
              fontFamily="InterRegular"
              color="#838383"
            >
              {`${professionAndSpecification}`}
            </Text>
            <Box style={styles.starIconStyle}>
              <StarIcon />
            </Box>
            <Text
              fontSize={13}
              fontFamily="InterRegular"
              color="black"
            >
              {professionStarCount}
            </Text>
          </Flex>
        </Flex>
        <ItemSelectedFlag selected={selected} />
      </Flex>
    </Box>
  );
};
