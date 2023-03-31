import { View } from 'react-native';
import React, { useState } from 'react';
import {
  Box, ScrollView, useToast
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { ThemeContextType, useTheme } from '../../../../core/theme/Theme';
import { CustomerOrdersCardList } from './CustomerOrdersCard/CustomerOrdersCardList';
import { UsersCardItem } from './CustomerOrdersCard/UsersCardItem';
import { OrderService } from '../../../../services/order-service/Customer/Order.service';

import Loader from '../../../../components/Loader/Loader';
import ButtonComponent from '../../../../components/button/Button';
import normalize from '../../../common/styles/normalize';
import { Labels } from '../../../../core/Langs';
import { saveQuestionnaireToRedux } from '../../../../store/slices/questionnaire.slice';
import { AppScreens } from '../../../../routes/Navigator.types';
import { ConfirmationModal } from '../../../../components/Modal/ConfirmationModal';
import useFontStyles from '../../../../components/common/font.style';
import { CustomerOrderStatusKeys } from '../../../../core/Constants';

const orderService = OrderService();

export const CustomerOrdersDetailsPage = ({ route }: any) => {
  const { theme } = useTheme() as ThemeContextType;
  const toast = useToast();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { id } = route?.params;
  const {
    data: customerOrderDetailsData, isLoading
  } = orderService.useGetCustomerOrderDetails(id);
  const orderData = customerOrderDetailsData?.data.data;
  const orderUserData = customerOrderDetailsData?.data.data.users;
  const [showCancelOrderModal, setShowCancelOrderModal] = useState(false);
  const { mutate: cancelOrder } = orderService.useCancelOrder();

  const onPressCancelButton = (serviceOrderUserId:number) => {
    cancelOrder(serviceOrderUserId, {
      onSuccess: (res) => {
        dispatch(saveQuestionnaireToRedux(res.data.data.userQuestionnaireId));
        navigation.navigate(AppScreens.CustomerEvaluateOrder);
        setShowCancelOrderModal(false);
      },
      onError: () => {
        toast.show({
          placement: 'bottom',
          title: 'Xəta baş verdi',
          status: 'error',
          width: normalize(324)
        });
      }
    });
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, alignItems: 'center', marginTop: 20 }}>
        {isLoading ? <Loader />
          : (
            <Box mt={2}>
              <CustomerOrdersCardList
                withDetailedContent
                data={orderData}
                backgroundColor={theme.palette.color.white}
                countOfPerson={orderUserData?.length}
              >
                { orderUserData?.map((item) => (
                  <UsersCardItem key={item.phoneNumber} {...item} />
                ))}
              </CustomerOrdersCardList>
              {[
                CustomerOrderStatusKeys.Pending,
                CustomerOrderStatusKeys.InProgress
              ].includes(orderData?.serviceOrderStatus)
              && (
              <ButtonComponent
                buttonTextStyle={{ fontSize: normalize(14), fontFamily: 'InterLight', color: theme.palette.color.danger }}
                variant="outline"
                title={Labels.cancelOrder}
                size="sm"
                onPress={() => setShowCancelOrderModal(true)}
                style={{ margin: 5, borderColor: theme.palette.color.danger, borderWidth: 2 }}
              />
              )}

              <ConfirmationModal
                confirmText={Labels.yes}
                closeText={Labels.no}
                isOpen={showCancelOrderModal}
                onClose={() => setShowCancelOrderModal(false)}
                onConfirm={() => onPressCancelButton(id)}
                modalHeaderText="Sifarişi ləğv etmək istədiyinizə əminsiniz?"
              />
            </Box>
          )}

      </View>
    </ScrollView>

  );
};
