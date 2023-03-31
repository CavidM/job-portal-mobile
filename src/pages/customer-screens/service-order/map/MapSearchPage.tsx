import {
  Box, ScrollView, Text, useToast
} from 'native-base';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useQueryClient } from 'react-query';
import { MapStyles } from './Map.styles';
import { AppScreens } from '../../../../routes/Navigator.types';
import Button from '../../../../components/button/Button';
import { createOrderPayloadSelectors } from '../../../../store/slices/createOrderPayload';
import { OrderService } from '../../../../services/order-service/Customer/Order.service';
import { Labels } from '../../../../core/Langs';
import normalize from '../../../common/styles/normalize';
import { MapSearch } from './MapSearch';

export const MapSearchPage = () => {
  const mapStyle = MapStyles();
  const createOrderPayload = useSelector(createOrderPayloadSelectors.getState);
  const { mutate } = OrderService().useCreateOrder();
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const toast = useToast();

  const onSubmit = () => {
    mutate(createOrderPayload, {
      onSuccess(res) {
        toast.show({
          placement: 'bottom',
          status: 'success',
          title: 'Sifariş uğurla yaradıldı',
          width: normalize(324)
        });
        queryClient.invalidateQueries('/order/my');
        queryClient.invalidateQueries('/order/status-counts');
        navigation.navigate(AppScreens.CustomerBottomNavigator);
      },
      onError(err) {
        console.log('error');
      }
    });
  };

  return (

    <ScrollView flex={1} px={4}>
      <Text pb={5} pt={6} style={mapStyle.pageTitle}>{Labels.setAddress}</Text>
      <Box>
        <MapSearch />
      </Box>

      <Box flex={4} style={mapStyle.nextButton}>
        <Button
          variant="primary"
          onPress={onSubmit}
          title={Labels.next}
          shadow
          size="sm"
          buttonTextStyle={{ fontFamily: 'InterRegular', fontSize: 14 }}
        />
      </Box>
    </ScrollView>
  );
};
