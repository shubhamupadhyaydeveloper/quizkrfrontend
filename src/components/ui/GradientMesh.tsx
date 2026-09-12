import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import Svg, { Defs, G, RadialGradient, Rect, Stop } from 'react-native-svg';
import { Colors } from '../../theme/colors';
import { screenHeight, screenWidth } from '../../utils/Constants';

type GradientMeshProps = {
  style?: StyleProp<ViewStyle>;
  width?: number;
  height?: number;
  // 1 = full-strength hero backdrop; ~0.45 = a soft wash that keeps ink text readable
  intensity?: number;
};

// Approximates the soft blurred "gradient mesh" hero background seen in
// Lovi/Arc/Dot by layering several large, softly-faded radial gradients —
// react-native-svg has no blur filter, so overlapping radial blobs at low
// opacity is the standard way to fake one.
const GradientMesh = ({ style, width, height, intensity = 1 }: GradientMeshProps) => {
  const w = width ?? screenWidth;
  const h = height ?? screenHeight;

  return (
    <View style={[{ position: 'absolute', width: w, height: h, overflow: 'hidden' }, style]}>
      <Svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        <Defs>
          <RadialGradient id="blobBlue" cx="20%" cy="15%" r="55%">
            <Stop offset="0%" stopColor={Colors.meshBlue} stopOpacity={0.9} />
            <Stop offset="100%" stopColor={Colors.meshBlue} stopOpacity={0} />
          </RadialGradient>
          <RadialGradient id="blobPurple" cx="80%" cy="30%" r="60%">
            <Stop offset="0%" stopColor={Colors.meshPurple} stopOpacity={0.95} />
            <Stop offset="100%" stopColor={Colors.meshPurple} stopOpacity={0} />
          </RadialGradient>
          <RadialGradient id="blobPink" cx="35%" cy="70%" r="55%">
            <Stop offset="0%" stopColor={Colors.meshPink} stopOpacity={0.9} />
            <Stop offset="100%" stopColor={Colors.meshPink} stopOpacity={0} />
          </RadialGradient>
          <RadialGradient id="blobPurple2" cx="75%" cy="85%" r="50%">
            <Stop offset="0%" stopColor={Colors.meshPurple} stopOpacity={0.7} />
            <Stop offset="100%" stopColor={Colors.meshPurple} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect x={0} y={0} width={w} height={h} fill={Colors.surface} />
        <G opacity={intensity}>
          <Rect x={0} y={0} width={w} height={h} fill="url(#blobBlue)" />
          <Rect x={0} y={0} width={w} height={h} fill="url(#blobPurple)" />
          <Rect x={0} y={0} width={w} height={h} fill="url(#blobPink)" />
          <Rect x={0} y={0} width={w} height={h} fill="url(#blobPurple2)" />
        </G>
      </Svg>
    </View>
  );
};

export default GradientMesh;
