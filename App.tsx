import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import RootStackNavigation from './src/navigation/root-stack';
import DrawerNavigation from './src/navigation/drawer';


const App = () => {
  return <DrawerNavigation />
}

export default App;

const styles = StyleSheet.create({})