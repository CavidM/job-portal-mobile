import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const LogoutIcon = (props: SvgProps) => (
  <Svg
    width={17}
    height={17}
    fill="none"
    {...props}
  >
    <Path
      d="M8.5 2.125c-.725 0-1.45.083-2.16.25A5.32 5.32 0 0 0 2.375 6.34a9.459 9.459 0 0 0 0 4.32 5.32 5.32 0 0 0 3.965 3.965c1.42.333 2.9.333 4.32 0a5.32 5.32 0 0 0 3.965-3.965c.167-.71.25-1.435.25-2.16"
      stroke="#27272E"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Path
      d="M12.042 2.125h2.833m0 0v3.306m0-3.306-4.25 4.958"
      stroke="#27272E"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
