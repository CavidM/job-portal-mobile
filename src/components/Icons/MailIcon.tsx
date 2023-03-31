import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../../core/models/Icon.model';

export function MailIcon({ svgProps, pathProps }: IconProps) {
  return (
    <Svg
      width={18}
      height={16}
      fill="none"
      {...svgProps}
    >
      <Path
        d="M3.5 5.25L9 8l5.5-2.75"
        stroke="#2054BE"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M.75 8c0-2.575 0-3.862.618-4.787.267-.4.611-.744 1.012-1.012.924-.618 2.212-.618 4.787-.618h3.666c2.575 0 3.863 0 4.787.618.4.268.745.612 1.012 1.012.618.925.618 2.212.618 4.787 0 2.575 0 3.862-.618 4.787-.268.4-.611.744-1.012 1.012-.924.618-2.212.618-4.787.618H7.167c-2.575 0-3.863 0-4.787-.618a3.667 3.667 0 01-1.012-1.012C.75 11.862.75 10.575.75 8z"
        stroke="#2054BE"
        strokeWidth={1.5}
        {...pathProps}
      />
    </Svg>
  );
}
