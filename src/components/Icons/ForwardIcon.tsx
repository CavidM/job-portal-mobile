import React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg
      width={15}
      height={26}
      viewBox="0 0 15 26"
      fill="none"
    >
      <Path
        d="M2.23.33L.983 1.623l11.459 11.191L1.25 24.317l1.248 1.249 12.484-12.752L2.231.33z"
        fill="#8D97B5"
      />
    </Svg>
  );
}

export default SvgComponent;
