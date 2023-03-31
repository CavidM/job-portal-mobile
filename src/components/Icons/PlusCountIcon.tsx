import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../../core/models/Icon.model';

function SvgComponent({ svgProps, pathProps }: IconProps) {
  return (
    <Svg
      width={17}
      height={17}
      viewBox="0 0 17 17"
      fill="none"
      {...svgProps}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.498.21c.654 0 1.185.53 1.185 1.185v5.921h5.92a1.184 1.184 0 010 2.368h-5.92v5.921a1.184 1.184 0 11-2.369 0v-5.92h-5.92a1.184 1.184 0 010-2.369h5.92V1.395C7.314.74 7.844.21 8.498.21z"
        fill="#16192C"
        {...pathProps}
      />
    </Svg>
  );
}

export default SvgComponent;
