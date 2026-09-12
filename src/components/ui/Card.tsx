import React, { useState } from 'react';
import { LayoutChangeEvent, View, ViewStyle } from 'react-native';
import { Colors } from '../../theme/colors';
import GradientMesh from './GradientMesh';

type CardProps = {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  radius?: number;
  padding?: number;
  background?: string;
  bordered?: boolean;
  // Soft gradient-mesh wash behind the content — the one accent surface per screen.
  mesh?: boolean;
};

const Card = ({
  children,
  style,
  radius = 20,
  padding = 16,
  background = Colors.surface,
  bordered = false,
  mesh = false,
}: CardProps) => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  const onLayout = mesh
    ? (e: LayoutChangeEvent) => {
        const { width, height } = e.nativeEvent.layout;
        setSize({ width, height });
      }
    : undefined;

  return (
    <View
      onLayout={onLayout}
      style={[
        {
          borderRadius: radius,
          padding,
          backgroundColor: background,
          borderWidth: bordered ? 1 : 0,
          borderColor: Colors.subtleBorder,
          overflow: mesh ? 'hidden' : undefined,
        },
        style,
      ]}
    >
      {mesh && size.width > 0 && (
        <GradientMesh
          width={size.width}
          height={size.height}
          intensity={0.45}
          style={{ left: 0, top: 0 }}
        />
      )}
      {children}
    </View>
  );
};

export default Card;
