import React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg
      width={8}
      height={6}
      viewBox="0 0 8 6"
      fill="none"
    >
      <Path
        d="M3.469 4.909L.17 1.14A.687.687 0 01.69 0h6.595c.59 0 .906.696.517 1.14L4.504 4.91a.687.687 0 01-1.035 0z"
        fill="#B5B5BD"
      />
    </Svg>
  );
}

export default SvgComponent;
