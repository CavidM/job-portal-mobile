import React, { useState, useCallback } from 'react';
import { View } from 'react-native';
import _ from 'lodash';
import { useNavigation } from '@react-navigation/core';
import { useDispatch } from 'react-redux';
import { AlphabetList } from 'react-native-section-alphabet-list';
import { SearchableList } from '../../../components/SearchComponent/SearchableList';
import { InformationService } from '../../../services/information-service/Information.service';
import {
  setProfession
} from '../../../store/slices/specialInformation.slice';
import normalize from '../../common/styles/normalize';
import { SearchResultDivider } from '../../../components/SearchComponent/SearchResultDivider';
import {Labels} from "../../../core/Langs";

const SpecialInformationProfessionsList = () => {
  const informationService = InformationService();
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  const { data: professions, isLoading } = informationService.useGetSearchProfessions(value.replace('I', 'ı'));

  const dispatch = useDispatch();

  const onClickProfession = (profession: any) => {
    dispatch(setProfession(profession));
    navigation.goBack();
  };

  const onChange = useCallback(_.debounce((input) => {
    setValue(input);
  }, 300), []);

  const listData: any[] = [];
  professions?.data.data.map((a) => listData.push({ value: a.name, key: a.id }));

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
            <AlphabetList
              showsVerticalScrollIndicator={false}
              data={listData}
              indexLetterStyle={{
                fontSize: 11,
                color: 'black',
                fontFamily: 'InterRegular'
              }}
              renderCustomItem={(item) => (
                <SearchResultDivider
                  key={item.key}
                  text={item.value}
                  onPress={() => onClickProfession({ itemId: item.key, itemName: item.value })}
                />
              )}
              renderCustomSectionHeader={() => null}
              indexLetterContainerStyle={{ top: 0, height: 25, width: 50 }}
              style={{ marginTop: normalize(15), marginBottom: normalize(135) }}
              letterListContainerStyle={{ justifyContent: 'flex-start' }}
            />
          )}
        />
      </View>

    </View>
  );
};
export { SpecialInformationProfessionsList };
