import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={14}
      height={12}
      viewBox="0 0 14 12"
      fill="none"
      {...props}
    >
      <Path
        d="M1 9.993a2.62 2.62 0 012.206-2.587l.115-.018a9.749 9.749 0 013.072 0l.115.018a2.62 2.62 0 012.206 2.587c0 .556-.45 1.007-1.007 1.007h-5.7A1.007 1.007 0 011 9.993zM7.107 2.964a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
        stroke="#2054BE"
      />
      <Path
        d="M8.715 5.214c1.38 0 2.5-1.007 2.5-2.25 0-1.242-1.12-2.25-2.5-2.25M10.422 11h1.46C12.498 11 13 10.55 13 9.993c0-1.287-1.04-2.384-2.452-2.587v0a1.8 1.8 0 00-.256-.018h-.692"
        stroke="#2054BE"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default SvgComponent;
