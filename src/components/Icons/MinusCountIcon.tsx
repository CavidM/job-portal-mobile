import React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg
      width={17}
      height={3}
      viewBox="0 0 17 3"
      fill="none"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.21 1.5C.21.846.742.316 1.396.316h14.21a1.184 1.184 0 010 2.368H1.396C.741 2.684.211 2.154.211 1.5z"
        fill="#27272E"
      />
    </Svg>
  );
}

export default SvgComponent;
