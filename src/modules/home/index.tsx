import { FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useMemo, version } from 'react'
import { horizontalScale, verticalScale } from '../../utils/responsive'
import FastImage from 'react-native-fast-image'
import Animated, { Extrapolation, interpolate, interpolateColor, runOnJS, useAnimatedReaction, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withDecay, withDelay, withTiming } from 'react-native-reanimated'
import { Colors } from '../../utils/constants'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import CommonHeader from '../../components/CommonHeader'

const mockData = [
  { title: 'Insert Text', background: '#1A241F', image: require('../../assets/jpg/typingText.jpg'), description: 'Easily create quizzes by entering text manually. Simply type or paste your study material, and the AI will generate relevant questions to help you revise effectively.' }
  , { title: 'Add PDF', background: '#1A241F', image: require('../../assets/jpg//ChoosePdf.jpg'), description: 'Upload PDFs of books, notes, or study guides, and the app will automatically extract key information to create quizzes. This feature saves time and ensures comprehensive exam preparation.' }
  , { title: 'Click Photos', background: '#1A241F', image: require('../../assets///jpg/TakePic.jpg'), description: 'Capture images of handwritten notes, textbooks, or printed documents, and let the AI convert them into quizzes. This is perfect for quickly digitizing study material on the go.' }
  ,]

const HomeScreen = () => {
  const topScrollValue = useSharedValue(0)


  const onScrollHandler = useAnimatedScrollHandler(e => {
    topScrollValue.value = e.contentOffset.y
  })


  const RenderBox = useMemo(() => ({
    text,
    bg,
    image,
    description,
    index,
  }: {
    text: string
    image: any
    bg: string
    description: string
    index: number
  }) => {
    const translateY = useSharedValue(20)

    useEffect(() => {
      translateY.value = withDelay(
        index * 100,
        withTiming(0, { duration: 500 })
      )
    }, [])

    const renderBoxAnimatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateY: translateY.value }],
        opacity: interpolate(translateY.value, [20, 0], [0, 1], Extrapolation.CLAMP),
      }
    })

    return (
      <Animated.View
        style={[
          styles.boxContainer,
          renderBoxAnimatedStyle,
          {
            backgroundColor: bg,
            flexDirection: 'row',
            justifyContent: 'space-between',
            overflow: 'hidden',
          },
        ]}
      >
        <Image source={image} style={[StyleSheet.absoluteFillObject]} blurRadius={140} />
        <View>
          <Text style={{ fontSize: 20, fontFamily: 'Bungee-Regular', color: 'white', lineHeight: 24 }}>{text}</Text>
          <View>
            <Text style={{ color: 'rgb(156 163 175)', fontSize: 14, fontFamily: 'Nunito-Medium', marginTop: 10, opacity: 0.8 }}>{description}</Text>
          </View>
        </View>
      </Animated.View>
    )
  }, [])




  return (
    <View style={{ flex: 1 }}>

      <StatusBar translucent backgroundColor={'black'} />

      <Animated.FlatList
        onScroll={onScrollHandler}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item,index) => index.toString()}
        data={mockData}
        renderItem={({ item, index }) => <RenderBox index={index} description={item.description} bg={item.background} image={item.image} text={item.title} />}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        ListHeaderComponent={() => <CommonHeader />}
        ListFooterComponent={() => <View style={{ marginBottom: verticalScale(110), marginTop: verticalScale(30) }} >
          <View style={{ gap: -5 }}>
            <Text style={{ fontSize: 28, color: 'rgb(156 163 175)', fontFamily: 'Bungee-Regular', lineHeight: 28 }}>One Solution</Text>
            <Text style={{ fontSize: 28, color: 'rgb(156 163 175)', fontFamily: 'Bungee-Regular', lineHeight: 30 }}>for Every Exams </Text>
            <Text style={{ fontSize: 28, color: 'rgb(156 163 175)', fontFamily: 'Bungee-Regular', lineHeight: 30 }}>Quizkr <Text style={{ fontSize: 24 }}>❤️</Text>  </Text>
          </View>
        </View>}

        contentContainerStyle={{
          paddingHorizontal: 15
        }}
      />

    </View>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  boxContainer: {
    borderRadius: 12,
    padding: 15,
  }
})