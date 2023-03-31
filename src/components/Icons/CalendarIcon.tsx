import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { IconProps } from '../../core/models/Icon.model';

export function CalendarIcon({ svgProps, pathProps, circleProps }: IconProps) {
  return (
    <Svg
      width={16}
      height={14}
      fill="none"
      {...svgProps}
    >
      <Path
        d="M2 7.25c0-2.357 0-3.536.781-4.268.781-.732 2.038-.732 4.552-.732h1.334c2.514 0 3.77 0 4.552.732C14 3.714 14 4.893 14 7.25c0 2.357 0 3.536-.781 4.268-.781.732-2.038.732-4.552.732H7.333c-2.514 0-3.77 0-4.552-.732C2 10.786 2 9.607 2 7.25z"
        stroke="#425466"
        strokeWidth={1.2}
        {...pathProps}
      />
      <Path
        d="M5.666 1v2.333M10.334 1v2.333"
        stroke="#425466"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...pathProps}
      />
      <Path
        d="M2 5.25h12"
        stroke="#425466"
        strokeWidth={1.2}
        strokeLinejoin="round"
        {...pathProps}
      />
      <Circle cx={5.083} cy={7.125} fill="#425466" r={0.583} {...circleProps} />
      <Circle cx={5.083} cy={9.458} fill="#425466" r={0.583} {...circleProps} />
      <Circle cx={7.999} cy={7.125} fill="#425466" r={0.583} {...circleProps} />
      <Circle cx={7.999} cy={9.458} fill="#425466" r={0.583} {...circleProps} />
      <Circle cx={10.917} cy={7.125} fill="#425466" r={0.583} {...circleProps} />
      <Circle cx={10.917} cy={9.458} r={0.583} fill="#425466" {...circleProps} />
    </Svg>
  );
}
