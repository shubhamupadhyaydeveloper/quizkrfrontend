import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { SetStateAction, useEffect, useState } from 'react'
import Animated, { LinearTransition } from 'react-native-reanimated'
import { horizontalScale, verticalScale } from '../utils/responsive'

const activeBgColor = 'white'
const containerBgColor = '#E2E3E5'
const activeTextColor = 'text'
const inActiveTextColor = '#5D666F'

const HorizontalSlider = ({ data, onChange }: { data: string[], onChange: React.Dispatch<SetStateAction<Number>> }) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
    
        setTimeout(() => {
            setHasMounted(true)
        }, 100)
    }, [])

    const handleOnClick = (index: number) => {
        setActiveIndex(index)
        onChange(index)
    }

    const initialLeftPosition = activeIndex === 0 ? horizontalScale(8) : horizontalScale(110) * activeIndex

    return (
        <View style={{ backgroundColor: containerBgColor, padding: 12, justifyContent: 'center', borderRadius: 25 }}>
            <Animated.View
                {...(hasMounted ? { layout: LinearTransition.springify().damping(80).stiffness(150) } : {})}
                style={{
                    position: 'absolute',
                    width: horizontalScale(105),
                    height: verticalScale(38),
                    backgroundColor: 'white',
                    borderRadius: 20,
                    left: initialLeftPosition,
                    top: verticalScale(5),
                    borderColor: '#d2d2d2',
                    borderWidth: .7,

                }}
            />
            <View style={{ flexDirection: 'row', gap: 5 }}>
                {data.map((item, index) => (
                    <TouchableOpacity key={index} activeOpacity={.8} onPress={() => handleOnClick(index)}>
                        <View style={{ width: horizontalScale(100) }}>
                            <Text style={{ fontFamily: 'Nunito-Bold', textAlign: 'center', color: activeIndex === index ? activeTextColor : inActiveTextColor }}>{item}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

export default HorizontalSlider;

const styles = StyleSheet.create({
    containerBox: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 30,
    }
})
