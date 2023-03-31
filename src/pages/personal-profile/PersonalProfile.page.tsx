import * as React from 'react';
import {
  Text, ScrollView, TouchableOpacity, StyleSheet
} from 'react-native';
import { Button, HStack, View } from 'native-base';
import { AirbnbRating } from 'react-native-ratings';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CardListProfile from '../../components/Card/CardProfile/CardListProfile';
import useFontStyles from '../../components/common/font.style';
import { useLayoutStyles } from '../common/styles/LayoutStyles';
import { usePersonalProfileStyles } from './PersonalProfile.style';
import { UserDTO, UserProfessionsDTO } from '../../services/user-service/UserService.types';
import { CardListProfileItem, CardListItemProps } from '../../components/Card/CardProfile/CardListProfileItem';
import { Labels } from '../../core/Langs';
import { Lang } from '../../tools/LangTools';
import { UserPhotoServiceGetType } from '../../services/user-photo-service/UserPhotoService.types';
import { RegistrationContextType, useRegistration, UserTypeApplicant } from '../../context/Registration.context';
import { ThemeContextType, useTheme } from '../../core/theme/Theme';
import { EditIcon } from '../../components/Icons/EditIcon';
import { UserPhotoUploadContainer } from '../common/upload-photo/UserPhotoUploadContainer';
import MainScreenHeaderBar from '../common/main-screen-header/MainScreenHeaderBar';
import {saveUserNameToRedux, saveUserPhotoToRedux} from '../../store/slices/userInfo';
import { CheckElementOutline, CheckListWrapperOutline } from '../../components/Checkbox/CheckboxElements';
import { RadioList } from '../../components/Checkbox/RadioList';
import normalize from '../common/styles/normalize';
import { GenderTypesLabels } from '../../core/Constants';
import { InformationIcon } from '../../components/Icons/InformationIcon';
import PlusCountIcon from '../../components/Icons/PlusCountIcon';

interface PersonalProfilePageProps {
  personalData?: UserDTO
  specialData?: UserProfessionsDTO[]
  userPhoto?: UserPhotoServiceGetType
  cityData?: any
  navigation: any
}
const PersonalProfilePage = (props: PersonalProfilePageProps) => {
  const { theme } = useTheme() as ThemeContextType;
  const styles = useLayoutStyles();
  const pageStyle = usePersonalProfileStyles();
  const fontStyle = useFontStyles();
  const { userType } = useRegistration() as RegistrationContextType;
  const dispatch = useDispatch();

  const {
    personalData, specialData, userPhoto, navigation, cityData, userRating, userRateVoteCount
  } = props;
  const defaultImage = userPhoto?.fileData ? `data:image/jpeg;base64,${userPhoto?.fileData}` : null;

  useEffect(() => {
    dispatch(saveUserNameToRedux(`${personalData?.firstName} ${personalData?.lastName}`));
  }, [personalData, defaultImage]);

  useEffect(() => {
    dispatch(saveUserPhotoToRedux(defaultImage));
  }, [defaultImage]);

  const [selectedTab, setSelectedTab] = useState('first');

  const tabs = [{
    label: 'Ümumi',
    value: 'first'
  },
  {
    label: 'Peşə',
    value: 'second'
  }];

  const personalInfo: CardListItemProps[] = [
    {
      key: personalData?.gender,
      value: GenderTypesLabels[personalData?.gender],
      label: Lang.getLang('gender')
    },
    {
      key: personalData?.birthDate,
      value: personalData?.birthDate,
      label: Lang.getLang('birthDate')
    },
    {
      key: cityData?.id,
      value: cityData?.name,
      label: Lang.getLang('city')
    },
    {
      key: personalData?.fin,
      value: personalData?.fin,
      label: 'FİN kod və ya 7 simvollu istənilən loqin'
    },
    {
      key: personalData?.phoneNumber,
      value: personalData?.phoneNumber,
      label: Lang.getLang('phoneNumber')
    }
  ];

  const specialInfo: { id: string, data: CardListItemProps[][] } |
    undefined = specialData?.map((data) => (
      {
        professionId: data.id,
        status: data.status,
        jobRating: data.jobRating,
        jobVoteCount: data.jobVoteCount,
        professionDetails: [{
          key: data.professionDTO.id,
          label: Labels.profession,
          value: data.professionDTO.name
        },
        {
          key: data.specificationDTO.id,
          label: Labels.specifications,
          value: data.specificationDTO.name
        },
        {
          key: data.experience,
          label: Labels.experience,
          value: `${data.experience} il`
        },
        {
          key: `${data.minSalary}${data.maxSalary}`,
          label: Labels.expectedSalary,
          value: (!data.minSalary && !data.maxSalary) ? Labels.onAgreedPrice : `${data.minSalary} - ${data.maxSalary}`
        }
        ]
      }));

  const { color } = theme.palette;

  return (
    <ScrollView showsVerticalScrollIndicator={false} bounces={false} stickyHeaderIndices={[0]}>
      <MainScreenHeaderBar />
      <View style={styles.headerBarStyle} />
      <View style={{
        bottom: normalize(25),
        alignItems: 'center'
      }}
      >
        <UserPhotoUploadContainer defaultImage={defaultImage} />
        <Text style={[pageStyle.personName, fontStyle.fontFamilyInterRegular]}>
          {`${personalData?.firstName || ''} ${personalData?.lastName || ''}`}
        </Text>
        <View style={pageStyles.raitingView}>
          <AirbnbRating
            isDisabled
            size={18}
            showRating={false}
            defaultRating={userRating?.toFixed()}
            mb-1
          />
          <Text style={pageStyles.raitingText}>
            {userRating?.toFixed(1)}
            <Text style={{ fontWeight: '300' }}>
              {' '}
              (
              {userRateVoteCount}
              {' '}
              {Labels.vote}
              )
            </Text>
          </Text>
        </View>
      </View>

      <View style={styles.pageBodyWrapper}>
        <View style={styles.container}>
          {userType === UserTypeApplicant && (
            <CheckListWrapperOutline
              style={{ backgroundColor: color.white, marginBottom: 20 }}
            >
              <RadioList
                onChecked={(checkedItem: any) => setSelectedTab(checkedItem)}
                data={tabs}
                defaultValue={selectedTab}
                style={{
                  backgroundColor: '#F6F6F6', padding: 2, borderRadius: 8, borderColor: color.white
                }}
                render={(data: any, onClickItem: (e: any) => void, selectedItem: any) => (
                  <CheckElementOutline
                    checkboxItemStyle={{
                      width: '50%',
                      borderWidth: 3,
                      borderColor: 'white',
                      borderRadius: normalize(8),
                      height: normalize(37)
                    }}
                    key={data.value}
                    label={data.label}
                    onPress={() => onClickItem(data.value)}
                    selected={selectedItem === data.value}
                    selectedItemLabelColor={{ color: color.white }}
                    selectedItemBgColor={{ backgroundColor: color.primary }}
                    labelStyle={[{ fontSize: 14, color: color.dark },
                    fontStyle.fontFamilyInterSemiBold]}
                    icon={(
                      <InformationIcon
                        pathProps={{ stroke: color.white }}
                        svgProps={{ fill: color.dark, width: 20, height: 20 }}
                      />
                    )}
                    selectedItemIcon={(
                      <InformationIcon
                        pathProps={{ stroke: color.primary }}
                        svgProps={{ fill: color.white, width: 20, height: 20 }}
                      />
                    )}
                  />
                )}
              />
            </CheckListWrapperOutline>
          )}
          {
            selectedTab === 'first'
              ? (
                <View style={pageStyles.tabContentStyle}>
                  <CardListProfile backgroundColor="#fff" width="100%">
                    <HStack justifyContent="space-between">
                      <View>
                        {personalInfo.map((data) => (
                          <CardListProfileItem
                            key={data.key}
                            label={data.label}
                            value={data.value}
                          />
                        ))}
                      </View>
                      <View style={{
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end'
                      }}
                      >
                        <TouchableOpacity onPress={() => navigation.navigate('ProfileEdit', {
                          phoneNumber: personalData?.phoneNumber,
                          cityid: cityData.id
                        })}
                        >
                          <EditIcon
                            pathPenCoverProps={{ stroke: color.primary }}
                            pathPenProps={{ stroke: color.primary }}
                            ellipseProps={{ fill: 'none' }}
                          />
                        </TouchableOpacity>
                      </View>
                    </HStack>

                  </CardListProfile>
                </View>
              )
              : (
                <View style={pageStyles.tabContentStyle}>
                  {specialInfo?.map((data) => (
                    <CardListProfile backgroundColor="#fff" opacity={data.status === 'INACTIVE' ? 0.5 : 1} width="100%">
                      <HStack justifyContent="space-between">
                        <View style={{ width: 170 }}>
                          {data.professionDetails.map((item) => (
                            <CardListProfileItem
                              key={item.key}
                              value={item.value}
                              label={item.label}
                            />
                          ))}
                        </View>
                        <View style={{
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          alignItems: 'flex-end'
                        }}
                        >
                          <View style={pageStyles.raitingView}>
                            <AirbnbRating
                              isDisabled
                              size={18}
                              showRating={false}
                              defaultRating={data?.jobRating?.toFixed()}
                              mb-1
                            />
                            <Text style={pageStyles.raitingText}>
                              {data.jobRating?.toFixed(1)}
                              <Text style={{ fontWeight: '300' }}>
                                {' '}
                                (
                                {data.jobVoteCount}
                                {' '}
                                {Labels.vote}
                                )
                              </Text>
                            </Text>
                          </View>
                          <TouchableOpacity onPress={() => navigation.navigate('ProfessionEdit', data)}>
                            <EditIcon
                              pathPenCoverProps={{ stroke: color.primary }}
                              pathPenProps={{ stroke: color.primary }}
                              ellipseProps={{ fill: 'none' }}
                            />
                          </TouchableOpacity>
                        </View>
                      </HStack>
                    </CardListProfile>
                  ))}
                  <View style={{
                    display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'flex-end'
                  }}
                  >
                    <Button
                      style={{ borderWidth: 2, borderColor: color.primary, marginBottom: 30 }}
                      variant="outline"
                      color="#fff"
                      width={150}
                      size="sm"
                      endIcon={<PlusCountIcon pathProps={{ fill: color.primary }} />}
                      onPress={() => navigation.navigate('ProfessionAdd')}
                      backgroundColor="transparent"
                    >
                      <Text style={[{
                        color: theme.palette.ApplicantColor,
                        fontSize: 14,
                        marginRight: 5
                      },
                      fontStyle.fontFamilyInterSemiBold]}
                      >
                        Peşə əlavə et
                      </Text>
                    </Button>
                  </View>
                </View>
              )
          }
        </View>
      </View>

    </ScrollView>
  );
};

const pageStyles = StyleSheet.create({
  raitingView: {
    display: 'flex',
    alignItems: 'flex-end'
  },
  raitingText: {
    marginTop: 2,
    fontSize: 12,
    lineHeight: 12,
    fontWeight: '500',
    color: '#979797'
  },
  tabContentStyle: {
    width: normalize(320)
  }
});

export default PersonalProfilePage;
