import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Circle
        cx={11.129}
        cy={11.129}
        r={8.129}
        stroke="#B5B5BD"
        strokeWidth={1.5}
      />
      <Path
        d="M16.936 16.936L20.5 20.5"
        stroke="#B5B5BD"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent
