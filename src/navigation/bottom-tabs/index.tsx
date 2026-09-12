import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BottomTabNavigationType } from '../../utils/types'
import HomeScreen from '../../modules/home'
import CreateNavigation from '../../modules/create'
import SavedScreen from '../../modules/saved'
import ProfileNavigation from '../../modules/profile'
import CustomTabBar from './components/CustomTabBar'

const BottomTabNavigation = () => {

    const BottomTab = createBottomTabNavigator<BottomTabNavigationType>()

    return (
        <BottomTab.Navigator
            tabBar={props => <CustomTabBar {...props} />}
            initialRouteName='Home'
            screenOptions={{
                headerShown: false,
                lazy: true,
            }}
        >
            <BottomTab.Screen
                name='Home'
                component={HomeScreen}
            />
            <BottomTab.Screen
                name='Create'
                component={CreateNavigation}
            />
            <BottomTab.Screen
                name='Saved'
                component={SavedScreen}
            />
            <BottomTab.Screen
                name="Profile"
                component={ProfileNavigation}
            />

        </BottomTab.Navigator>
    )
}

export default BottomTabNavigation;
