import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../../core/models/Icon.model';

export function MenuIcon({ svgProps, pathProps }: IconProps) {
  return (
    <Svg
      width={24}
      height={19}
      fill="none"
      {...svgProps}
    >
      <Path
        stroke="#fff"
        strokeWidth={1.5}
        d="M0 1.25h24M0 9.75h24M0 18.25h24"
        {...pathProps}
      />
    </Svg>
  );
}
