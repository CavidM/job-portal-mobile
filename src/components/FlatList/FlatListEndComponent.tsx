import { Text } from 'native-base';
import React from 'react';
import { Labels } from '../../core/Langs';
import { useLayoutStyles } from '../../pages/common/styles/LayoutStyles';

interface FlatListEndComponentProp {
  dataLength: number,
  hasNextPage?: boolean,
  isFetchingNextPage?: boolean
}

export const FlatListEndComponent = (props: FlatListEndComponentProp) => {
  const { dataLength, hasNextPage, isFetchingNextPage } = props;
  const styles = useLayoutStyles();
  let labels = null;

  if (dataLength === 0) {
    labels = Labels.noItem;
  }

  if (isFetchingNextPage) {
    labels = `${Labels.loading}...`;
  }
  if (!hasNextPage && dataLength > 6) {
    labels = Labels.endOfPage;
  }

  return (
    <Text style={styles.ListFooterComponentText}>
      {labels}
    </Text>
  );
};
