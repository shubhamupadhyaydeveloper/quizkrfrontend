import { Button, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react'
import { CommonActions, NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackNavigationType, RootStackNavigationType } from '../../utils/types';
import { splashImage } from '../../utils/constants';
import { mmkvStorage } from '@src/utils/mmkvstore';


const SplashScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackNavigationType, 'Splash'>>();
  const isLogin = mmkvStorage.getItem('isLogin');

  useEffect(() => {
    const timer = setTimeout(() => {
      isLogin
        ?
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'App' }],
          })
        ) :
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Auth' }],
          })
        )

    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View>
        <Image source={splashImage} style={{ width: 300, height: 300 }} />
        <Text style={{color : 'white',fontSize : 24,fontWeight : "bold" ,textAlign : 'center'}}>Quizkr</Text>
      </View>
    </View>
  );
};

export default SplashScreen;