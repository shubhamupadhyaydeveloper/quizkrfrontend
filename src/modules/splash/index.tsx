import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react'
import { CommonActions, NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackNavigationType } from '../../utils/types';
import { mmkvStorage } from '@src/utils/mmkvstore';
import Logo from '../../components/ui/Logo';
import GradientMesh from '../../components/ui/GradientMesh';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { moderateScale } from '../../utils/responsive';
import { useT } from '../../i18n';

const SplashScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackNavigationType, 'Splash'>>();
  const isLogin = mmkvStorage.getItem('isLogin');
  const t = useT();

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
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <GradientMesh />
      <Logo size={moderateScale(96)} />
      <View style={styles.copy}>
        <Text style={[Typography.display, styles.title]}>Quizkr</Text>
        <Text style={[Typography.body, styles.subtitle]}>{t('splashTagline')}</Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: moderateScale(22),
    backgroundColor: Colors.surface,
    paddingHorizontal: moderateScale(40),
  },
  copy: {
    alignItems: 'center',
    gap: moderateScale(8),
  },
  title: {
    color: Colors.ink,
  },
  subtitle: {
    color: Colors.ink,
    opacity: 0.6,
  },
});
