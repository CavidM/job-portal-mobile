import { Alert, Platform, View } from 'react-native';
import {
  Box, Text, useToast, Center
} from 'native-base';
import React, { useMemo, useState } from 'react';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { Labels } from '../../../../core/Langs';
import Button from '../../../../components/button/Button';
import { UsersSearchResultStyle } from './UsersSearchResult.style';
import DatePicker from '../../../../components/Datepicker/Datepicker';
import { OrderService } from '../../../../services/order-service/Customer/Order.service';
import { AppScreens } from '../../../../routes/Navigator.types';
import { COLORS } from '../../../../core/theme/Constants';
import { FakeModal } from '../../../../components/FakeModal/FakeModal';

export const UsersSearchSchedulePage = () => {
  const [date, setDate] = useState<string>('');
  const styles = UsersSearchResultStyle();
  const navigation = useNavigation();
  const orderService = OrderService();
  const createScheduledOrder = orderService.useCreateScheduledOrder();
  const toast = useToast();

  const onSubmit = () => {
    if (!date) {
      Alert.alert('Tarix seçin');
      return;
    }
    createScheduledOrder.mutate({ untilToCheckDate: date }, {
      onSuccess() {
        navigation.navigate(AppScreens.CustomerBottomNavigator);
        toast.show({
          title: 'Sifariş yadda saxlanıldı.',
          placement: 'bottom',
          status: 'success',
          duration: 3000
        });
      },
      onError() {
        toast.show({
          title: 'Something went wrong. Try again later.',
          placement: 'bottom',
          status: 'error'
        });
      }
    });
  };

  const currentDate = useMemo(() => new Date(), []);

  return (
    <Box style={{
      flex: 1,
      height: '100%'
    }}
    >
      <FakeModal>
        <Box style={styles.scheduleTextWrapper} alignItems="center">
          <Text textAlign="center" style={styles.scheduleText}>
            {
              date
                ? `Sizin axtarışınız ${moment(date).format('YYYY-MM-DD')} tarixinə qədər aktiv qalacaq.`
                : 'Sizin axtarışınız seçəcəyiniz tarixə qədər aktiv qalacaq.'
            }
          </Text>
          <Text style={styles.scheduleText}>
            Nəticələr barədə məlumatlar dərhal bildiriləcəkdir.
          </Text>
        </Box>
        <DatePicker
          onChange={(newDate) => setDate(newDate)}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          minimumDate={currentDate}
          isOpen
          openWith={(open) => (
            <Button style={styles.scheduleDateButton} width={180} variant="outline" onPress={open} title="Tarixi dəyiş" size="sm">
              {/* <Text>Son axtarış tarixini dəyiş</Text> */}
            </Button>
          )}
        />
      </FakeModal>

      <View style={styles.submitButtonWrapper}>
        <Box justifyContent="center" flex={1}>
          <Button variant="primary" onPress={onSubmit} title={Labels.submit} shadow size="sm" />
        </Box>
      </View>
    </Box>
  );
};
