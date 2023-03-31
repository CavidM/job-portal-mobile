import React from 'react';
import {
  Text, Box, HStack, View, VStack
} from 'native-base';
import useStyles from '../../../../components/Card/CardList.style';
import useFontStyles from '../../../../components/common/font.style';
import BagIcon from '../../../../components/Icons/BagIcon';
import { Labels } from '../../../../core/Langs';
import { CalendarIcon } from '../../../../components/Icons/CalendarIcon';
import { ThemeContextType, useTheme } from '../../../../core/theme/Theme';
import normalize from '../../../common/styles/normalize';
import PersonIcon from '../../../../components/Icons/PersonIcon';
import { StarAnnouncementButton } from './StarAnnouncement';
import { ManatIcon } from '../../../../components/Icons/ManatIcon';

export interface CardListItemProps {
  isUserTypeGuest?: boolean
}
export const ApplicantAnnouncementsCard = (props: CardListItemProps) => {
  const fontStyle = useFontStyles();
  const { theme } = useTheme() as ThemeContextType;
  const { color } = theme.palette;
  const {
    agency,
    professionDTO,
    specificationDTO,
    deadlineDate,
    maxSalary,
    minSalary,
    announcementSource,
    starred,
    id,
    isUserTypeGuest
  }: any = props;

  const primaryColor = isUserTypeGuest ? color.guestColor : color.primary;
  const styles = useStyles(isUserTypeGuest);
  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View maxWidth={normalize(180)}>
          {/* agency */}
          <Box mb={5}>
            <HStack>
              <PersonIcon
                pathProps={{
                  fill: primaryColor
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
              {agency}
            </Text>
          </Box>
          {/* job type */}
          <Box mb={5}>
            <HStack>
              <BagIcon
                pathProps={{
                  stroke: primaryColor,
                  fill: primaryColor
                }}
              />
              <Text style={[fontStyle.fontFamilyInterMedium, styles.cardOrdersLabel]}>
                {`${Labels.profession}/${Labels.specification}`}
              </Text>
            </HStack>
            <Text
              isTruncated
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
                pathProps={{ stroke: primaryColor }}
                circleProps={{ fill: primaryColor }}
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
        </View>
        <VStack w={normalize(115)} mb={4} style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* salary */}
          <Box>
            <View style={styles.announcementSalary}>

              {minSalary !== null || maxSalary !== null ? (
                <Text
                  style={[fontStyle.fontFamilyInterRegular, styles.announcementSalaryLabel]}
                >
                  {minSalary}
                  {' '}
                  -
                  {' '}
                  {maxSalary}
                  {'  '}
                  <View>
                    <ManatIcon
                      pathProps={{
                        fill: theme.palette.color.white
                      }}
                      svgProps={{
                        width: 10,
                        height: 8,
                        strokeWidth: 1,
                        stroke: theme.palette.color.white
                      }}
                    />
                  </View>
                </Text>
              )

                : (
                  <Text
                    style={[fontStyle.fontFamilyInterRegular, styles.announcementSalaryLabel]}
                  >
                    {Labels.onAgreedPrice}
                  </Text>
                )}

            </View>
          </Box>

          {/* star */}
          {!isUserTypeGuest
            && (
              <Box alignSelf="flex-end">
                <StarAnnouncementButton announcementId={id} starred={starred} />
              </Box>
            )}

          {/* announcement source */}
          {announcementSource !== 'SELF'
            && (
              <Box alignSelf="flex-end">
                <Text style={[fontStyle.fontFamilyInterExtraBold,
                styles.announcementSource]}
                >
                  {announcementSource}
                </Text>
              </Box>
            )}

        </VStack>
      </View>

    </View>
  );
};
