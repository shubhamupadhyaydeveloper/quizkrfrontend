import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ProfilePage = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212', paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <Text style={{color : 'white'}}>ProfilePage</Text>
    </View>
  )
}

export default ProfilePage;

const styles = StyleSheet.create({})