import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackNavigationType } from '../../utils/types'
import BottomTabNavigation from '../bottom-tabs'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import AuthStackNavigation from '../auth'
import SplashScreen from '@src/modules/splash'


const RootStackNavigation = () => {
    const RootStack = createNativeStackNavigator<RootStackNavigationType>()

    return (
        <RootStack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Splash'>
            <RootStack.Screen
                name='App'
                component={BottomTabNavigation}
            />
            <RootStack.Screen
                name='Auth'
                component={AuthStackNavigation}
            />
            <RootStack.Screen
                name='Splash'
                component={SplashScreen}
            />


        </RootStack.Navigator>
    )
}

export default RootStackNavigation;

const styles = StyleSheet.create({})