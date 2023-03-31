import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { IconProps } from '../../core/models/Icon.model';

function SvgComponent({ rectProps }: IconProps) {
  return (
    <Svg
      width={211}
      height={211}
      viewBox="0 0 211 211"
      fill="none"
    >
      <Rect width={211} height={211} rx={66.5} fill="white" {...rectProps} />
      <Path
        d="M105.501 49.564c15.452 0 27.968 12.516 27.968 27.968 0 15.453-12.516 27.968-27.968 27.968-15.453 0-27.968-12.516-27.968-27.968S90.048 49.564 105.5 49.564zm0 111.872s55.936 0 55.936-13.984c0-16.78-27.269-34.96-55.936-34.96-28.668 0-55.937 18.18-55.937 34.96 0 13.984 55.937 13.984 55.937 13.984z"
        fill="#E3E3E3"
      />
    </Svg>
  );
}

export default SvgComponent;
