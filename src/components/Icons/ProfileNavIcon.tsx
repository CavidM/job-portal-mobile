import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../../core/models/Icon.model';

function SvgComponent({ svgProps, pathProps }: IconProps) {
  return (
    <Svg
      width={14}
      height={16}
      fill="none"
      {...svgProps}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 1.36c-1.722 0-3.01 1.265-3.01 2.701 0 1.436 1.288 2.701 3.01 2.701 1.722 0 3.01-1.265 3.01-2.701 0-1.436-1.288-2.702-3.01-2.702zM2.634 4.06C2.634 1.761 4.648 0 7 0s4.366 1.762 4.366 4.061c0 2.3-2.014 4.061-4.366 4.061S2.634 6.36 2.634 4.061zm6.78 6.116a15.59 15.59 0 00-4.828 0l-.187.03c-1.765.276-3.044 1.765-3.044 3.491 0 .507.422.942.974.942h9.342a.958.958 0 00.974-.942c0-1.726-1.28-3.215-3.044-3.492l-.187-.03zm.209-1.343l.188.03C12.213 9.24 14 11.28 14 13.697 14 14.983 12.944 16 11.671 16H2.33C1.056 16 0 14.983 0 13.698c0-2.417 1.787-4.458 4.19-4.835l.187-.03a16.942 16.942 0 015.246 0z"
        fill="#2054BE"
        {...pathProps}
      />
    </Svg>
  );
}

export default SvgComponent;
