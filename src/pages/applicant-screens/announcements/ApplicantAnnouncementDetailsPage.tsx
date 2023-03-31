import { View } from 'react-native';
import React from 'react';
import { Button, ScrollView, Text } from 'native-base';
import { ThemeContextType, useTheme } from '../../../core/theme/Theme';
import Loader from '../../../components/Loader/Loader';
import useStyles from '../../../components/Card/CardList.style';
import { AnnouncementService } from '../../../services/announcement-service/Customer/Announcement.service';
import { CustomerAnnouncementDetailsCard } from '../../customer-screens/announcements/CustomerAnnouncementsCard/CustomerAnnouncementDetailsCard';
import normalize from '../../common/styles/normalize';
import { Labels } from '../../../core/Langs';
import { Call, Email } from '../../../tools/call/Linking';
import { CallIcon } from '../../../components/Icons/CallIcon';
import { MailIcon } from '../../../components/Icons/MailIcon';
import useFontStyles from '../../../components/common/font.style';

const announcementService = AnnouncementService();

export const ApplicantAnnouncementsDetailsPage = ({ route }: any) => {
  const styles = useStyles();
  const { theme } = useTheme() as ThemeContextType;
  const fontStyle = useFontStyles();
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
              <Button.Group
                variant="solid"
                mb={7}
                space={4}
                maxWidth={300}
              >
                <Button
                  onPress={() => Call(`${announcementData?.phoneNumber}`)}
                  startIcon={<CallIcon />}
                  style={{
                    backgroundColor: theme.palette.CustomerColor,
                    width: normalize(153),
                    height: normalize(44),
                    borderRadius: 10
                  }}
                >
                  <Text style={[styles.callButtonText, fontStyle.fontFamilyInterRegular]}>
                    {Labels.call}
                  </Text>
                </Button>

                <Button
                  onPress={() => Email(`${announcementData?.emailAddress}`)}
                  style={{
                    borderColor: theme.palette.CustomerColor,
                    width: normalize(153),
                    height: normalize(44),
                    borderRadius: 10,
                    borderWidth: 2,
                    paddingBottom: 0,
                    paddingTop: 0
                  }}
                  startIcon={<MailIcon />}
                  variant="outline"
                  colorScheme="blue"
                >
                  <Text color={theme.palette.CustomerColor}>Email</Text>
                </Button>
              </Button.Group>
            </View>
          )}
      </View>
    </ScrollView>

  );
};
