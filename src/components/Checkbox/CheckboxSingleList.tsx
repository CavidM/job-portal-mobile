import React, { useEffect, useState } from 'react';
import { View, ViewProps } from 'react-native';
import useStyles from './Checkbox.style';

interface CheckboxSingleListProps extends ViewProps {
  data: any[],
  render: (item: any, onClickItem: (e: any) => void, selected: any) => void,
  onChecked: (selected: any) => void,
  defaultValue?: any
}

export const CheckboxSingleList = (props: CheckboxSingleListProps) => {
  const {
    data, render, onChecked, defaultValue = undefined, ...rest
  } = props;
  const styles = useStyles();
  // @todo - selected default value 0
  const [selected, setSelected] = useState<string | number>(0);

  useEffect(() => {
    if (defaultValue) {
      setSelected(defaultValue);
    }
  }, [defaultValue]);

  const onClickItem = (value: any) => {
    if (selected === value) {
      setSelected(typeof value === 'string' ? '' : 0);
    } else {
      setSelected(value);
    }
  };

  useEffect(() => {
    onChecked(selected);
  }, [selected]);

  const { style } = rest;

  return (
    <View style={[styles.CheckboxList, style]}>
      {data?.map((item: any) => render(item, onClickItem, selected))}
    </View>
  );
};
