import React from 'react';
import {
  Text, Box, HStack, View
} from 'native-base';
import useStyles from '../../../../components/Card/CardList.style';
import useFontStyles from '../../../../components/common/font.style';
import BagIcon from '../../../../components/Icons/BagIcon';
import { Labels } from '../../../../core/Langs';
import { AnnouncementStatus } from '../../../../core/Constants';
import { AnnouncementsModel } from '../../../../services/announcement-service/Customer/AnnouncmentService.types';
import { CalendarIcon } from '../../../../components/Icons/CalendarIcon';
import { ThemeContextType, useTheme } from '../../../../core/theme/Theme';
import { statusColors } from '../../../../core/theme/Constants';
import normalize from '../../../common/styles/normalize';

export const CustomerAnnouncementsCard = (props: AnnouncementsModel) => {
  const styles = useStyles();
  const fontStyle = useFontStyles();
  const { theme } = useTheme() as ThemeContextType;

  const {
    professionName,
    specificationName,
    deadlineDate,
    announcementStatus
  }: any = props;

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View maxWidth={normalize(180)}>
          {/* job type */}
          <Box mb={5}>
            <HStack>
              <BagIcon />
              <Text style={[fontStyle.fontFamilyInterMedium, styles.cardOrdersLabel]}>
                {`${Labels.profession}/${Labels.specification}`}
              </Text>
            </HStack>
            <Text
              isTruncated
              style={[fontStyle.fontFamilyInterRegular, styles.cardOrdersValue]}
            >
              {professionName}
              {' '}
              {specificationName
                && ` / ${specificationName}  `}
            </Text>
          </Box>
          {/* created */}
          <Box mb={5}>
            <HStack>
              <CalendarIcon pathProps={{ stroke: theme.palette.color.primary }} />
              <Text style={[fontStyle.fontFamilyInterMedium, styles.cardOrdersLabel]}>
                {Labels.announcementDeadline}
              </Text>
            </HStack>
            <Text style={[fontStyle.fontFamilyInterRegular, styles.cardOrdersValue]}>
              {deadlineDate.slice(0, 10)}
            </Text>
          </Box>
        </View>
        {/* status */}
        <Box w={100}>
          <HStack mt={3} alignSelf="flex-end">
            <Text
              style={[fontStyle.fontFamilyInterMedium, styles.cardOrdersValue,
              { color: statusColors[announcementStatus] }]}
            >
              {AnnouncementStatus[announcementStatus]}
            </Text>
          </HStack>

        </Box>
      </View>

    </View>
  );
};
