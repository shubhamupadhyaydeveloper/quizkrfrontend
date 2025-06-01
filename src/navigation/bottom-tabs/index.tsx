import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
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

const BottomTabNavigation = () => {
    const BottomTab = createBottomTabNavigator<BottomTabNavigationType>()

    return (
        <BottomTab.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false,
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
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontFamily: 'Fredoka_Condensed-Bold',
                    display: 'none'
                },
            }}
        >
            <BottomTab.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    tabBarButton: (props) => <Pressable {...props} />,
                    title: "Home",
                    tabBarIcon: ({ focused, color }) => (
                        focused ? <HomeFillIcon size={horizontalScale(28)} color={color} /> : <HomeOutlineIcon color={color} size={horizontalScale(28)} />
                    ),
                }}
            />
            <BottomTab.Screen
                name='Generate'
                component={GenerateScreen}
                options={{
                    tabBarButton: (props) => <Pressable {...props} />,
                    title: "Generate",
                    tabBarIcon: ({ color, focused }) => (
                        <BrainIcon width={horizontalScale(28)} height={verticalScale(28)} fill={color} />
                    )
                }}
            />
            <BottomTab.Screen
                name='Saved'
                component={SavedScreen}
                options={{
                    tabBarButton: (props) => <Pressable {...props} />,
                    title: "Saved",
                    tabBarIcon: ({ color, focused }) => (
                        <SavedIcon width={horizontalScale(26)} height={verticalScale(26)} fill={color} />
                    )
                }}
            />
            <BottomTab.Screen
                name="Premium"
                component={PremiumScreen}
                options={{
                    tabBarButton: (props) => <Pressable {...props} />,
                    title: "Premium",
                    tabBarIcon: ({ color, focused }) => (
                        <FlameIcon width={horizontalScale(30)} height={verticalScale(30)} fill={color} />
                    )
                }}
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