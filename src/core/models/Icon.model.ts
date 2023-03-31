import {
  CircleProps, PathProps, RectProps, SvgProps
} from 'react-native-svg';

export interface IconProps {
  svgProps?: SvgProps,
  pathProps?: PathProps,
  circleProps?: CircleProps,
  rectProps?: RectProps
}
