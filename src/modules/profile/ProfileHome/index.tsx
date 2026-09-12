import React, { useState } from 'react'
import { Alert, ScrollView, StatusBar, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Screen from '../../../components/ui/Screen'
import Card from '../../../components/ui/Card'
import GradientPill from '../../../components/ui/GradientPill'
import { Colors } from '../../../theme/colors'
import { Typography } from '../../../theme/typography'
import { moderateScale } from '../../../utils/responsive'
import {
  BellIcon,
  ChevronRightIcon,
  DocIcon,
  GoogleLogoIcon,
  LogoutIcon,
  MailIcon,
  ShieldIcon,
  GlobeIcon,
  StarIcon,
  UserIcon,
} from '../../../components/icons'
import { ProfileStackNavigationType } from '../../../utils/types'
import { useAppStore } from '../../../store/AppStore'
import { mmkvStorage } from '../../../utils/mmkvstore'
import { languageName, useT } from '../../../i18n'

type Nav = NativeStackNavigationProp<ProfileStackNavigationType, 'ProfileHome'>;

type Row = {
  key: string;
  icon: React.ReactNode;
  label: string;
  trailing?: string;
  onPress?: () => void;
};

const formatStudied = (seconds: number) => {
  if (seconds < 60) return `${seconds}s`;
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.round((seconds % 3600) / 60);
  return hours ? `${hours}h ${minutes}m` : `${minutes}m`;
};

const ProfileHomeScreen = () => {
  const navigation = useNavigation<Nav>();
  const [remindersOn, setRemindersOn] = useState(false);
  const t = useT();
  const { credits, plan, quizzesTaken, averageScore, secondsStudied, language, resetProgress } = useAppStore();

  const logOut = () => {
    Alert.alert(t('logOutTitle'), t('logOutBody'), [
      { text: t('cancel'), style: 'cancel' },
      {
        text: t('logOut'),
        style: 'destructive',
        onPress: () => {
          mmkvStorage.setItem('isLogin', 'false');
          navigation.dispatch(
            CommonActions.reset({ index: 0, routes: [{ name: 'Auth' as never }] }),
          );
        },
      },
    ]);
  };

  const clearProgress = () => {
    Alert.alert(t('deleteAccountTitle'), t('deleteAccountBody'), [
      { text: t('cancel'), style: 'cancel' },
      { text: t('delete'), style: 'destructive', onPress: resetProgress },
    ]);
  };

  const rows: Row[] = [
    { key: 'reminders', icon: <BellIcon size={20} />, label: t('studyReminders') },
    {
      key: 'language',
      icon: <GlobeIcon size={20} />,
      label: t('language'),
      trailing: languageName(language),
      onPress: () => navigation.navigate('Language'),
    },
    { key: 'support', icon: <MailIcon size={20} />, label: t('contactSupport') },
    { key: 'privacy', icon: <ShieldIcon size={20} />, label: t('privacyPolicy') },
    { key: 'terms', icon: <DocIcon size={20} />, label: t('termsOfService') },
    { key: 'rate', icon: <StarIcon size={20} />, label: t('rateApp') },
  ];

  return (
    <Screen background={Colors.bg}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.bg} />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[Typography.h1, styles.ink]}>{t('profile')}</Text>

        <Card style={styles.identityCard}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <UserIcon size={30} color={Colors.ink} />
            </View>
            <GradientPill label={plan === 'pro' ? 'PRO' : 'FREE'} style={styles.planBadge} />
          </View>
          <View style={styles.identityCopy}>
            <Text style={[Typography.h2, styles.ink]}>Aarav Mehta</Text>
            <Text style={[Typography.caption, styles.muted]} numberOfLines={1}>
              aarav.mehta@gmail.com
            </Text>
            <View style={styles.googleRow}>
              <GoogleLogoIcon size={12} />
              <Text style={[Typography.caption, styles.muted]}>{t('signedInGoogle')}</Text>
            </View>
          </View>
        </Card>

        <Card mesh style={styles.creditsCard}>
          <View style={styles.creditsTop}>
            <View style={styles.creditsAmountRow}>
              <Text style={[Typography.h1, styles.ink]}>{plan === 'pro' ? t('pro') : credits}</Text>
              <Text style={[Typography.caption, styles.muted]}>
                {plan === 'pro' ? t('unlimitedQuizzes') : t('creditsLeft')}
              </Text>
            </View>
            <View style={styles.creditsHint}>
              <View style={styles.creditsDot} />
              <Text style={[Typography.caption, styles.ink]}>{t('creditPerQuiz')}</Text>
            </View>
          </View>
          <View style={styles.creditsActions}>
            <TouchableOpacity
              style={styles.creditsActionPrimary}
              onPress={() => navigation.navigate('Credits')}
            >
              <Text style={[Typography.button, styles.surface]}>{t('goPro')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.creditsActionOutline}
              onPress={() => navigation.navigate('Credits')}
            >
              <Text style={[Typography.button, styles.ink]}>{t('buyCredits')}</Text>
            </TouchableOpacity>
          </View>
        </Card>

        <View style={styles.statsRow}>
          {[
            { label: t('quizzes'), value: `${quizzesTaken}` },
            { label: t('avgScore'), value: quizzesTaken ? `${averageScore}%` : '—' },
            { label: t('studied'), value: formatStudied(secondsStudied) },
          ].map(stat => (
            <Card key={stat.label} style={styles.statCard}>
              <Text style={[Typography.h2, styles.ink]}>{stat.value}</Text>
              <Text style={[Typography.caption, styles.muted]}>{stat.label}</Text>
            </Card>
          ))}
        </View>

        <Card padding={0} style={styles.listCard}>
          {rows.map((row, index) => (
            <View key={row.key}>
              <TouchableOpacity style={styles.row} onPress={row.onPress}>
                {row.icon}
                <Text style={[Typography.bodyMedium, styles.rowLabel, styles.ink]}>{row.label}</Text>
                {row.key === 'reminders' ? (
                  <Switch value={remindersOn} onValueChange={setRemindersOn} />
                ) : (
                  <>
                    {row.trailing && (
                      <Text style={[Typography.caption, styles.muted]}>{row.trailing}</Text>
                    )}
                    <ChevronRightIcon size={18} color={`${Colors.ink}66`} />
                  </>
                )}
              </TouchableOpacity>
              {index < rows.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </Card>

        <TouchableOpacity style={styles.logoutRow} onPress={logOut}>
          <LogoutIcon size={20} />
          <Text style={[Typography.button, styles.red]}>{t('logOut')}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={clearProgress}>
          <Text style={[Typography.caption, styles.footerText]}>{t('profileFooter')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </Screen>
  )
}

export default ProfileHomeScreen;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(16),
    paddingBottom: moderateScale(130),
    gap: moderateScale(22),
  },
  ink: { color: Colors.ink },
  muted: { color: Colors.muted },
  surface: { color: Colors.surface },
  red: { color: Colors.red },
  identityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(14),
  },
  avatarWrap: {
    position: 'relative',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.badgeBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  planBadge: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: -8,
  },
  identityCopy: {
    flex: 1,
    gap: 4,
  },
  googleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  creditsCard: {
    gap: moderateScale(14),
  },
  creditsTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  creditsAmountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  creditsHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  creditsDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.coral,
  },
  creditsActions: {
    flexDirection: 'row',
    gap: 8,
  },
  creditsActionPrimary: {
    flex: 1,
    height: 44,
    borderRadius: 999,
    backgroundColor: Colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  creditsActionOutline: {
    flex: 1,
    height: 44,
    borderRadius: 999,
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: `${Colors.ink}26`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    paddingVertical: 14,
  },
  listCard: {
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 18,
    minHeight: 56,
  },
  rowLabel: {
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: `${Colors.ink}14`,
    marginHorizontal: 18,
  },
  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: Colors.surface,
    borderRadius: 22,
    paddingHorizontal: 18,
    minHeight: 56,
  },
  footerText: {
    textAlign: 'center',
    color: Colors.muted,
  },
});
