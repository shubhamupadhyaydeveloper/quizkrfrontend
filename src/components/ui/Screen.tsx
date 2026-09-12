import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { Colors } from '../../theme/colors';

type ScreenProps = {
  children: React.ReactNode;
  background?: string;
  edges?: Edge[];
  style?: ViewStyle;
};

const Screen = ({ children, background = Colors.bg, edges, style }: ScreenProps) => {
  return (
    <SafeAreaView
      edges={edges}
      style={[styles.container, { backgroundColor: background }, style]}
    >
      <View style={[styles.container, { backgroundColor: background }]}>{children}</View>
    </SafeAreaView>
  );
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
