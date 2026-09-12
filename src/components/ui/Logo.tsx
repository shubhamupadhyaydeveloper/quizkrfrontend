import React from 'react';
import Svg, { Rect, Circle, Path } from 'react-native-svg';
import { Colors } from '../../theme/colors';

type LogoProps = {
  size?: number;
};

// Logo direction A · "Spark Q": a circular Q whose tail becomes a lightning bolt.
const Logo = ({ size = 96 }: LogoProps) => {
  const s = size / 120;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <Rect width={120} height={120} rx={32} fill={Colors.ink} />
      <Circle cx={54} cy={56} r={26} stroke={Colors.surface} strokeWidth={10} />
      <Path d="M70 70l12 12" stroke={Colors.surface} strokeWidth={10} strokeLinecap="round" />
      <Path
        d="M92 60l-10 20h12l-10 20"
        stroke={Colors.coral}
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Logo;
