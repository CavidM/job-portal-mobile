import { FlatList } from 'react-native';
import React from 'react';
import { FlatListEndComponent } from './FlatListEndComponent';

interface FlatListProps{
  isLoading: boolean,
  hasNextPage: boolean | undefined,
  reFetch: ()=> void,
  fetchNextPage: ()=> void,
  isFetchingNextPage: boolean,
  renderItem: any,
  data: any
}
export const FlatListComponent = (props:FlatListProps) => {
  const {
    reFetch, isLoading, hasNextPage, fetchNextPage,
    isFetchingNextPage, renderItem, data
  } = props;

  const onRefresh = () => {
    reFetch();
  };

  const onScroll = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      onEndReached={onScroll}
      onEndReachedThreshold={0.1}
      keyExtractor={(item) => item.id?.toString()}
      ListFooterComponent={(
        <FlatListEndComponent
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          dataLength={data?.length}
        />
                        )}
      onRefresh={onRefresh}
      refreshing={isLoading && isFetchingNextPage}
      showsVerticalScrollIndicator={false}
    />

  );
};
