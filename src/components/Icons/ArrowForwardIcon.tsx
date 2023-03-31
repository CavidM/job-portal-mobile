import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../../core/models/Icon.model';

export function ArrowForwardIcon({ svgProps, pathProps }: IconProps) {
  return (
    <Svg
      width={21}
      height={18}
      fill="none"
      {...svgProps}
    >
      <Path
        d="M12.745 1.05h0a.984.984 0 00-.7-.3.984.984 0 00-.7.3.981.981 0 000 1.405s0 0 0 0l5.364 5.443H1.745c-.55 0-.996.453-.996 1.003 0 .55.446 1.002.996 1.002h14.961l-5.399 5.444a.981.981 0 000 1.405c.397.4 1.004.4 1.4 0l7.09-7.148a.981.981 0 000-1.406s0 0 0 0L12.745 1.05z"
        fill="#27272E"
        stroke="#fff"
        strokeWidth={0.5}
        {...pathProps}
      />
    </Svg>
  );
}
