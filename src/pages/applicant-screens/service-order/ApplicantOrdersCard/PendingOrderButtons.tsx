import { Button, useToast } from 'native-base';
import React from 'react';
import { useQueryClient } from 'react-query';
import { Labels } from '../../../../core/Langs';
import { ThemeContextType, useTheme } from '../../../../core/theme/Theme';
import { OrderService } from '../../../../services/order-service/Applicant/ApplicantOrder.service';
import ButtonComponent from '../../../../components/button/Button';
import normalize from '../../../common/styles/normalize';

const orderService = OrderService();
interface AcceptOrDeclineButtonsProps {
    serviceOrderUserId: number,
    reFetchOrderDetails: () => void
}
export const PendingOrderButtons = (props: AcceptOrDeclineButtonsProps) => {
  const { serviceOrderUserId, reFetchOrderDetails } = props;
  const { theme } = useTheme() as ThemeContextType;
  const toast = useToast();
  const { mutate: accept } = orderService.useAcceptOrderRequest();
  const { mutate: decline } = orderService.useDeclineOrderRequest();
  const queryClient = useQueryClient();
  const invalidateQueries = () => {
    reFetchOrderDetails();
    queryClient.invalidateQueries('/order/user/status-counts');
    queryClient.invalidateQueries('/order/user');
  };
  const onPressAcceptButton = (id:number) => {
    accept(id, {
      onSuccess: () => {
        invalidateQueries();
      },
      onError: (error) => {
        const message = error.response?.data?.message;
        toast.show({
          placement: 'bottom',
          title: message || 'Xəta baş verdi',
          status: 'error',
          width: '100%'
        });
      }
    });
  };
  const onPressDeclineButton = (id:number) => {
    decline(id, {
      onSuccess: () => {
        invalidateQueries();
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
    <Button.Group
      variant="solid"
      isAttached
      space={6}
      mx={{
        base: 'auto',
        md: 0
      }}
    >
      <ButtonComponent
        buttonTextStyle={{ fontSize: normalize(14), fontFamily: 'InterMedium' }}
        variant="primary"
        title={Labels.accept}
        size="sm"
        onPress={() => onPressAcceptButton(serviceOrderUserId)}
        style={{
          margin: 5,
          backgroundColor: theme.palette.color.primary,
          width: normalize(153),
          height: normalize(44)
        }}
      />
      <ButtonComponent
        buttonTextStyle={{ fontSize: normalize(14), fontFamily: 'InterMedium', color: theme.palette.color.danger }}
        variant="outline"
        title={Labels.decline}
        size="sm"
        onPress={() => onPressDeclineButton(serviceOrderUserId)}
        style={{
          margin: 5,
          width: normalize(153),
          height: normalize(44),
          borderColor: theme.palette.color.danger,
          borderWidth: 2
        }}
      />
    </Button.Group>
  );
};
