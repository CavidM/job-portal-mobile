import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../../core/models/Icon.model';

function SvgComponent({ svgProps, pathProps }: IconProps) {
  return (
    <Svg
      width={21}
      height={18}
      viewBox="0 0 17 14"
      fill="none"
      {...svgProps}
    >
      <Path
        d="M6.68 13.005h0c.16.16.365.245.576.245a.814.814 0 00.577-.245.802.802 0 000-1.153s0 0 0 0L3.83 7.822h11.313c.452 0 .822-.37.822-.822a.823.823 0 00-.822-.821H3.832l4.03-4.03a.802.802 0 000-1.154.802.802 0 00-1.154 0L1.28 6.423a.802.802 0 000 1.154s0 0 0 0l5.4 5.428z"
        fill="#838383"
        stroke="#838383"
        strokeWidth={0.5}
        {...pathProps}
      />
    </Svg>
  );
}

export default SvgComponent;
