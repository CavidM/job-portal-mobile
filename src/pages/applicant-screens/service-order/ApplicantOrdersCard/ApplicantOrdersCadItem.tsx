// in this file orders' labels and values rendered

import React from 'react';
import {
  Box, HStack, Text, View
} from 'native-base';
import useStyles from '../../../../components/Card/CardList.style';
import useFontStyles from '../../../../components/common/font.style';
import CheckedIcon from '../../../../components/Icons/CheckedIcon';
import PendingIcon from '../../../../components/Icons/PendingIcon';
import BagIcon from '../../../../components/Icons/BagIcon';
import { InformationIcon } from '../../../../components/Icons/InformationIcon';
import CancelIcon from '../../../../components/Icons/CancelIcon';
import { Labels } from '../../../../core/Langs';
import { ApplicantOrderStatusKeys, ApplicantOrderStatusLabels } from '../../../../core/Constants';
import PersonIcon from '../../../../components/Icons/PersonIcon';
import { ThemeContextType, useTheme } from '../../../../core/theme/Theme';
import { statusColors } from '../../../../core/theme/Constants';
import normalize from '../../../common/styles/normalize';

export interface CardListItemProps {
}

export const ApplicantOrdersCardItem = (props: CardListItemProps) => {
  const { theme } = useTheme() as ThemeContextType;
  const styles = useStyles();
  const fontStyle = useFontStyles();

  const {
    orderCreatorFullName,
    professionName,
    specificationName,
    orderDate,
    orderDescription,
    serviceOrderUserStatus,
    minSalary,
    children,
    withDetailedContent
  }: any = props;

  let icon;
  let statusLabel;

  switch (serviceOrderUserStatus) {
    case (ApplicantOrderStatusKeys.Done): {
      icon = (
        <View style={[styles.cardOrdersStatus, { backgroundColor: theme.palette.color.bgSuccess }]}>
          <CheckedIcon pathProps={{
            stroke: 'white'
          }}
          />
        </View>
      );
      statusLabel = ApplicantOrderStatusLabels.Done;
      break;
    }
    case (ApplicantOrderStatusKeys.Accepted): {
      icon = (
        <View style={[styles.cardOrdersStatus, { backgroundColor: theme.palette.color.bgSuccess }]}>
          <CheckedIcon pathProps={{
            stroke: 'white'
          }}
          />
        </View>
      );
      statusLabel = ApplicantOrderStatusLabels.InProgress;
      break;
    }
    case (ApplicantOrderStatusKeys.Pending): {
      icon = (
        <View style={[styles.cardOrdersStatus, { backgroundColor: theme.palette.color.bgWarning }]}>
          <PendingIcon pathProps={{
            fill: 'white'
          }}
          />
        </View>
      );
      statusLabel = ApplicantOrderStatusLabels.Pending;
      break;
    }

    case (ApplicantOrderStatusKeys.Canceled): {
      icon = (
        <View style={[styles.cardOrdersStatus, { backgroundColor: theme.palette.color.bgDanger }]}>
          <CancelIcon pathProps={{
            stroke: 'white'
          }}
          />
        </View>
      );
      statusLabel = ApplicantOrderStatusLabels.Canceled;
      break;
    }
    case (ApplicantOrderStatusKeys.Declined): {
      icon = (
        <View style={[styles.cardOrdersStatus, { backgroundColor: theme.palette.color.bgDanger }]}>
          <CancelIcon pathProps={{
            stroke: 'white'
          }}
          />
        </View>
      );
      statusLabel = ApplicantOrderStatusLabels.Declined;
      break;
    }
    default: {
      break;
    }
  }

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View maxWidth={normalize(180)}>
          {/* name, surname */}
          <Box mb={5}>
            <HStack>
              <PersonIcon />
              <Text
                isTruncated={!withDetailedContent}
                style={[fontStyle.fontFamilyInterMedium,
                styles.cardOrdersLabel, { color: theme.palette.CustomerColor }]}
              >
                {orderCreatorFullName}
              </Text>
            </HStack>
          </Box>
          {/* job type */}
          <Box mb={5}>
            <HStack>
              <BagIcon />
              <Text style={[fontStyle.fontFamilyInterMedium, styles.cardOrdersLabel,
              { color: theme.palette.CustomerColor }]}
              >
                {`${Labels.profession}/${Labels.specification}`}
              </Text>
            </HStack>
            <Text
              style={[fontStyle.fontFamilyInterRegular, styles.cardOrdersValue]}
              isTruncated={!withDetailedContent}
            >
              {professionName}
              {' '}
              {specificationName && ` / ${specificationName}  `}
            </Text>
          </Box>
        </View>
        {/* date, status, salary */}
        <Box maxWidth={normalize(150)}>
          <View mb={3} style={styles.applicantOrderSalary}>
            <Text
              style={[
                fontStyle.fontFamilyInterRegular, styles.orangeColor, { fontSize: 11 }]}
            >
              {minSalary === null ? Labels.onAgreedPrice : `${minSalary} AZN`}
            </Text>
          </View>
          <View alignSelf="flex-end">
            <Text mb={3} style={[fontStyle.fontFamilyInterRegular, styles.cardOrdersValue]}>
              {orderDate?.slice(0, 10)}
            </Text>
          </View>

          <HStack mt={2} alignSelf="flex-end">
            <Text
              style={[fontStyle.fontFamilyInterRegular, styles.cardOrdersValue,
              { color: statusColors[serviceOrderUserStatus] }]}
            >
              {statusLabel}
            </Text>
            {!withDetailedContent && icon}
          </HStack>

        </Box>
      </View>

      {/* description */}
      <Box mb={5}>
        <HStack>
          <InformationIcon />
          <Text
            style={[fontStyle.fontFamilyInterMedium, styles.cardOrdersLabel, styles.orangeColor]}
          >
            {Labels.description}
          </Text>
        </HStack>

        <Text
          isTruncated={!withDetailedContent}
          style={[fontStyle.fontFamilyInterRegular, styles.cardOrdersValue]}
        >
          {orderDescription}
        </Text>
      </Box>
      {children
        && (
          <View>
            {children}
          </View>
        )}

    </View>
  );
};
