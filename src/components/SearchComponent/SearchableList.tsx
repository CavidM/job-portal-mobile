import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View
} from 'react-native';
import { HStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { SearchBar } from './SearchBar';
import { ClearSearchButton } from './ClearSearchButton';
import normalize from '../../pages/common/styles/normalize';
import { SearchResultDivider } from './SearchResultDivider';
import Loader from '../Loader/Loader';
import useFontStyles from '../common/font.style';
import { Labels } from '../../core/Langs';

interface SearchableListProps {
  data?: { id: any, name: string }[]
  onChangeSearch: (value: string) => void
  onClearSearch: () => void,
  isLoading: boolean,
  onClickItem?: (id: string | number) => void,
  renderItem?: React.ReactNode | undefined,
  searchBarPlaceHolder: string
}

export const SearchableList: React.FC<SearchableListProps> = (props) => {
  const {
    data,
    onChangeSearch,
    onClearSearch,
    isLoading,
    onClickItem,
    renderItem,
    searchBarPlaceHolder
  } = props;

  const [searchValue, setSearchValue] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
  const onPressClear = () => {
    onClearSearch();
    setSearchValue('');
  };

  const onChangeSearchText = (value: any) => {
    setSearchValue(value);
  };

  useEffect(() => {
    onChangeSearch(searchValue);
  }, [searchValue]);
  const fontStyle = useFontStyles();
  const navigation = useNavigation();

  return (
    <View>
      <HStack space={3}>
        <View style={{ width: '85%' }}>
          <SearchBar
            style={[
              fontStyle.fontFamilyInterMedium,
              {
                height: normalize(37),
                paddingBottom: normalize(10)
              }]}
            onChangeText={onChangeSearchText}
            placeholder={searchBarPlaceHolder}
            value={searchValue}
          />
        </View>

        <ClearSearchButton onPress={() => navigation.goBack()} />

      </HStack>
      {
        isLoading && <Loader />
      }

      {
        !isLoading && (
          renderItem || (
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
                      onPress={() => onClickItem(item.id)}
                    />
                  ))
                }
              </View>
            </ScrollView>
          )

        )
      }
    </View>

  );
};
