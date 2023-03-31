import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import useStyles from './Checkbox.style';

export const RadioList = ({
  data, render, onChecked, defaultValue = undefined
}: any) => {
  const styles = useStyles();
  const [selected, setSelected] = useState<string | number>('');

  useEffect(() => {
    if (defaultValue) {
      setSelected(defaultValue);
    }
  }, [defaultValue]);

  const onClickItem = (value: any) => {
    setSelected(value);
  };

  useEffect(() => {
    onChecked(selected);
  }, [selected]);

  return (
    <View style={[styles.CheckboxList]}>
      {data.map((item: any) => render(item, onClickItem, selected))}
    </View>
  );
};
