import React, {
  useCallback,
  useEffect,
  useState
} from 'react';
import { View } from 'react-native';
import { ScrollView, Text, useToast } from 'native-base';
import { useQueryClient } from 'react-query';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { SearchableList } from '../../../components/SearchComponent/SearchableList';
import { CheckElementWhite, CheckListWrapper } from '../../../components/Checkbox/CheckboxElements';
import { CheckboxMultipleList } from '../../../components/Checkbox/CheckboxMultipleList';
import PlusCountIcon from '../../../components/Icons/PlusCountIcon';
import XIcon from '../../../components/Icons/XIcon';
import normalize from '../../common/styles/normalize';
import { InformationService } from '../../../services/information-service/Information.service';
import { AnnouncementService } from '../../../services/announcement-service/Applicant/ApplicantAnnouncement.service';
import { ThemeContextType, useTheme } from '../../../core/theme/Theme';
import Button from '../../../components/button/Button';
import { Labels } from '../../../core/Langs';
import useStyles from '../../customer-screens/service-order/users-search-form/UsersSearchForm.style';
import useFontStyles from '../../../components/common/font.style';
import { AppScreens } from '../../../routes/Navigator.types';
import { announcementsFilterSelectors } from '../../../store/slices/announcements.slice';
import CenterView from "../../../components/CenterView/CenterView";
import Loader from "../../../components/Loader/Loader";
import {userInfoSelectors} from "../../../store/slices/userInfo";
import _ from "lodash";

const informationService = InformationService();
const announcementService = AnnouncementService();
export const AnnouncementSpecificationsListPage = () => {
  const styles = useStyles();
  const fontStyles = useFontStyles();
  const toast = useToast();
  const { theme } = useTheme() as ThemeContextType;
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const { color } = theme.palette;

  const announcementFilter = useSelector(announcementsFilterSelectors.getAnnouncementFilter);
  const professionId = useSelector(userInfoSelectors.getUserProfessionId)
  const announcementSpecifications = useSelector(announcementsFilterSelectors.getAnnouncementsSpecifications);
  const [searchValue, setSearchValue] = useState()

  const { data: specificationsBySearchParamData, isLoading } = informationService.useGetSpecifications(searchValue);
  const { mutate: addSpecifications } = announcementService.useAddAnnouncementSpecification();
  const { mutate: deleteSpecifications } = announcementService.useDeleteAnnouncementSpecification();
  const {
    data: userSpecifications,
    isLoading: isUserSpecificationLoading
  } = informationService.useSpecificationsProfession(professionId);

  const specificationsBySearchParam = specificationsBySearchParamData?.data.data;
  const [selectedSpecification, setSelectedSpecification] = useState();
  const [specifications, setSpecifications ] = useState<any[]>();
  const array = announcementSpecifications.concat(userSpecifications?.data?.data);
  let specificationsById: any[] = [];
  const id = 'id';
  if(userSpecifications){
    specificationsById = [...new Map(array.map(item =>
        [item[id], item])).values()];
  }
  useEffect(()=>{
    setSpecifications(specificationsById);
  }, [userSpecifications])

  const onClickSpecifications = (element: number | undefined) => {
    if (element) {
      if (announcementFilter.specificationsIds?.includes(element)) {
        deleteSpecifications(element, {
          onSuccess: () => {
            queryClient.invalidateQueries('/announcement-profession-specifications');
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
      } else {
        addSpecifications(element, {
          onSuccess: () => {
            queryClient.invalidateQueries('/announcement-profession-specifications');
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
      }
    }
  };

  const onChange = useCallback(_.debounce((search) => {
        setSearchValue(search)
  }, 300), []);

  useEffect(() => {
    if(searchValue !== ''){
      setSpecifications(specificationsBySearchParam?.slice(0,50));
    } else{
      setSpecifications(specificationsById);
    }
  }, [specificationsBySearchParam, searchValue])


  if (isUserSpecificationLoading) {
    return <CenterView><Loader /></CenterView>;
  }

  return (
    <>
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 70
      }}
      >
        <View style={{ width: '90%' }}>
          <SearchableList
            onChangeSearch={(search)=>onChange(search)}
            onClearSearch={() => null}
            isLoading={false}
            searchBarPlaceHolder='Digər peşələri axtar ...'
            renderItem={(
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    style={{ marginTop: normalize(15), marginBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                >
                  <CheckListWrapper>
                    <CheckboxMultipleList
                        style={{ flexDirection: 'column', alignItems: 'flex-start' }}
                        onChecked={() => onClickSpecifications(selectedSpecification)}
                        data={specifications}
                        defaultSelectedItemsIds={announcementFilter.specificationsIds}
                        render={(data: any, onClickItem: (e: any) => void, selectedItems: any) => (
                            <CheckElementWhite
                                key={data?.id}
                                label={data?.name}
                                onPress={() => {
                                  onClickItem(data?.id);
                                  setSelectedSpecification(data?.id);
                                }}
                                selected={selectedItems.has(data?.id)}
                                labelStyle={{ color: color.lightBlack, width: '90%' }}
                                style={{
                                  paddingVertical: 12,
                                  borderWidth: 0,
                                  borderBottomWidth: 1,
                                  borderColor: color.inputBorderColor,
                                  borderRadius: 5,
                                  marginVertical: 0.5,
                                  width: '100%',
                                  justifyContent: 'space-between'
                                }}
                                icon={<PlusCountIcon pathProps={{ fill: color.primary }} />}
                                selectedItemIcon={<XIcon pathProps={{ fill: color.lightBlack }} />}
                            />
                        )}
                    />
                  </CheckListWrapper>
                </ScrollView>
            )}
          />
        </View>
      </View>
      <View style={styles.JobFilterApplyButton}>
        <Text
          style={fontStyles.fontFamilyInterRegular}
          fontSize="sm"
          mt={4}
        >
          {announcementFilter.specificationsIds?.length}
          {' '}
          spesifikasiya seçilib
        </Text>
        <Button
          buttonTextStyle={[{ fontSize: normalize(14) }, fontStyles.fontFamilyInterMedium]}
          variant="primary"
          onPress={() => navigation.navigate(AppScreens.ApplicantAnnouncementsFilter)}
          title={Labels.next}
          size="sm"
        />
      </View>
    </>
  );
};
