import { View } from 'react-native';
import React from 'react';
import {
  Box, Button, HStack, ScrollView, Text
} from 'native-base';
import { ThemeContextType, useTheme } from '../../../core/theme/Theme';
import { ApplicantOrdersCardList } from './ApplicantOrdersCard/ApplicantOrdersCardList';
import Loader from '../../../components/Loader/Loader';
import { OrderService } from '../../../services/order-service/Applicant/ApplicantOrder.service';
import { LocationCardItem } from '../../common/map/LocationCardItem';
import { ApplicantOrderStatusKeys } from '../../../core/Constants';
import { AcceptedOrderButtons } from './ApplicantOrdersCard/AcceptedOrderButtons';
import { PendingOrderButtons } from './ApplicantOrdersCard/PendingOrderButtons';
import { AddressIcon } from '../../../components/Icons/AddressIcon';
import useStyles from '../../../components/Card/CardList.style';
import { Labels } from '../../../core/Langs';
import { Call } from '../../../tools/call/Linking';
import { CallIcon } from '../../../components/Icons/CallIcon';
import normalize from '../../common/styles/normalize';
import useFontStyles from '../../../components/common/font.style';

const orderService = OrderService();

export const ApplicantOrdersDetailsPage = (route: any) => {
  const { theme } = useTheme() as ThemeContextType;
  const styles = useStyles();
  const fontStyle = useFontStyles();
  // eslint-disable-next-line react/destructuring-assignment
  const { id } = route?.route.params;
  const {
    data: ApplicantOrderDetailsData, isLoading, refetch
  } = orderService.useGetApplicantOrderDetails(id);

  const orderData = ApplicantOrderDetailsData?.data.data;
  const locationData = ApplicantOrderDetailsData?.data.data?.locationPayload;

  let orderActionComponent;
  const serviceOrderStatus = orderData?.serviceOrderUserStatus;
  switch (serviceOrderStatus) {
    case ApplicantOrderStatusKeys.Pending: {
      orderActionComponent = (
        <PendingOrderButtons
          serviceOrderUserId={orderData?.serviceOrderUserId}
          reFetchOrderDetails={() => refetch()}
        />
      );
      break;
    }
    case ApplicantOrderStatusKeys.Accepted: {
      orderActionComponent = (
        <AcceptedOrderButtons
          serviceOrderUserId={orderData?.serviceOrderUserId}
        />
      );
      break;
    }
    default: {
      break;
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, alignItems: 'center', marginTop: 20 }}>
        {isLoading ? <Loader />
          : (
            <Box mt={2}>
              <ApplicantOrdersCardList
                withDetailedContent
                data={orderData}
                backgroundColor={theme.palette.color.white}
              >
                <View>
                  <HStack>
                    <AddressIcon
                      pathProps={{ stroke: theme.palette.color.primary }}
                      circleProps={{ stroke: theme.palette.color.primary }}
                    />
                    <Text style={[fontStyle.fontFamilyInterMedium, styles.cardOrdersLabel]}>
                      {Labels.address}
                    </Text>
                  </HStack>
                  <LocationCardItem data={locationData} />
                  {
                    serviceOrderStatus === ApplicantOrderStatusKeys.Accepted
                    && (
                    <Button
                      size="sm"
                      onPress={() => Call(orderData?.orderCreatorPhoneNumber)}
                      style={{
                        backgroundColor: theme.palette.CustomerColor,
                        marginTop: 8,
                        width: '100%',
                        height: normalize(45),
                        borderRadius: 10
                      }}
                    >
                      <HStack>
                        <CallIcon svgProps={{ height: 22.41 }} />
                        <Text
                          color={theme.palette.color.white}
                          style={[{ fontSize: normalize(13) },
                            fontStyle.fontFamilyInterRegular]}
                          lineHeight={20}
                        >
                          {' '}
                          {Labels.call}
                        </Text>
                      </HStack>
                    </Button>
                    )
                  }

                </View>
              </ApplicantOrdersCardList>
            </Box>
          )}
        {orderActionComponent}
      </View>
    </ScrollView>

  );
};
