import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthStackNavigationType } from '../../utils/types'
import AuthSignInScreen from '../../modules/auth'

const AuthStackNavigation = () => {
  const AuthStack = createNativeStackNavigator<AuthStackNavigationType>()
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'ios_from_right',
      }}
      initialRouteName='SignIn'
    >
      <AuthStack.Screen
        name='SignIn'
        component={AuthSignInScreen}
      />
    </AuthStack.Navigator>
  )
}

export default AuthStackNavigation;
