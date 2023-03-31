import * as React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { IconProps } from '../../core/models/Icon.model';

function SvgComponent({ svgProps, pathProps, rectProps }: IconProps) {
  return (
    <Svg
      width={69}
      height={69}
      fill="none"
      {...svgProps}
    >
      <Rect
        width={69}
        height={69}
        rx={34.5}
        fill="#C4C4C4"
        {...rectProps}
      />
      <Path
        d="M34.5 16.208a9.143 9.143 0 0 1 9.147 9.146A9.143 9.143 0 0 1 34.5 34.5a9.143 9.143 0 0 1-9.146-9.146 9.143 9.143 0 0 1 9.146-9.146Zm0 36.584s18.293 0 18.293-4.573c0-5.488-8.917-11.433-18.292-11.433-9.375 0-18.292 5.945-18.292 11.433 0 4.573 18.292 4.573 18.292 4.573Z"
        fill="#E3E3E3"
        {...pathProps}
      />
    </Svg>
  );
}

export default SvgComponent;
