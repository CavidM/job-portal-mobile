import React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg
      width={26}
      height={15}
      viewBox="0 0 26 15"
      fill="none"
    >
      <Path
        d="M25.6 1.578L24.309.33 13.117 11.789 1.614.597.365 1.846 13.117 14.33 25.6 1.578z"
        fill="#8D97B5"
      />
    </Svg>
  );
}

export default SvgComponent;
