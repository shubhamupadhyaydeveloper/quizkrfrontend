import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { Colors } from '../../theme/colors';

// Flat illustration style shared by all pieces: one coral shape, an ink copy
// offset down-left as the shadow, and a couple of four-point sparkles.
const SPARK = 'M0 -10C0 -2 2 0 10 0C2 0 0 2 0 10C0 2 -2 0 -10 0C-2 0 0 -2 0 -10Z';

type SparkleProps = { x: number; y: number; scale: number; fill: string };

const Sparkle = ({ x, y, scale, fill }: SparkleProps) => (
  <Path d={SPARK} fill={fill} transform={`translate(${x} ${y}) scale(${scale})`} />
);

type Props = { width?: number; height?: number };

export const PagesIllustration = ({ width = 150, height = 140 }: Props) => (
  <Svg width={width} height={height} viewBox="0 0 150 140" fill="none">
    <Rect x={32} y={40} width={72} height={90} rx={12} fill={Colors.coral} />
    <Rect x={40} y={30} width={72} height={90} rx={12} fill={Colors.surface} stroke={Colors.ink} strokeWidth={2} />
    <Rect x={54} y={48} width={44} height={7} rx={3.5} fill={Colors.ink} />
    <Rect x={54} y={63} width={30} height={7} rx={3.5} fill={Colors.ink} opacity={0.3} />
    <Rect x={54} y={78} width={38} height={7} rx={3.5} fill={Colors.ink} opacity={0.3} />
    <Circle cx={98} cy={104} r={14} fill={Colors.coral} />
    <Path
      d="M91.5 104l4.5 4.5 9-9.5"
      stroke={Colors.surface}
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Sparkle x={126} y={24} scale={1.1} fill={Colors.coral} />
    <Sparkle x={22} y={24} scale={0.55} fill={Colors.coral} />
  </Svg>
);

export const EmptyNotesIllustration = ({ width = 120, height = 110 }: Props) => (
  <Svg width={width} height={height} viewBox="0 0 120 110" fill="none">
    <Rect x={24} y={24} width={60} height={78} rx={10} fill={Colors.ink} />
    <Rect x={30} y={16} width={60} height={78} rx={10} fill={Colors.surface} stroke={Colors.ink} strokeWidth={2} />
    <Rect x={42} y={32} width={36} height={6} rx={3} fill={Colors.ink} />
    <Rect x={42} y={45} width={24} height={6} rx={3} fill={Colors.ink} opacity={0.3} />
    <Rect x={42} y={58} width={30} height={6} rx={3} fill={Colors.ink} opacity={0.3} />
    <Sparkle x={100} y={20} scale={1.2} fill={Colors.coral} />
    <Sparkle x={110} y={46} scale={0.6} fill={Colors.coral} />
  </Svg>
);

export const WritingIllustration = ({ width = 130, height = 120 }: Props) => (
  <Svg width={width} height={height} viewBox="0 0 130 120" fill="none">
    <Rect x={16} y={26} width={64} height={84} rx={10} fill={Colors.ink} />
    <Rect x={22} y={18} width={64} height={84} rx={10} fill={Colors.surface} stroke={Colors.ink} strokeWidth={2} />
    <Rect x={34} y={34} width={34} height={6} rx={3} fill={Colors.ink} />
    <Rect x={34} y={47} width={40} height={6} rx={3} fill={Colors.ink} opacity={0.3} />
    <Rect x={34} y={60} width={22} height={6} rx={3} fill={Colors.ink} opacity={0.3} />
    <Path d="M67 101L105 47" stroke={Colors.ink} strokeWidth={14} strokeLinecap="round" />
    <Path d="M72 94L110 40" stroke={Colors.coral} strokeWidth={14} strokeLinecap="round" />
    <Path d="M65 90l-7 22 21-10z" fill={Colors.ink} />
    <Sparkle x={112} y={18} scale={1} fill={Colors.coral} />
    <Sparkle x={120} y={66} scale={0.55} fill={Colors.coral} />
  </Svg>
);

export const CheckIllustration = ({ width = 140, height = 120 }: Props) => (
  <Svg width={width} height={height} viewBox="0 0 140 120" fill="none">
    <Path d="M23 74l30 30 56-64" stroke={Colors.ink} strokeWidth={18} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M28 66l30 30 56-64" stroke={Colors.coral} strokeWidth={18} strokeLinecap="round" strokeLinejoin="round" />
    <Sparkle x={24} y={22} scale={1.1} fill={Colors.coral} />
    <Sparkle x={126} y={74} scale={0.8} fill={Colors.coral} />
    <Sparkle x={104} y={108} scale={0.55} fill={Colors.coral} />
  </Svg>
);

export const CreditsIllustration = ({ width = 170, height = 160 }: Props) => (
  <Svg width={width} height={height} viewBox="0 0 170 160" fill="none">
    <Circle cx={80} cy={92} r={52} fill={Colors.ink} />
    <Circle cx={88} cy={82} r={52} fill={Colors.coral} />
    <Circle cx={88} cy={82} r={38} fill="none" stroke={Colors.surface} strokeWidth={4} opacity={0.7} />
    <Path d="M96 56l-14 28h16l-14 28" stroke={Colors.surface} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
    <Sparkle x={150} y={30} scale={1.2} fill={Colors.coral} />
    <Sparkle x={22} y={46} scale={0.7} fill={Colors.coral} />
    <Sparkle x={154} y={118} scale={0.55} fill={Colors.coral} />
  </Svg>
);
