import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useAnimatedKeyboard, useAnimatedProps, useAnimatedStyle, useSharedValue, withClamp, withRepeat, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const SavedScreen = () => {
  const withValue = useSharedValue(100)
  const r = useSharedValue<number>(20)
  const valueX = useSharedValue(0)
  const [inputValue, setInputValue] = useState('')
  const keyboard = useAnimatedKeyboard()

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: -keyboard.height.value }],
  }));


  const startOsilation = () => {
    valueX.value = withRepeat(
      withSequence(
        withTiming(valueX.value + 200, { duration: 1000 }),
        withTiming(0, { duration: 1000 })
      ),
      10
    )
  }

  const AnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: valueX.value }]
    }
  })

  return (
    <SafeAreaView style={{flex : 1, marginBottom : 100}} >
      <Animated.View style={[{flex : 1 ,justifyContent : 'flex-end'},animatedStyles]}>
        <View style={{ paddingHorizontal: 20 }}>
          <TextInput
            value={inputValue}
            onChangeText={setInputValue}
            placeholder='Enter your text'
            placeholderTextColor={'black'}
            style={{
              backgroundColor: 'white',
              color: 'black',
              borderRadius: 4,
              minHeight: 40,
              paddingHorizontal : 20
            }}
          />
        </View>
      </Animated.View>

    </SafeAreaView>

  )
}

export default SavedScreen;

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: "green"
  }
})