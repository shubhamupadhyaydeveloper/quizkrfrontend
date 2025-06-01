import { View, Text, useWindowDimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import { Colors } from '../utils/constants';

type Props = {
    text: string;
    bgColor?: string;
    radius?: number;
    onPress?: () => void;
    btnWidth?: number;
    textSize?: number;
    textColor?: string;
    isSubmitting?: boolean;
    isBorder?: boolean;
    isDisable?: boolean;
};

const CustomButton = ({
    text,
    radius,
    onPress,
    btnWidth,
    textSize,
    bgColor,
    textColor,
    isSubmitting,
    isBorder,
    isDisable
}: Props) => {
    const { width, height } = useWindowDimensions();
    const isButtonDisabled = isSubmitting || isDisable;

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            disabled={isButtonDisabled}
            style={{
                width: btnWidth ?? width * 0.9,
                height: height * 0.065,
                borderRadius: radius ?? 12,
                backgroundColor: isButtonDisabled ? '#dadada' : bgColor ?? Colors.primary,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: isBorder ? 2 : 0,
                borderColor: isButtonDisabled ? '#b0b0b0' : Colors.primary,
            }}
        >
            {isSubmitting ? (
                <ActivityIndicator size="large" color="#fff" />
            ) : (
                <Text
                    style={{
                        color: isButtonDisabled ? '#8e8e8e' : textColor ?? 'white',
                        fontFamily: 'OpenSans-Bold',
                    }}
                >
                    {text}
                </Text>
            )}
        </TouchableOpacity>
    );
};

export default CustomButton;