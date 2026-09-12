import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ProfileStackNavigationType } from '../../utils/types'
import ProfileHomeScreen from './ProfileHome'
import CreditsScreen from '../credits'
import LanguageScreen from './Language'

const ProfileNavigation = () => {
  const ProfileStack = createNativeStackNavigator<ProfileStackNavigationType>()

  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }} initialRouteName='ProfileHome'>
      <ProfileStack.Screen name='ProfileHome' component={ProfileHomeScreen} />
      <ProfileStack.Screen name='Credits' component={CreditsScreen} />
      <ProfileStack.Screen name='Language' component={LanguageScreen} />
    </ProfileStack.Navigator>
  )
}

export default ProfileNavigation;
