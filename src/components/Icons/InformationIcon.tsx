import React from 'react';
import Svg, { Path, Mask, Ellipse } from 'react-native-svg';
import { IconProps } from '../../core/models/Icon.model';

export function InformationIcon({ svgProps, pathProps }: IconProps) {
  return (
    <Svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      {...svgProps}
    >
      <Path
        d="M1.237 4.967A5.023 5.023 0 014.99 1.235a9.01 9.01 0 014.09 0 5.023 5.023 0 013.755 3.732 8.852 8.852 0 010 4.066 5.023 5.023 0 01-3.754 3.732 9.01 9.01 0 01-4.091 0 5.023 5.023 0 01-3.754-3.732 8.85 8.85 0 010-4.066z"
        stroke="#FF8A00"
        strokeWidth={1.5}
        {...pathProps}
      />
      <Path
        d="M7.035 9.333V6.667"
        stroke="#FF8A00"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...pathProps}
      />
      <Mask id="prefix__a" fill="#fff">
        <Ellipse cx={7.035} cy={4.667} rx={0.671} ry={0.667} />
      </Mask>
      <Ellipse cx={7.035} cy={4.667} rx={0.671} ry={0.667} fill={pathProps?.stroke || '#FF8A00'} />
      <Path
        d="M6.706 4.667c0-.19.153-.334.329-.334v2c.917 0 1.67-.74 1.67-1.666h-2zm.329-.334c.176 0 .33.144.33.334h-2c0 .926.753 1.666 1.67 1.666v-2zm.33.334c0 .19-.154.333-.33.333V3c-.917 0-1.67.74-1.67 1.667h2zM7.034 5a.331.331 0 01-.33-.333h2C8.706 3.74 7.953 3 7.036 3v2z"
        fill={pathProps?.stroke || '#FF8A00'}
        mask="url(#prefix__a)"
      />
    </Svg>
  );
}
