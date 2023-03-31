// in this file orders' labels and values rendered

import React from 'react';
import {
  Text, Box, HStack, View
} from 'native-base';
import useStyles from '../../../../../components/Card/CardList.style';
import useFontStyles from '../../../../../components/common/font.style';
import CheckedIcon from '../../../../../components/Icons/CheckedIcon';
import PendingIcon from '../../../../../components/Icons/PendingIcon';
import BagIcon from '../../../../../components/Icons/BagIcon';
import DateIcon from '../../../../../components/Icons/DateIcon';
import { InformationIcon } from '../../../../../components/Icons/InformationIcon';
import CancelIcon from '../../../../../components/Icons/CancelIcon';
import { Labels } from '../../../../../core/Langs';
import PeopleIcon from '../../../../../components/Icons/PeopleIcon';
import normalize from '../../../../common/styles/normalize';
import { CustomerOrderStatusKeys, CustomerOrderStatusLabels } from '../../../../../core/Constants';

export interface CardListItemProps {
}

export const CustomerOrdersCardItem = (props: CardListItemProps) => {
  const styles = useStyles();
  const fontStyle = useFontStyles();

  const {
    professionDTO,
    specificationDTO,
    createdDate,
    jobDescription,
    id,
    serviceOrderStatus,
    withDetailedContent,
    children,
    countOfPerson
  }: any = props;

  let icon;
  let statusLabel;
  switch (serviceOrderStatus) {
    case (CustomerOrderStatusKeys.Done): {
      icon = <CheckedIcon />;
      statusLabel = CustomerOrderStatusLabels.DONE;
      break;
    }
    case (CustomerOrderStatusKeys.Pending): {
      icon = <PendingIcon />;
      statusLabel = CustomerOrderStatusLabels.PENDING;
      break;
    }
    case (CustomerOrderStatusKeys.Canceled): {
      icon = <CancelIcon />;
      statusLabel = CustomerOrderStatusLabels.CANCELLED;
      break;
    }
    case (CustomerOrderStatusKeys.InProgress): {
      icon = <PendingIcon />;
      statusLabel = CustomerOrderStatusLabels.IN_PROGRESS;
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
          {/* job type */}
          <Box mb={5}>
            <HStack>
              <BagIcon />
              <Text style={[fontStyle.fontFamilyInterMedium, styles.cardOrdersLabel]}>
                {`${Labels.profession}/${Labels.specification}`}
              </Text>
            </HStack>
            <Text
              isTruncated={!withDetailedContent}
              style={[fontStyle.fontFamilyInterRegular, styles.cardOrdersValue]}
            >
              {professionDTO?.name}
              {' '}
              {specificationDTO
                && ` / ${specificationDTO?.name}  `}
            </Text>
          </Box>
          {/* created */}
          <Box mb={5}>
            <HStack>
              <DateIcon />
              <Text style={[fontStyle.fontFamilyInterMedium, styles.cardOrdersLabel]}>
                {Labels.created}
              </Text>
            </HStack>
            <Text style={[fontStyle.fontFamilyInterRegular, styles.cardOrdersValue]}>
              {createdDate?.slice(0, 10)}
            </Text>
          </Box>
        </View>
        {/* id, status */}
        <Box maxWidth={170}>
          <Text style={[fontStyle.fontFamilyInterRegular, styles.cardOrdersValue, { textAlign: 'right' }]}>
            ID:
            {' '}
            {id}
          </Text>
          <HStack mt={3} alignSelf="flex-end">
            <Text
              style={[fontStyle.fontFamilyInterRegular, styles.cardOrdersValue, styles.darkColor]}
            >
              {statusLabel}
            </Text>
            <View style={styles.cardOrdersStatus}>{icon}</View>
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
          {jobDescription}
        </Text>
      </Box>
      {children
        && (
          <Box>
            <HStack>
              <PeopleIcon />
              <Text style={[fontStyle.fontFamilyInterMedium, styles.cardOrdersLabel]}>
                {countOfPerson}
                {' '}
                {Labels.people}
              </Text>
            </HStack>
            <View>
              {children}
            </View>
          </Box>
        )}

    </View>
  );
};
