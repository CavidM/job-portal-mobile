import React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg
      width={26}
      height={14}
      viewBox="0 0 26 14"
      fill="none"
    >
      <Path
        d="M25.6 1.248L24.309 0 13.117 11.459 1.614.268.365 1.516 13.117 14 25.6 1.248z"
        fill="#8D97B5"
      />
    </Svg>
  );
}

export default SvgComponent;
