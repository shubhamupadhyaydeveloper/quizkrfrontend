import { Dimensions, Image, LayoutChangeEvent, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { BottomTabBarButtonProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BottomTabNavigationType } from '../../utils/types'
import { horizontalScale, iosDevice, verticalScale } from '../../utils/responsive'
import HomeScreen from '../../modules/home'
import GenerateScreen from '../../modules/generate'
import SavedScreen from '../../modules/saved'
import BrainIcon from '../../assets/rawsvg/brainIcon.svg';
import SavedIcon from '../../assets/rawsvg/saveIcon.svg'
import AboutIcon from '../../assets/rawsvg/aboutIcon.svg'
import FlameIcon from '../../assets/rawsvg/flame.svg'
import { Colors } from '../../utils/constants'
import HomeFillIcon from '../../svg/home/homeFill'
import HomeOutlineIcon from '../../svg/home/homeOutline'
import PremiumScreen from '../../modules/premium'
import { Animated, Pressable } from 'react-native';
import { HeaderLayoutProvider } from '../../context/HeaderLayoutContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomTabBar from './components/CustomTabBar'
import { ScrollContextProvider } from '../../context/ScrollContext'

const BottomTabNavigation = () => {

    const BottomTab = createBottomTabNavigator<BottomTabNavigationType>()

    return (

        <BottomTab.Navigator
            tabBar={props => <CustomTabBar {...props} />}
            initialRouteName='Home'
            screenOptions={{
                headerShown: false,
                lazy: true,
                tabBarHideOnKeyboard: true,
                tabBarInactiveTintColor: '#ffffff',
                tabBarActiveTintColor: '#16C47F',
                tabBarStyle: {
                    height: iosDevice ? verticalScale(70) : verticalScale(60),
                    backgroundColor: Colors.lightText,
                    paddingTop: verticalScale(13),
                    borderColor: "#dadada",
                    borderTopWidth: 0,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                    paddingBottom: verticalScale(5),
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontFamily: 'Nunito-Medium',
                    marginTop: verticalScale(2),
                },
            }}
        >
            <BottomTab.Screen
                name='Home'
                component={HomeScreen}
            />
            <BottomTab.Screen
                name='Generate'
                component={GenerateScreen}
            />
            <BottomTab.Screen
                name='Saved'
                component={SavedScreen}
            />
            <BottomTab.Screen
                name="Premium"
                component={PremiumScreen}
            />

        </BottomTab.Navigator>


    )
}

export default BottomTabNavigation;

const styles = StyleSheet.create({
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
})