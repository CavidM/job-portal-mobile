import React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg
      width={33}
      height={24}
      viewBox="0 0 33 24"
      fill="none"
    >
      <Path
        d="M1.201 0h29.987c.663 0 1.201.538 1.201 1.201v20.687c0 .663-.538 1.201-1.201 1.201H1.2A1.202 1.202 0 010 21.89V1.2C0 .538.538 0 1.201 0zm23.7 3.633a2.728 2.728 0 110 5.455 2.728 2.728 0 010-5.455zM2.403 16.497l8.974-7.543a1.196 1.196 0 011.567.024l6.238 5.568 3.535-3.534a1.201 1.201 0 011.664-.032l5.607 4.513V2.403H2.402v14.094z"
        fill="#8D97B5"
      />
    </Svg>
  );
}

export default SvgComponent;
