import React from 'react';
import Svg, { Color, Path } from 'react-native-svg';
import normalize from '../../pages/common/styles/normalize';

interface Props {
  color: Color
}

function NextButtonIcon(props: Props) {
  const { color } = props;

  return (
    <Svg
      width="100%"
      height={normalize(90)}
      viewBox="0 0 324 97"
      fill="none"
      accessible
      accessibilityLabel="next-button-icon"
      accessibilityValue={{ text: `next-button-icon-${color}` }}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 64c0-11.201 0-16.802 2.18-21.08a20 20 0 018.74-8.74C15.198 32 20.8 32 32 32h53.766c9.066 0 17.08-5.892 19.784-14.546A24.875 24.875 0 01129.292 0h65.42a24.873 24.873 0 0123.741 17.454A20.728 20.728 0 00238.238 32H292c11.201 0 16.802 0 21.08 2.18a19.997 19.997 0 018.74 8.74C324 47.198 324 52.8 324 64v1c0 11.201 0 16.802-2.18 21.08a19.998 19.998 0 01-8.74 8.74C308.802 97 303.201 97 292 97H32c-11.201 0-16.802 0-21.08-2.18a20 20 0 01-8.74-8.74C0 81.802 0 76.2 0 65v-1z"
        fill={color}
      />
    </Svg>
  );
}

export default NextButtonIcon;
