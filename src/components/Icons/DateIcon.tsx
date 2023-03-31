import React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
    >
      <Path
        d="M2.235 5.967a5.008 5.008 0 013.732-3.732 8.902 8.902 0 014.066 0 5.007 5.007 0 013.732 3.732 8.901 8.901 0 010 4.066 5.008 5.008 0 01-3.732 3.732 8.903 8.903 0 01-4.066 0 5.007 5.007 0 01-3.732-3.732 8.902 8.902 0 010-4.066z"
        stroke="#2054BE"
        strokeWidth={1.5}
      />
      <Path
        d="M9.667 9.667L7.774 8.463V6"
        stroke="#2054BE"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
