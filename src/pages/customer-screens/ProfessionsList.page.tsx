import React, {
  useCallback, useEffect, useState
} from 'react';
import { View } from 'react-native';
import _ from 'lodash';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { AlphabetList } from 'react-native-section-alphabet-list';
import { SearchableList } from '../../components/SearchComponent/SearchableList';
import { InformationService } from '../../services/information-service/Information.service';
import { AppScreens } from '../../routes/Navigator.types';
import {
  setProfession,
  setSpecification
} from '../../store/slices/orderUsersSearchParams.slice';
import normalize from '../common/styles/normalize';
import { SearchResultDivider } from '../../components/SearchComponent/SearchResultDivider';
import {Labels} from "../../core/Langs";

export const ProfessionsListPage = ({ route }: any) => {
  const { NextScreen } = route?.params;
  const informationService = InformationService();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [value, setValue] = useState('');
  const [professionId, setProfessionId] = useState(0);

  const { data: professions, isLoading } = informationService.useGetSearchProfessions(value.replace('I', 'ı'));
  const { data: specifications } = informationService.useSpecificationsProfession(professionId);

  // debounce user input value, we do not want to send request on every typing
  const onChange = useCallback(_.debounce((input) => {
    setValue(input);
  }, 300), []);

  const onClickProfession = (id: number) => {
    setProfessionId(id);
  };

  // run this effect when profession id changes
  // and app will request specifications for this profession id
  useEffect(() => {
    const specificationsData = specifications?.data.data;

    // check if there is any specifications and navigate to related page if there is
    if (specificationsData && specificationsData.length > 0) {
      dispatch(setProfession(professionId));
      navigation.navigate(AppScreens.ServiceOrderSpecifications, {
        professionId,
        NextScreen
      });
    }

    // if there is no specifications redirect to search form
    if (specificationsData && specificationsData.length === 0) {
      dispatch(setProfession(professionId));
      dispatch(setSpecification(null));
      navigation.navigate(NextScreen);
    }
  }, [professionId, specifications?.data.data.length]);

  // handle screen focus. if screen is not focused clear profession id
  useEffect(() => function cleanup() {
    if (!isFocused) {
      setProfessionId(0);
    }
  }, [isFocused]);
  const listData : any[] = [];
  professions?.data.data.map((a) => listData.push({ value: a.name, key: a.id }));
  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginTop: normalize(60, 'height')
    }}
    >
      <View style={{ width: '90%' }}>
        <SearchableList
          data={professions?.data.data || []}
          onChangeSearch={onChange}
          onClearSearch={() => null}
          isLoading={isLoading}
          onClickItem={onClickProfession}
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
                  onPress={() => onClickProfession(item.key)}
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
