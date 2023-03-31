import React, { useEffect, useState } from 'react';
import {
  Box, FlatList, Text as NText
} from 'native-base';
import {
  Text, TouchableWithoutFeedback, View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { UsersSearchResultItem } from './UsersSearchResultItem';
import Button from '../../../../components/button/Button';
import { UsersSearchResultStyle } from './UsersSearchResult.style';
import { OrderService } from '../../../../services/order-service/Customer/Order.service';
import { orderUserSearchParamsSelector } from '../../../../store/slices/orderUsersSearchParams.slice';
import { setUsers } from '../../../../store/slices/createOrderPayload';
import { AppScreens } from '../../../../routes/Navigator.types';
import { Labels } from '../../../../core/Langs';
import { ButtonVariantTypes, COLORS } from '../../../../core/theme/Constants';
import { FakeModal } from '../../../../components/FakeModal/FakeModal';
import Loader from '../../../../components/Loader/Loader';

// create getOrderUsersBySearchParams service for retrieving users by search params
// create getOrderUsersBySearchParams type definitions
// create mock service for getOrderUsersBySearchParams api

const isElementsDefined = (elements: unknown) => elements !== undefined;
const hasElements = (elements: unknown) => (elements !== undefined && elements !== 0);

const NotificationModal = () => {
  const navigation = useNavigation();
  const styles = UsersSearchResultStyle();
  return (
    <FakeModal modalWrapperStyle={{ backgroundColor: COLORS.cardBorderColor }}>
      <NText marginBottom={5} style={styles.scheduleText}>
        Hörmətli istifadəçi. Axtarış nəticəsi olaraq heç bir istifadəçi tapılmadı.
        Axtarış prosesini davam etdirmək üçün tarixi seçin.
      </NText>
      <Button
        variant="primary"
        width="60%"
        title="Tarixi təyin et"
        size="sm"
        onPress={() => navigation.navigate(AppScreens.ServiceOrderUsersSearchSchedule)}

      />
    </FakeModal>
  );
};

export const UsersSearchResultPage = () => {
  const styles = UsersSearchResultStyle();
  const requestParams = useSelector(orderUserSearchParamsSelector.getParams);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [notificationModalVisibility, setNotificationModalVisibility] = useState(false);
  const isFocused = useIsFocused();

  const orderService = OrderService();
  const {
    data, mutate, isLoading, isSuccess
  } = orderService.useGetOrderUsersBySearchParams();
  const totalElements = data?.data.data.totalElements;

  useEffect(() => {
    mutate(requestParams);
  }, []);

  const componentData = data?.data.data.data.map((item) => ({
    id: item.userId,
    avatar: item.userPhotoDTO,
    fullName: `${item.firstName} ${item.lastName}`,
    profession: item.userProfessionDTO.professionDTO?.name || '',
    specification: item.userProfessionDTO.specificationDTO?.name || '',
    professionStarCount: item.professionStarCount,
    personalStarCount: item.personalStarCount,
    selected: selectedItems.has(item.userId)
  }));

  const onClickItem = (itemId:any) => {
    const userIds = new Set(selectedItems);

    if (userIds.has(itemId)) {
      userIds.delete(itemId);
    } else {
      userIds.add(itemId);
    }

    setSelectedItems(userIds);
  };

  const onSubmit = () => {
    dispatch(setUsers([...selectedItems]));
    navigation.navigate(AppScreens.ServiceOrderMapSearch);
  };

  const submitButtonVariant: ButtonVariantTypes = (hasElements(totalElements) && selectedItems.size > 0) ? 'primary' : 'default';
  const isSubmitButtonDisable = !hasElements(totalElements) || (selectedItems.size === 0);

  useEffect(() => {
    if (isSuccess && !hasElements(totalElements)) {
      setNotificationModalVisibility(true);
    }
  }, [isSuccess, totalElements]);

  return (
    <Box style={{
      flex: 1,
      height: '100%'
    }}
    >

      {
        isLoading
          && (
          <Loader />
          )
      }

      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
      }}
      >
        {
          notificationModalVisibility && isFocused && <NotificationModal />
        }
        {
          !notificationModalVisibility && (
          <FlatList
            data={componentData || []}
            renderItem={(item) => (
              <TouchableWithoutFeedback onPress={() => onClickItem(item.item.id)}>
                <View>
                  <UsersSearchResultItem {...item.item} />
                </View>
              </TouchableWithoutFeedback>
            )}
            keyExtractor={(item) => item.id?.toString()}
            showsVerticalScrollIndicator={false}
          />
          )
        }
      </View>

      <View style={styles.submitButtonWrapper}>
        <Text style={styles.searchResultLabel}>
          { isElementsDefined(totalElements) ? `${totalElements} ${Labels.resultFound} ` : '' }

          {(hasElements(totalElements))
          && `(${selectedItems.size} ${Labels.selected})`}

        </Text>
        <Button variant={submitButtonVariant} disabled={isSubmitButtonDisable} onPress={onSubmit} title={Labels.apply} shadow size="sm" />
      </View>
    </Box>
  );
};
