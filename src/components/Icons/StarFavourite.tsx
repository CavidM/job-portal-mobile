import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../../core/models/Icon.model';

export function StarFavourite({ svgProps, pathProps }: IconProps) {
  return (
    <Svg
      width={20}
      height={20}
      fill="none"
      {...svgProps}
    >
      <Path
        d="M8.677 2.312c.417-1.282 2.23-1.282 2.647 0l1.176 3.62c.186.572.72.96 1.323.96h3.805c1.348 0 1.909 1.725.818 2.518l-3.078 2.236a1.391 1.391 0 00-.506 1.556l1.176 3.62c.417 1.281-1.05 2.347-2.141 1.555l-3.079-2.237a1.391 1.391 0 00-1.635 0l-3.079 2.237c-1.09.792-2.558-.274-2.141-1.556l1.176-3.619a1.391 1.391 0 00-.506-1.556L1.555 9.41c-1.09-.793-.53-2.517.818-2.517h3.805c.603 0 1.137-.389 1.323-.962l1.176-3.619z"
        stroke="#EA9444"
        strokeWidth={1.5}
        {...pathProps}
      />
    </Svg>
  );
}
