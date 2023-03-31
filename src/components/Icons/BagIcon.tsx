import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../../core/models/Icon.model';

function SvgComponent({ svgProps, pathProps }: IconProps) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      {...svgProps}
    >
      <Path
        d="M2.25 8.063a3 3 0 013-3h7.5a3 3 0 013 3v3.75a3 3 0 01-3 3h-7.5a3 3 0 01-3-3v-3.75z"
        stroke={pathProps?.stroke || '#2054BE'}
        strokeWidth={1.5}
      />

      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.257 4.5h1.509c.09-.532.552-.938 1.11-.938h2.25c.557 0 1.02.406 1.109.938h1.509a2.625 2.625 0 00-2.619-2.438h-2.25A2.625 2.625 0 005.257 4.5z"
        fill={pathProps?.fill || '#2054BE'}
      />
      <Path
        d="M2.25 7.313l6.038 2.012a2.25 2.25 0 001.424 0l6.038-2.012"
        stroke={pathProps?.stroke || '#2054BE'}
        strokeWidth={1.5}
      />
    </Svg>
  );
}

export default SvgComponent;
