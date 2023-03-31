import React from 'react';
import Svg, { Path, Ellipse } from 'react-native-svg';
import { ThemeContextType, useTheme } from '../../core/theme/Theme';

interface EditIconProps {
  ellipseProps?: any,
  pathPenProps?: any,
  pathPenCoverProps?: any
}

export const EditIcon = ({ ellipseProps, pathPenProps, pathPenCoverProps }: EditIconProps) => {
  const { theme } = useTheme() as ThemeContextType;

  return (
    <Svg width="43" height="42" viewBox="0 0 38 37" fill="none">
      <Ellipse cx="18.8" cy="18.1734" rx="18.8" ry="18.1734" fill={theme.palette.color.primary} {...ellipseProps} />
      <Path
        d="M27.4445 12.8886C25.7779 13.4441 23.5559 11.2221 24.1114 9.55551M23.9766 9.6903L20.3862 13.2807C18.8253 14.8416 17.718 16.7974 17.1826 18.9389L17.0091 19.6329C16.955 19.8491 17.1509 20.045 17.3671 19.9909L18.0611 19.8174C20.2026 19.282 22.1584 18.1747 23.7193 16.6138L27.3097 13.0234C27.7517 12.5814 28 11.9819 28 11.3568C28 10.0552 26.9448 9 25.6432 9C25.0181 9 24.4186 9.24831 23.9766 9.6903Z"
        stroke="white"
        strokeWidth="1.5"
        {...pathPenProps}
      />
      <Path
        d="M19 9C17.9767 9 16.9533 9.11763 15.9504 9.35288C13.173 10.0044 11.0044 12.173 10.3529 14.9504C9.88237 16.9563 9.88237 19.0437 10.3529 21.0496C11.0044 23.827 13.173 25.9956 15.9504 26.6471C17.9563 27.1176 20.0437 27.1176 22.0496 26.6471C24.827 25.9956 26.9956 23.827 27.6471 21.0496C27.8824 20.0466 28 19.0233 28 18"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        {...pathPenCoverProps}
      />
    </Svg>

  );
};
