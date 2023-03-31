import React, { useEffect, useState } from 'react';
import { View, ViewProps } from 'react-native';
import useStyles from './Checkbox.style';

interface CheckboxMultipleListProps extends ViewProps{
  data: any[] | undefined
  render: (data:any, onClickItem: (e:any)=>void, selectedItems: any) => void
  onChecked: (selected: number[] | any[]) => void
  defaultSelectedItemsIds?: number[]
}

const selectedItems = new Set();

export const CheckboxMultipleList = (props: CheckboxMultipleListProps) => {
  const {
    data, render, onChecked, defaultSelectedItemsIds, ...rest
  } = props;
  const styles = useStyles();
  const [count, setCount] = useState();
  const onClickItem = (value: any) => {
    if (selectedItems.has(value)) {
      selectedItems.delete(value);
    } else {
      selectedItems.add(value);
    }
    setCount(selectedItems.size);
  };
  useEffect(() => {
    defaultSelectedItemsIds?.forEach((item: any) => selectedItems.add(item));
  }, []);
  useEffect(() => {
    onChecked([...selectedItems]);
  }, [count]);
  return (
    <View style={[styles.CheckboxList, { ...rest.style }]}>
      {data?.map((item: any) => render(item, onClickItem, selectedItems))}
    </View>
  );
};
