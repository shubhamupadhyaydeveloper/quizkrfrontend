import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { CommonActions, useNavigation } from '@react-navigation/native'
import Screen from '../../components/ui/Screen'
import PillButton from '../../components/ui/PillButton'
import GradientMesh from '../../components/ui/GradientMesh'
import { GoogleLogoIcon } from '../../components/icons'
import { Colors } from '../../theme/colors'
import { Typography } from '../../theme/typography'
import { moderateScale } from '../../utils/responsive'
import Logo from '../../components/ui/Logo'
import { mmkvStorage } from '@src/utils/mmkvstore'
import { useT } from '../../i18n'

const AuthSignInScreen = () => {
  const navigation = useNavigation();
  const t = useT();

  const handleGoogleSignIn = () => {
    // TODO: wire real Google sign-in (appwrite OAuth). For this UI-only pass,
    // tapping the button just drops you into the app, same as splash's redirect.
    mmkvStorage.setItem('isLogin', 'true');
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'App' }],
      }),
    );
  }

  return (
    <Screen background={Colors.surface}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <GradientMesh />
      <View style={styles.container}>
        <View style={styles.topRow}>
          <Logo size={32} />
          <Text style={[Typography.h2, styles.brand]}>Quizkr</Text>
        </View>

        <View style={styles.middle}>
          <Text style={[Typography.display, styles.headline]}>
            {t('onboardingTitle')}
          </Text>
          <Text style={[Typography.body, styles.subhead]}>
            {t('onboardingBody')}
          </Text>
        </View>

        <View style={styles.bottom}>
          <PillButton
            variant="outline"
            label={t('continueWithGoogle')}
            onPress={handleGoogleSignIn}
            icon={<GoogleLogoIcon size={18} />}
            iconPosition="left"
          />
          <Text style={[Typography.caption, styles.terms]}>
            {t('legal')}
          </Text>
        </View>
      </View>
    </Screen>
  )
}

export default AuthSignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(28),
    paddingTop: moderateScale(12),
    paddingBottom: moderateScale(20),
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(10),
  },
  brand: {
    color: Colors.ink,
  },
  middle: {
    gap: moderateScale(16),
  },
  headline: {
    color: Colors.ink,
  },
  subhead: {
    color: Colors.ink,
    opacity: 0.65,
  },
  bottom: {
    gap: moderateScale(14),
  },
  terms: {
    textAlign: 'center',
    color: Colors.ink,
    opacity: 0.55,
  },
})
