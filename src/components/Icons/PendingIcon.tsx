import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../../core/models/Icon.model';

function SvgComponent({ svgProps, pathProps }: IconProps) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...svgProps}
    >
      <Path
        d="M17.9 10.383a.577.577 0 00-.65-.466c-.3.05-.517.35-.467.65.05.3.084.616.084.933 0 2.967-2.4 5.367-5.367 5.367A5.363 5.363 0 016.133 11.5c0-2.967 2.4-5.367 5.367-5.367.767 0 1.533.167 2.233.484L13.467 7a.354.354 0 00.25.567l2.25.316c.283.034.5-.25.366-.516l-1-2.05c-.116-.25-.45-.267-.616-.05L14.4 5.7a6.208 6.208 0 00-2.9-.7 6.524 6.524 0 00-4.6 1.9A6.524 6.524 0 005 11.5c0 1.733.683 3.367 1.9 4.6a6.523 6.523 0 004.6 1.9 6.523 6.523 0 004.6-1.9 6.523 6.523 0 001.9-4.6c0-.383-.033-.75-.1-1.117z"
        fill="#27272E"
        {...pathProps}
      />
      <Path
        d="M11.614 8a.586.586 0 00-.597.585L11 11.749V12.111s0 .017.018.017c0 0 0 .017.017.017 0 0 0 .017.018.017 0 0 0 .017.017.017 0 0 0 .018.018.018l.017.017.018.017.017.017 2.858 2.597A.625.625 0 0014.4 15a.633.633 0 00.438-.19.57.57 0 00-.035-.825l-2.612-2.494.018-2.906A.597.597 0 0011.614 8z"
        fill="#27272E"
        {...pathProps}
      />
    </Svg>
  );
}

export default SvgComponent;
