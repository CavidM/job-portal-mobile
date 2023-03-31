import { View } from 'react-native';
import React from 'react';
import { ScrollView } from 'native-base';
import { ThemeContextType, useTheme } from '../../../core/theme/Theme';
import Loader from '../../../components/Loader/Loader';
import useStyles from '../../../components/Card/CardList.style';
import { CustomerAnnouncementDetailsCard } from './CustomerAnnouncementsCard/CustomerAnnouncementDetailsCard';
import { AnnouncementService } from '../../../services/announcement-service/Customer/Announcement.service';
import { DeleteAnnouncementButton } from './DeleteAnnouncement';

const announcementService = AnnouncementService();

export const CustomerAnnouncementsDetailsPage = ({ route }: any) => {
  const styles = useStyles();
  const { theme } = useTheme() as ThemeContextType;
  const { id } = route?.params;
  const {
    data: AnnouncementDetailsData, isLoading
  } = announcementService.useGetCustomerAnnouncementDetails(id);

  const announcementData = AnnouncementDetailsData?.data.data;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, alignItems: 'center', marginTop: 20 }}>
        {isLoading ? <Loader />
          : (
            <View>
              <View
                style={
                 [styles.card, styles.cardOrders, { backgroundColor: theme.palette.color.white }]
                      }
              >
                <View style={styles.cardListWrapper}>
                  <CustomerAnnouncementDetailsCard
                    {...announcementData}
                  />
                </View>
              </View>
              <DeleteAnnouncementButton announcementId={id} />
            </View>

          )}
      </View>
    </ScrollView>

  );
};
