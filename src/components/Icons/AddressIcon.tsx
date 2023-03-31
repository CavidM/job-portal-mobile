import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { IconProps } from '../../core/models/Icon.model';

export function AddressIcon({ svgProps, pathProps, circleProps }: IconProps) {
  return (
    <Svg
      width={12}
      height={15}
      fill="none"
      {...svgProps}
    >
      <Path
        d="M6.107 1C3.043 1 1 3.334 1 6.424 1 9.514 4.405 14 6.107 14c1.702 0 5.107-4.486 5.107-7.576S9.171 1 6.107 1z"
        stroke="#2054BE"
        strokeWidth={1.5}
        {...pathProps}
      />
      <Circle
        cx={6.107}
        cy={6.107}
        r={1.393}
        stroke="#2054BE"
        strokeWidth={1.5}
        {...circleProps}
      />
    </Svg>
  );
}
