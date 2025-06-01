import { Button, Image, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackNavigationType, RootStackNavigationType } from '../../utils/types';
import { splashImage } from '../../utils/constants';


const SplashScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackNavigationType, 'Splash'>>();

  // useEffect(() => {
  //     const checkUser = async () => {
  //         try {
  //             const userInfo = await AsyncStorage.getItem('userInfo');

  //             if (userInfo) {
  //                 resetAndNavigate('HomeScreen');
  //             } else {
  //                 resetAndNavigate('WelcomeScreen');
  //             }
  //         } catch (error) {
  //             console.error('Error retrieving user info:', error);
  //             resetAndNavigate('WelcomeScreen');
  //         }
  //     };

  //     checkUser();
  // }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View>
        <Image source={splashImage} style={{ width: 300, height: 300 }} />
       
      </View>
    </View>
  );
};

export default SplashScreen;