import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../../core/models/Icon.model';

function SvgComponent({ svgProps, pathProps }: IconProps) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...svgProps}
    >
      <Path
        d="M18 7L9.429 17 6 13"
        stroke="#27272E"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...pathProps}
      />
    </Svg>
  );
}

export default SvgComponent;
