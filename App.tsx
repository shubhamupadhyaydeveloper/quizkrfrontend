import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RootStackNavigation from './src/navigation/root-stack';
import { AppStoreProvider } from './src/store/AppStore';

const App = () => {
  return (
    <AppStoreProvider>
      <NavigationContainer>
        <RootStackNavigation />
      </NavigationContainer>
    </AppStoreProvider>
  )
}

export default App;
