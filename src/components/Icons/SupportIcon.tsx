import * as React from 'react';
import Svg, { Circle, Mask, Path } from 'react-native-svg';
import { IconProps } from '../../core/models/Icon.model';

export function SupportIcon({ svgProps }: IconProps) {
  return (
    <Svg
      width={20}
      height={20}
      fill="none"
      {...svgProps}
    >
      <Path
        d="M2.794 7.459A6.26 6.26 0 0 1 7.46 2.794a11.128 11.128 0 0 1 5.082 0 6.26 6.26 0 0 1 4.665 4.665 11.128 11.128 0 0 1 0 5.082 6.26 6.26 0 0 1-4.665 4.665 11.128 11.128 0 0 1-5.082 0 6.26 6.26 0 0 1-4.665-4.665 11.128 11.128 0 0 1 0-5.082Z"
        stroke="#27272E"
        strokeWidth={1.5}
      />
      <Path
        d="M10 12.917V9.584"
        stroke="#27272E"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Mask id="a" fill="#fff">
        <Circle cx={9.999} cy={7.5} r={0.833} />
      </Mask>
      <Circle cx={9.999} cy={7.5} fill="#27272E" r={0.833} />
      <Path
        d="M9.833 7.5c0-.092.074-.167.166-.167v2c1.013 0 1.834-.82 1.834-1.833h-2Zm.166-.167c.092 0 .167.075.167.167h-2c0 1.012.82 1.833 1.833 1.833v-2Zm.167.167a.167.167 0 0 1-.167.167v-2c-1.012 0-1.833.82-1.833 1.833h2Zm-.167.167a.167.167 0 0 1-.166-.167h2c0-1.013-.821-1.833-1.834-1.833v2Z"
        fill="#27272E"
        mask="url(#a)"
      />
    </Svg>
  );
}
