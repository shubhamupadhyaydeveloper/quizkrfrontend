import React from 'react';
import { StyleSheet, Text, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../theme/colors';
import { FontFamily } from '../../theme/typography';

type GradientPillProps = {
  label: string;
  fontSize?: number;
  style?: ViewStyle;
};

export const MESH_GRADIENT = [Colors.meshBlue, Colors.meshPurple, Colors.meshPink];

// Small mesh-coloured pill for status badges (FREE / PRO / Best value).
const GradientPill = ({ label, fontSize = 10, style }: GradientPillProps) => (
  <LinearGradient
    colors={MESH_GRADIENT}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={[styles.pill, style]}
  >
    <Text style={[styles.label, { fontSize }]}>{label}</Text>
  </LinearGradient>
);

export default GradientPill;

const styles = StyleSheet.create({
  pill: {
    height: 20,
    paddingHorizontal: 9,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: Colors.ink,
    fontFamily: FontFamily.bodyBold,
    letterSpacing: 0.4,
  },
});
