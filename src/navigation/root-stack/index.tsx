import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackNavigationType } from '../types'
import BottomTabNavigation from '../bottom-tabs'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'


const RootStackNavigation = () => {
    const RootStack = createNativeStackNavigator<RootStackNavigationType>()

    return (
        <RootStack.Navigator screenOptions={{ headerShown: false }} initialRouteName='App'>
            <RootStack.Screen
                name='App'
                component={BottomTabNavigation}
            />
        </RootStack.Navigator>
    )
}

export default RootStackNavigation;

const styles = StyleSheet.create({})