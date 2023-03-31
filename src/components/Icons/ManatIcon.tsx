import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../../core/models/Icon.model';

export function ManatIcon({ svgProps, pathProps }: IconProps) {
  return (
    <Svg
      width={18}
      height={15}
      viewBox="0 0 18 15"
      fill="none"
      {...svgProps}
    >
      <Path
        d="M9.627 1.155v10.353a.56.56 0 11-1.12 0V1.154C4.508 1.653 1.12 7.438 1.12 14.44a.56.56 0 11-1.119 0C0 6.574 4.07 0 9.067 0c4.961 0 8.843 6.505 8.843 14.44a.56.56 0 11-1.119 0c0-7.065-3.225-12.786-7.164-13.285z"
        fill="#000000"
        {...pathProps}
      />
    </Svg>
  );
}
