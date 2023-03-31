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
        d="M17 7L7 17m10 0L7 7"
        stroke="#27272E"
        strokeWidth={1.5}
        strokeLinecap="round"
        {...pathProps}
      />
    </Svg>
  );
}

export default SvgComponent;
