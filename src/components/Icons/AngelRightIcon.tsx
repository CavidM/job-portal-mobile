import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../../core/models/Icon.model';

function SvgComponent({ svgProps, pathProps }: IconProps) {
  return (
    <Svg
      width={11}
      height={11}
      viewBox="0 0 11 11"
      fill="none"
      {...svgProps}
    >
      <Path
        d="M7.65869 6.01742L3.89022 9.31483C3.4457 9.70379 2.75 9.3881 2.75 8.79743L2.75 2.20261C2.75 1.61194 3.4457 1.29625 3.89022 1.68521L7.65869 4.98262C7.97173 5.25653 7.97173 5.74351 7.65869 6.01742Z"
        fill="black"
        {...pathProps}

      />
    </Svg>
  );
}

export default SvgComponent;
