import React, { useState } from 'react';
import { View } from 'react-native';
import { useToast } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { AxiosResponse } from 'axios';
import { Labels } from '../../../../core/Langs';
import ButtonComponent from '../../../../components/button/Button';
import normalize from '../../../common/styles/normalize';
import { ThemeContextType, useTheme } from '../../../../core/theme/Theme';
import { OrderService } from '../../../../services/order-service/Applicant/ApplicantOrder.service';
import { AppScreens } from '../../../../routes/Navigator.types';
import { saveQuestionnaireToRedux } from '../../../../store/slices/questionnaire.slice';
import { ConfirmationModal } from '../../../../components/Modal/ConfirmationModal';
import { QuestionnaireResponseProps } from '../../../../services/questionnaire/QuestionnaireService.types';
import useFontStyles from '../../../../components/common/font.style';

interface CallItemProps {
    serviceOrderUserId: number,
}
export const AcceptedOrderButtons = (props: CallItemProps) => {
  const { serviceOrderUserId } = props;
  const { theme } = useTheme() as ThemeContextType;
  const fontStyle = useFontStyles();
  const orderService = OrderService();
  const { mutate: finishOrder } = orderService.useFinishOrder();
  const { mutate: cancelOrder } = orderService.useCancelOrder();
  const toast = useToast();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [showFinishOrderModal, setShowFinishOrderModal] = useState(false);
  const [showCancelOrderModal, setShowCancelOrderModal] = useState(false);
  const onSuccess = (res: AxiosResponse<QuestionnaireResponseProps>) => {
    dispatch(saveQuestionnaireToRedux(res.data.data.userQuestionnaireId));
    navigation.navigate(AppScreens.ApplicantEvaluateOrder);
  };

  const onPressFinishButton = (id:number) => {
    finishOrder(id, {
      onSuccess: (res) => {
        onSuccess(res);
        setShowFinishOrderModal(false);
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
  const onPressCancelButton = (id:number) => {
    cancelOrder(id, {
      onSuccess: (res) => {
        onSuccess(res);
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
    <View>
      <ButtonComponent
        buttonTextStyle={[{ fontSize: normalize(13) }, fontStyle.fontFamilyInterRegular]}
        variant="primary"
        title={Labels.finishOrder}
        size="sm"
        onPress={() => setShowFinishOrderModal(true)}
        style={{ margin: 3, backgroundColor: theme.palette.color.primary, borderRadius: 10 }}
      />

      <ButtonComponent
        buttonTextStyle={[{ fontSize: normalize(13), color: theme.palette.color.danger },
          fontStyle.fontFamilyInterRegular]}
        variant="outline"
        title={Labels.cancelOrder}
        size="sm"
        onPress={() => setShowCancelOrderModal(true)}
        style={{
          margin: 5,
          borderColor: theme.palette.color.danger,
          borderWidth: 2,
          borderRadius: 10
        }}
      />
      <ConfirmationModal
        confirmText={Labels.finish}
        closeText={Labels.no}
        isOpen={showFinishOrderModal}
        onClose={() => setShowFinishOrderModal(false)}
        onConfirm={() => onPressFinishButton(serviceOrderUserId)}
        modalHeaderText="Sifarişi tamamlamaq istədiyinizə əminsiniz?"
      />
      <ConfirmationModal
        confirmText={Labels.yes}
        closeText={Labels.no}
        isOpen={showCancelOrderModal}
        onClose={() => setShowCancelOrderModal(false)}
        onConfirm={() => onPressCancelButton(serviceOrderUserId)}
        modalHeaderText="Sifarişi ləğv etmək istədiyinizə əminsiniz?"
      />
    </View>
  );
};
