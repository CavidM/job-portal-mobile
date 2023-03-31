import React from 'react';
import {
  Text, Box, HStack, View
} from 'native-base';
import useStyles from '../../../../components/Card/CardList.style';
import useFontStyles from '../../../../components/common/font.style';
import BagIcon from '../../../../components/Icons/BagIcon';
import { Labels } from '../../../../core/Langs';
import { LocationCardItem } from '../../../common/map/LocationCardItem';
import { CalendarIcon } from '../../../../components/Icons/CalendarIcon';
import { ThemeContextType, useTheme } from '../../../../core/theme/Theme';
import { AddressIcon } from '../../../../components/Icons/AddressIcon';
import { InformationIcon } from '../../../../components/Icons/InformationIcon';
import { SandGlassIcon } from '../../../../components/Icons/SandGlassIcon';
import { GenderIcon } from '../../../../components/Icons/GenderIcon';
import PersonIcon from '../../../../components/Icons/PersonIcon';
import { GenderTypesLabels } from '../../../../core/Constants';
import normalize from '../../../common/styles/normalize';

export interface CardListItemProps {
}

export const CustomerAnnouncementDetailsCard = (props: CardListItemProps) => {
  const styles = useStyles();
  const fontStyle = useFontStyles();
  const { theme } = useTheme() as ThemeContextType;

  const {
    agency,
    creatorUserFullName,
    professionDTO,
    specificationDTO,
    deadlineDate,
    cityDTO,
    description,
    genderType,
    locationPayload,
    maxAge,
    maxSalary,
    minAge,
    minSalary
  }: any = props;

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {/* agency */}
        <Box maxWidth={normalize(180)} mb={5}>
          <HStack>
            <PersonIcon
              pathProps={{
                fill: theme.palette.color.primary
              }}
            />
            <Text style={[fontStyle.fontFamilyInterMedium, styles.cardOrdersLabel]}>
              {Labels.agency}
            </Text>
          </HStack>
          <Text
            style={[fontStyle.fontFamilyInterRegular,
            styles.cardOrdersValue, styles.cardAnnouncementsValue]}
          >
            {agency || creatorUserFullName}
          </Text>
        </Box>
        {/* salary */}
        <Box maxWidth={150}>
          <View style={styles.announcementSalary}>
            <Text
              style={[fontStyle.fontFamilyInterRegular, styles.announcementSalaryLabel]}
            >
              {minSalary !== null || maxSalary !== null ? `${minSalary} - ${maxSalary} AZN` : Labels.onAgreedPrice}
            </Text>
          </View>

        </Box>
      </View>
      <View>
        {/* job type */}
        <Box mb={5}>
          <HStack>
            <BagIcon
              pathProps={{
                stroke: theme.palette.color.primary,
                fill: theme.palette.color.primary
              }}
            />
            <Text style={[fontStyle.fontFamilyInterMedium, styles.cardOrdersLabel]}>
              {`${Labels.profession}/${Labels.specification}`}
            </Text>
          </HStack>
          <Text
            style={[fontStyle.fontFamilyInterRegular,
            styles.cardOrdersValue, styles.cardAnnouncementsValue]}
          >
            {professionDTO?.name}
            {' '}
            {specificationDTO
              && ` / ${specificationDTO?.name}  `}
          </Text>
        </Box>
        {/* deadline */}
        <Box mb={5}>
          <HStack>
            <CalendarIcon
              pathProps={{ stroke: theme.palette.color.primary }}
              circleProps={{ fill: theme.palette.color.primary }}
            />
            <Text style={[fontStyle.fontFamilyInterMedium, styles.cardOrdersLabel]}>
              {Labels.announcementDeadline}
            </Text>
          </HStack>
          <Text
            style={[fontStyle.fontFamilyInterRegular,
            styles.cardOrdersValue, styles.cardAnnouncementsValue]}
          >
            {deadlineDate}
          </Text>
        </Box>
        {/* city */}
        <Box mb={5}>
          <HStack>
            <AddressIcon
              pathProps={{ stroke: theme.palette.color.primary }}
              circleProps={{ stroke: theme.palette.color.primary }}
            />
            <Text style={[fontStyle.fontFamilyInterMedium, styles.cardOrdersLabel]}>
              {Labels.city}
            </Text>
          </HStack>
          <Text
            style={[fontStyle.fontFamilyInterRegular,
            styles.cardOrdersValue, styles.cardAnnouncementsValue]}
          >
            {cityDTO?.name}
          </Text>
        </Box>
        {/* address */}
        <Box mb={5}>
          <HStack>
            <AddressIcon
              pathProps={{ stroke: theme.palette.color.primary }}
              circleProps={{ stroke: theme.palette.color.primary }}
            />
            <Text style={[fontStyle.fontFamilyInterMedium, styles.cardOrdersLabel]}>
              {Labels.address}
            </Text>
          </HStack>
          <LocationCardItem data={locationPayload} />
        </Box>
        {/* gender */}
        <Box mb={5}>
          <HStack>
            <GenderIcon pathProps={{ stroke: theme.palette.color.primary }} />
            <Text style={[fontStyle.fontFamilyInterMedium, styles.cardOrdersLabel]}>
              {Labels.gender}
            </Text>
          </HStack>
          <Text
            style={[fontStyle.fontFamilyInterRegular,
            styles.cardOrdersValue, styles.cardAnnouncementsValue]}
          >
            {genderType === null ? GenderTypesLabels.BOTH : GenderTypesLabels[genderType]}
          </Text>
        </Box>
        {/* age */}
        <Box mb={5}>
          <HStack>
            <SandGlassIcon pathProps={{ fill: theme.palette.color.primary }} />
            <Text style={[fontStyle.fontFamilyInterMedium, styles.cardOrdersLabel]}>
              {Labels.age}
            </Text>
          </HStack>
          <Text
            style={[fontStyle.fontFamilyInterRegular,
            styles.cardOrdersValue, styles.cardAnnouncementsValue]}
          >
            {`${minAge} - ${maxAge}`}
          </Text>
        </Box>
        {/* description */}
        <Box mb={5}>
          <HStack>
            <InformationIcon
              pathProps={{ stroke: theme.palette.color.primary }}
            />
            <Text style={[fontStyle.fontFamilyInterMedium, styles.cardOrdersLabel]}>
              {Labels.description}
            </Text>
          </HStack>
          <Text
            style={[fontStyle.fontFamilyInterRegular,
            styles.cardOrdersValue, styles.cardAnnouncementsValue]}
          >
            {description}
          </Text>
        </Box>
      </View>
    </View>
  );
};
