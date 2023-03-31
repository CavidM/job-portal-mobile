import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useDispatch } from 'react-redux';
import { SearchableList } from '../../../components/SearchComponent/SearchableList';
import { InformationService } from '../../../services/information-service/Information.service';
import {
  setSpecification
} from '../../../store/slices/specialInformation.slice';
import normalize from '../../common/styles/normalize';
import { SearchResultDivider } from '../../../components/SearchComponent/SearchResultDivider';
import {Labels} from "../../../core/Langs";

export const SpecialInformationSpecificationsList = ({ route }) => {
  const { params } = route;
  const informationService = InformationService();
  const navigation = useNavigation();
  const {
    data: specifications,
    isLoading
  } = informationService.useSpecificationsProfession(params.professionId);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const onClickProfession = (profession: any) => {
    dispatch(setSpecification(profession));
    navigation.goBack();
  };
  let data = specifications?.data.data;
  const onChange = (input: string) => {
    setSearch(input);
  };
  if (search) {
    data = data?.filter((item) => item.name.includes(search.replace('I', 'ı')));
  }
  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginTop: 70
    }}
    >
      <View style={{ width: '90%' }}>
        <SearchableList
          onChangeSearch={onChange}
          onClearSearch={() => null}
          isLoading={isLoading}
          searchBarPlaceHolder={`${Labels.search} ...`}
          renderItem={(
            <ScrollView
              keyboardShouldPersistTaps="handled"
              style={{ marginTop: normalize(15) }}
              showsVerticalScrollIndicator={false}
            >
              <View>
                {
                  data?.map((item) => (
                    <SearchResultDivider
                      key={item.id}
                      text={item.name}
                      onPress={() => onClickProfession({ itemId: item.id, itemName: item.name })}
                    />
                  ))
                }
              </View>
            </ScrollView>
          )}
        />
      </View>

    </View>
  );
};
