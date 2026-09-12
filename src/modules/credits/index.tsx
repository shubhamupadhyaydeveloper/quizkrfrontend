import React from 'react'
import { Alert, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Screen from '../../components/ui/Screen'
import Card from '../../components/ui/Card'
import PillButton from '../../components/ui/PillButton'
import GradientPill from '../../components/ui/GradientPill'
import { Colors } from '../../theme/colors'
import { FontFamily, Typography } from '../../theme/typography'
import { moderateScale } from '../../utils/responsive'
import { CheckIcon, CloseIcon } from '../../components/icons'
import { useAppStore } from '../../store/AppStore'
import { useT } from '../../i18n'

const STARTING_CREDITS = 20;

const PERKS = ['perk1', 'perk2', 'perk3'] as const;

const TOPUPS = [
  { credits: 10 },
  { credits: 30 },
  { credits: 100 },
];

const CreditsScreen = () => {
  const navigation = useNavigation();
  const { credits, plan, addCredits, goPro } = useAppStore();
  const t = useT();

  const progress = plan === 'pro' ? 1 : Math.min(1, credits / STARTING_CREDITS);

  const buyCredits = (amount: number) => {
    addCredits(amount);
    Alert.alert(t('creditsAddedTitle'), t('creditsAddedBody', { count: amount }));
  };

  const startPro = () => {
    goPro();
    Alert.alert(t('youArePro'), t('youAreProBody'));
  };

  return (
    <Screen background={Colors.bg}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.bg} />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
            <CloseIcon size={20} />
          </TouchableOpacity>
          <Text style={[Typography.h2, styles.ink]}>{t('creditsTitle')}</Text>
          <View style={styles.iconButton} />
        </View>

        <Card mesh radius={24} style={styles.planCard}>
          <View style={styles.planTop}>
            <Text style={[Typography.caption, styles.muted]}>
              {plan === 'pro' ? t('proPlan') : t('freePlan')}
            </Text>
            <View style={styles.planHint}>
              <View style={styles.dot} />
              <Text style={[Typography.caption, styles.ink]}>{t('creditEqQuiz')}</Text>
            </View>
          </View>
          <View style={styles.planAmountRow}>
            <Text style={styles.planAmount}>{plan === 'pro' ? '∞' : credits}</Text>
            <Text style={[Typography.bodyMedium, styles.muted]}>
              {plan === 'pro' ? t('quizzesWord') : t('creditsLeft')}
            </Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${Math.round(progress * 100)}%` }]} />
          </View>
          <Text style={[Typography.caption, styles.muted]}>
            {plan === 'pro' ? t('proActive') : t('startedWith', { count: STARTING_CREDITS })}
          </Text>
        </Card>

        <View style={styles.sectionHeader}>
          <Text style={[Typography.h2, styles.ink]}>{t('goPro')}</Text>
          <Text style={[Typography.caption, styles.muted]}>{t('goProUnlimited')}</Text>
        </View>

        <View style={styles.plansRow}>
          <Card style={styles.planOption}>
            <Text style={[Typography.caption, styles.muted]}>{t('monthly')}</Text>
            <Text style={[Typography.h1, styles.ink]}>[PRICE]</Text>
            <Text style={[Typography.caption, styles.muted]}>{t('perMonth')}</Text>
          </Card>
          <Card style={[styles.planOption, styles.planOptionHighlighted]}>
            <GradientPill label={t('bestValue')} fontSize={11} style={styles.bestValueBadge} />
            <Text style={[Typography.caption, styles.muted]}>{t('yearly')}</Text>
            <Text style={[Typography.h1, styles.ink]}>[PRICE]</Text>
            <Text style={[Typography.caption, styles.muted]}>{t('perYear')}</Text>
          </Card>
        </View>

        <Card style={styles.perksCard}>
          {PERKS.map(perk => (
            <View key={perk} style={styles.perkRow}>
              <CheckIcon size={14} color={Colors.green} />
              <Text style={[Typography.caption, styles.ink]}>{t(perk)}</Text>
            </View>
          ))}
        </Card>

        <View style={styles.sectionHeader}>
          <Text style={[Typography.h2, styles.ink]}>{t('topUp')}</Text>
          <Text style={[Typography.caption, styles.muted]}>{t('neverExpire')}</Text>
        </View>

        <View style={styles.topupsRow}>
          {TOPUPS.map(item => (
            <TouchableOpacity
              key={item.credits}
              style={styles.topupWrap}
              activeOpacity={0.85}
              onPress={() => buyCredits(item.credits)}
            >
              <Card style={styles.topupCard}>
                <Text style={[Typography.h2, styles.ink]}>{item.credits}</Text>
                <Text style={[Typography.caption, styles.muted]}>{t('credits')}</Text>
                <Text style={[Typography.bodyMedium, styles.ink, styles.topupPrice]}>[PRICE]</Text>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PillButton
          label={plan === 'pro' ? t('proIsActive') : t('startProYearly')}
          disabled={plan === 'pro'}
          onPress={startPro}
          style={styles.ctaShadow}
        />
        <Text style={[Typography.caption, styles.footerCaption]}>
          {t('cancelAnytime')}
        </Text>
      </View>
    </Screen>
  )
}

export default CreditsScreen;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(16),
    paddingBottom: moderateScale(150),
    gap: moderateScale(18),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ink: { color: Colors.ink },
  muted: { color: Colors.muted },
  planCard: {
    gap: moderateScale(12),
    padding: moderateScale(22),
  },
  planTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  planHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.coral,
  },
  planAmountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  planAmount: {
    color: Colors.ink,
    fontFamily: FontFamily.bodyBold,
    fontVariant: ['tabular-nums'],
    fontSize: moderateScale(52),
  },
  progressTrack: {
    height: 6,
    borderRadius: 999,
    backgroundColor: Colors.badgeBorder,
    overflow: 'hidden',
  },
  progressFill: {
    width: '55%',
    height: '100%',
    borderRadius: 999,
    backgroundColor: Colors.coral,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  plansRow: {
    flexDirection: 'row',
    gap: 10,
  },
  planOption: {
    flex: 1,
    gap: 8,
  },
  planOptionHighlighted: {
    borderWidth: 2,
    borderColor: Colors.ink,
  },
  bestValueBadge: {
    position: 'absolute',
    top: -11,
    right: 14,
    height: 22,
    paddingHorizontal: 10,
  },
  perksCard: {
    gap: 10,
  },
  perkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  topupsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  topupWrap: {
    flex: 1,
  },
  topupCard: {
    alignItems: 'center',
    gap: 4,
  },
  topupPrice: {
    marginTop: 4,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(18),
    paddingBottom: moderateScale(28),
    backgroundColor: Colors.bg,
    borderTopWidth: 1,
    borderTopColor: `${Colors.ink}14`,
    gap: 8,
  },
  footerCaption: {
    textAlign: 'center',
    color: Colors.muted,
  },
  ctaShadow: {
    shadowColor: Colors.ink,
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
});
