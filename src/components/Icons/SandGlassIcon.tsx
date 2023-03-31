import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../../core/models/Icon.model';

export function SandGlassIcon({ svgProps, pathProps }: IconProps) {
  return (
    <Svg
      width={11}
      height={13}
      fill="none"
      {...svgProps}
    >
      <Path
        d="M.59 11.818A.59.59 0 10.59 13h9.456a.59.59 0 000-1.182h-.607c-.062-1.338-.373-4.424-1.9-5.909 1.448-1.33 1.8-3.643 1.887-4.727h.62a.59.59 0 000-1.182H.59a.59.59 0 100 1.182h.62c.086 1.085.439 3.398 1.887 4.727-1.527 1.484-1.838 4.57-1.9 5.91H.59zm3.774-5.381a.59.59 0 00.02-1.045c-1.5-.832-1.886-3.12-1.986-4.21h5.84c-.1 1.09-.486 3.378-1.986 4.21a.59.59 0 00.02 1.045c1.44.726 1.891 3.73 1.983 5.381H2.381c.09-1.654.543-4.655 1.983-5.381z"
        fill="#2054BE"
        {...pathProps}
      />
      <Path
        d="M5.319 7.09S3.546 8.51 3.546 9.219v2.01H7.09v-2.01c0-.709-1.772-2.127-1.772-2.127z"
        fill="#2054BE"
        {...pathProps}
      />
    </Svg>
  );
}
