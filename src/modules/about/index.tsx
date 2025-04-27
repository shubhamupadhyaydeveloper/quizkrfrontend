import { Animated, Button, PanResponder, StyleSheet, Text, useAnimatedValue, View } from 'react-native'
import React, { useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CommonHeader from '../../components/CommonHeader'

const AboutScreen = () => {
  const positionX = useAnimatedValue(0)

  const valueX = useAnimatedValue(0)
  const valueY = useAnimatedValue(0)

  const startOsilation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(valueX, {
          toValue: 300,
          duration: 1000,
          useNativeDriver: true
        }),
        Animated.timing(valueX, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true
        })
      ]),
      { iterations: 10 }
    ).start()

  }


  const slideAnimation = () => {
    Animated.timing(positionX, {
      toValue: 300,
      duration: 2000,
      useNativeDriver: true
    }).start(() => {
      Animated.timing(positionX, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }).start()
    })
  }

  const panResponder = PanResponder.create({
      onStartShouldSetPanResponder : () => true,
      onPanResponderMove : Animated.event([
         
      ])
  })

  return (
    <View>

      <Text style={{ color: 'white' }}>hi this is abbout</Text>
      <Animated.View style={[styles.box, { transform: [{ translateX: positionX }] }]} />

      <Animated.View
        style={[styles.circle,
        {
          transform:
            [{ translateX: valueX }],
          backgroundColor: valueX.interpolate({
            inputRange: [0, 300],
            outputRange: ['green', 'red'],
            extrapolate: 'clamp',
          })
        }]} />

      <Animated.View 
        style={styles.box2}
      />

      <Button title='start osilation' onPress={startOsilation} />
      <Button title='slide Animation' onPress={slideAnimation} />

    </View>
  )
}

export default AboutScreen;

const styles = StyleSheet.create({
  box: {
    width: 80,
    height: 80,
    backgroundColor: 'white'
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 100
  },
  box2 : {
    width : 100,
    height : 100,
    backgroundColor : 'skyblue'
  }
})