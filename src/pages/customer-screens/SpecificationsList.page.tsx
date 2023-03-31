import { Alert, View } from 'react-native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { SearchableList } from '../../components/SearchComponent/SearchableList';
import { InformationService } from '../../services/information-service/Information.service';
import {
  setProfession,
  setSpecification
} from '../../store/slices/orderUsersSearchParams.slice';
import normalize from '../common/styles/normalize';
import {Labels} from "../../core/Langs";

// @todo. type definition is missed
export const SpecificationsListPage = ({ route }) => {
  const { params } = route;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');

  const informationService = InformationService();

  const {
    data: specifications,
    isLoading
  } = informationService.useSpecificationsProfession(params.professionId);

  const onChange = (input) => {
    setSearch(input);
  };

  const onClickSpecification = (id) => {
    dispatch(setSpecification(id));
    navigation.navigate(params?.NextScreen);
  };

  let data = specifications?.data.data;

  if (search) {
    data = data.filter((item) => item.name.startsWith(search.replace('I', 'ı')));
  }

  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginTop: normalize(60, 'height')
    }}
    >
      <View style={{ width: '90%', marginBottom: 90 }}>
        <SearchableList
          data={data || []}
          onChangeSearch={onChange}
          onClearSearch={() => null}
          isLoading={isLoading}
          onClickItem={onClickSpecification}
          searchBarPlaceHolder={`${Labels.search} ...`}
        />
      </View>
    </View>
  );
};
