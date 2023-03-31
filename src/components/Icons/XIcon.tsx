import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../../core/models/Icon.model';

function SvgComponent({ svgProps, pathProps }: IconProps) {
  return (
    <Svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      {...svgProps}
    >
      <Path
        d="M12.733.707a1 1 0 00-1.414 0L7.707 4.32a1 1 0 01-1.414 0L2.68.707a1 1 0 00-1.414 0l-.56.56a1 1 0 000 1.414L4.32 6.293a1 1 0 010 1.414L.707 11.32a1 1 0 000 1.414l.56.56a1 1 0 001.414 0L6.293 9.68a1 1 0 011.414 0l3.612 3.612a1 1 0 001.414 0l.56-.56a1 1 0 000-1.414L9.68 7.707a1 1 0 010-1.414l3.612-3.612a1 1 0 000-1.414l-.56-.56z"
        fill="#838383"
        {...pathProps}
      />
    </Svg>
  );
}

export default SvgComponent;
