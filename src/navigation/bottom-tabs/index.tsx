import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BottomTabNavigationType } from '../types'
import { horizontalScale, verticalScale } from '../../utils/responsive'
import HomeScreen from '../../modules/home'
import GenerateScreen from '../../modules/generate'
import SavedScreen from '../../modules/saved'
import AboutScreen from '../../modules/about'
import BrainIcon from '../../assets/rawsvg/brainIcon.svg';
import SavedIcon from '../../assets/rawsvg/saveIcon.svg'
import AboutIcon from '../../assets/rawsvg/aboutIcon.svg'
import { Colors } from '../../utils/Constants'
import HomeFillIcon from '../../svg/home/homeFill'
import HomeOutlineIcon from '../../svg/home/homeOutline'
import LinearGradient from 'react-native-linear-gradient'

const { width } = Dimensions.get('screen')

const BottomTabNavigation = () => {
    const BottomTab = createBottomTabNavigator<BottomTabNavigationType>()
    return (
        <BottomTab.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false,
                tabBarInactiveTintColor: '#ffffff',
                tabBarActiveTintColor: 'black',
                tabBarStyle: {
                    position: "absolute", 
                    marginBottom: verticalScale(20),
                    width: horizontalScale(250), 
                    height: verticalScale(70),
                    backgroundColor: "#16C47F", 
                    borderRadius: 26,
                    paddingTop: verticalScale(13),
                    marginLeft: horizontalScale(width / 5.5),
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
                animation: 'none',
            }}


        >
            <BottomTab.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    tabBarButton: (props) => <Pressable {...props} />,
                    title: "Home",
                    tabBarIcon: ({ focused, color }) => (
                        focused ? <HomeFillIcon size={horizontalScale(28)} color='' /> : <HomeOutlineIcon color='white' size={horizontalScale(28)} />
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
                        <BrainIcon width={horizontalScale(28)} height={verticalScale(28)} fill={focused ? 'black' : '#ffffff'} />
                    )
                }}
            />
            <BottomTab.Screen
                name="About"
                component={AboutScreen}
                options={{
                    tabBarButton: (props) => <Pressable {...props} />,
                    title: "About",
                    tabBarIcon: ({ color, focused }) => (
                        <AboutIcon width={horizontalScale(30)} height={verticalScale(30)} fill={focused ? 'black' : '#ffffff'} />
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
                        <SavedIcon width={horizontalScale(26)} height={verticalScale(26)} fill={focused ? 'black' : '#ffffff'} />
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