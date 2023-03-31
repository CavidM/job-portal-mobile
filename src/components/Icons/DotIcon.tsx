import React from 'react';
import Svg, { Path, Color } from 'react-native-svg';

interface Props {
  // eslint-disable-next-line react/require-default-props
  color? : Color,
  // @TODO remove
  defaultColor?: Color
}

function DotIcon(props: Props) {
  const { color, defaultColor } = props;
  return (
    <Svg
      width={5}
      height={5}
      viewBox="0 0 5 5"
      fill="none"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.5 5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
        fill={color || defaultColor}
      />
    </Svg>
  );
}

export default DotIcon;
