import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { SliderComponent } from './Slider';
import { ManatIcon } from '../Icons/ManatIcon';

export const SliderContainer = () => {
  const [multiSliderValue, setMultiSliderValue] = useState([18, 99]);
  const [singleSliderValue, setSingleSliderValue] = useState([500]);

  const multiSliderValuesChange = (values: any) => setMultiSliderValue(values);
  const singleSliderValuesChange = (values: any) => setSingleSliderValue(values);

  return (
    <View>
      <SliderComponent
        onValuesChange={multiSliderValuesChange}
        values={[multiSliderValue[0], multiSliderValue[1]]}
        min={18}
        max={99}
      >
        <Text style={{ textAlign: 'right' }}>
          (between
          {' '}
          {multiSliderValue[0]}
          {' '}
          and
          {' '}
          {multiSliderValue[1]}
          )
        </Text>
      </SliderComponent>
      <SliderComponent
        onValuesChange={singleSliderValuesChange}
        values={singleSliderValue}
        min={1}
        max={5000}
      >
        <Text style={{ textAlign: 'right' }}>
          {singleSliderValue}
          {' '}
          <ManatIcon />
        </Text>

      </SliderComponent>
    </View>
  );
};
