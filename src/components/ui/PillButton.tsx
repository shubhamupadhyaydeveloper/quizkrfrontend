import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../theme/colors';
import { MESH_GRADIENT } from './GradientPill';
import { Typography } from '../../theme/typography';
import { moderateScale } from '../../utils/responsive';

type PillButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'outline' | 'gradient';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  fullWidth?: boolean;
};

const PillButton = ({
  label,
  onPress,
  variant = 'primary',
  icon,
  iconPosition = 'right',
  loading = false,
  disabled = false,
  style,
  fullWidth = true,
}: PillButtonProps) => {
  const inkText = variant !== 'primary';

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.base,
        variant === 'outline' && styles.outline,
        variant === 'primary' && styles.primary,
        variant === 'gradient' && styles.gradient,
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        style,
      ]}
    >
      {variant === 'gradient' && (
        <LinearGradient
          colors={MESH_GRADIENT}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      )}
      {loading ? (
        <ActivityIndicator color={inkText ? Colors.ink : Colors.surface} />
      ) : (
        <View style={styles.content}>
          {icon && iconPosition === 'left' ? icon : null}
          <Text
            style={[
              Typography.button,
              { color: inkText ? Colors.ink : Colors.surface },
            ]}
          >
            {label}
          </Text>
          {icon && iconPosition === 'right' ? icon : null}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default PillButton;

const styles = StyleSheet.create({
  base: {
    height: moderateScale(58),
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(20),
  },
  fullWidth: {
    width: '100%',
  },
  primary: {
    backgroundColor: Colors.ink,
  },
  outline: {
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.subtleBorder,
  },
  gradient: {
    overflow: 'hidden',
  },
  disabled: {
    opacity: 0.5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(10),
  },
});
