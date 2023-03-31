import React from 'react';
import Svg, { Circle } from 'react-native-svg';
import { ThemeContextType, useTheme } from '../../core/theme/Theme';

function SvgComponent() {
  const { theme } = useTheme() as ThemeContextType;

  return (
    <Svg
      width={73}
      height={73}
      viewBox="0 0 73 73"
      fill="none"
    >
      <Circle
        cx={36.5}
        cy={36.5}
        r={31.5}
        fill={theme.palette.color.primary}
        stroke="#fff"
        strokeWidth={10}
      />
    </Svg>
  );
}

export default SvgComponent;
