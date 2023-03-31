import React from 'react';
import Svg, { Path, Ellipse } from 'react-native-svg';
import { ThemeContextType, useTheme } from '../../core/theme/Theme';

function SvgComponent() {
  const { theme } = useTheme() as ThemeContextType;

  return (
    <Svg
      width={43}
      height={61}
      viewBox="0 0 43 61"
      fill="none"
    >
      <Ellipse cx={21.242} cy={30.534} rx={21.242} ry={20.534} fill={theme.palette.color.primary} />
      <Path
        d="M32.37 32h-9.3v9.1h-3.15V32h-9.3v-2.95h9.3V19.9h3.15v9.15h9.3V32z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SvgComponent;
