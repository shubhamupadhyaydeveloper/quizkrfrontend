import React, { useState } from 'react'
import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Screen from '../../components/ui/Screen'
import { EmptyNotesIllustration, PagesIllustration } from '../../components/illustrations'
import Card from '../../components/ui/Card'
import CreditsPopup from '../../components/CreditsPopup'
import { Colors } from '../../theme/colors'
import { Typography } from '../../theme/typography'
import { moderateScale } from '../../utils/responsive'
import { CameraIcon, ChevronRightIcon, PasteTextIcon, PdfIcon, UserIcon } from '../../components/icons'
import { BottomTabNavigationType, SavedQuiz } from '../../utils/types'
import { useAppStore } from '../../store/AppStore'
import { useT } from '../../i18n'

type Nav = NativeStackNavigationProp<BottomTabNavigationType, 'Home'>;

const SOURCE_ICONS = {
  scan: CameraIcon,
  pdf: PdfIcon,
  text: PasteTextIcon,
};

// The credits sheet opens once per cold start, on the first Home mount.
let popupShownThisLaunch = false;

const HomeScreen = () => {
  const navigation = useNavigation<Nav>();
  const t = useT();
  const { credits, plan, savedQuizzes } = useAppStore();
  const [showPopup, setShowPopup] = useState(() => {
    if (popupShownThisLaunch || plan !== 'free') return false;
    popupShownThisLaunch = true;
    return true;
  });

  const quickActions = [
    { label: t('quickScan'), screen: 'CreateScan', icon: <CameraIcon size={22} color={Colors.ink} /> },
    { label: t('quickPdf'), screen: 'CreateHome', icon: <PdfIcon size={22} color={Colors.ink} /> },
    { label: t('quickPaste'), screen: 'CreatePasteText', icon: <PasteTextIcon size={22} color={Colors.ink} /> },
  ];

  const goToCreate = (screen: string = 'CreateHome') => {
    navigation.navigate('Create', { screen } as any);
  };

  const openQuiz = (entry: SavedQuiz) => {
    navigation.navigate('Create', {
      screen: 'QuizTaking',
      params: { quiz: entry.quiz },
    } as any);
  };

  const seePlans = () => {
    setShowPopup(false);
    navigation.navigate('Profile', { screen: 'Credits' } as any);
  };

  const recent = savedQuizzes.slice(0, 6);

  return (
    <Screen background={Colors.bg}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.bg} />
      <CreditsPopup
        visible={showPopup}
        credits={credits}
        onClose={() => setShowPopup(false)}
        onSeePlans={seePlans}
      />
      <FlatList
        data={recent}
        keyExtractor={item => item.quiz.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View style={styles.headerRow}>
              <View style={styles.avatar}>
                <UserIcon size={26} color={Colors.ink} />
              </View>
              <View style={styles.headerCopy}>
                <Text style={[Typography.h1, styles.ink]}>{t('hello', { name: 'Aarav' })}</Text>
                <Text style={[Typography.body, styles.muted]}>
                  {recent.length ? t('studyingToday') : t('firstQuiz')}
                </Text>
              </View>
              <View style={styles.creditsChip}>
                <View style={styles.creditsDot} />
                <Text style={[Typography.h2, styles.creditsNumber]}>
                  {plan === 'pro' ? t('pro') : credits}
                </Text>
                {plan !== 'pro' && (
                  <Text style={[Typography.caption, styles.creditsLabel]}>{t('credits')}</Text>
                )}
              </View>
            </View>

            <TouchableOpacity activeOpacity={0.9} onPress={() => goToCreate()} style={styles.heroWrap}>
              <Card mesh radius={24} padding={0} style={styles.heroCard}>
                <View style={styles.heroCopy}>
                  <Text style={[Typography.h1, styles.ink]}>{t('heroTitle')}</Text>
                  <Text style={[Typography.body, styles.muted]}>{t('heroBody')}</Text>
                </View>
                <View style={styles.heroDivider} />
                <View style={styles.heroAction}>
                  <Text style={[Typography.bodyMedium, styles.ink]}>{t('heroAction')}</Text>
                  <ChevronRightIcon size={18} color={Colors.ink} />
                </View>
              </Card>
              <View style={styles.heroIllustration} pointerEvents="none">
                <PagesIllustration width={130} height={121} />
              </View>
            </TouchableOpacity>

            <View style={styles.quickRow}>
              {quickActions.map(action => (
                <TouchableOpacity
                  key={action.screen}
                  style={styles.quickItem}
                  activeOpacity={0.85}
                  onPress={() => goToCreate(action.screen)}
                >
                  <View style={styles.quickBadge}>{action.icon}</View>
                  <Text style={[Typography.caption, styles.ink]}>{action.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {recent.length > 0 && (
              <Text style={[Typography.h2, styles.sectionTitle]}>{t('yourQuizzes')}</Text>
            )}
          </>
        }
        renderItem={({ item }) => {
          const Icon = SOURCE_ICONS[item.quiz.source.kind];
          const limit = item.quiz.settings.timeLimitMinutes;
          return (
            <TouchableOpacity activeOpacity={0.85} onPress={() => openQuiz(item)}>
              <Card style={styles.quizRow}>
                <View style={styles.quizIconSlot}>
                  <Icon size={22} color={Colors.ink} />
                </View>
                <View style={styles.quizCopy}>
                  <Text style={[Typography.bodyMedium, styles.ink]} numberOfLines={1}>
                    {item.quiz.title}
                  </Text>
                  <Text style={[Typography.caption, styles.muted]} numberOfLines={1}>
                    {t('questionsCount', { count: item.quiz.questions.length })} ·{' '}
                    {t(item.quiz.settings.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard')} ·{' '}
                    {limit ? t('minutesShort', { count: limit }) : t('noLimit')}
                  </Text>
                </View>
                {item.status === 'completed' ? (
                  <Text style={[Typography.h2, styles.ink]}>{item.scorePercent}%</Text>
                ) : (
                  <Text style={[Typography.caption, styles.muted]}>{t('savedTag')}</Text>
                )}
              </Card>
            </TouchableOpacity>
          );
        }}
        ItemSeparatorComponent={() => <View style={{ height: moderateScale(10) }} />}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <EmptyNotesIllustration />
            <Text style={[Typography.h2, styles.ink]}>{t('emptyTitle')}</Text>
            <Text style={[Typography.body, styles.muted, styles.emptyText]}>{t('emptyBody')}</Text>
          </View>
        }
      />
    </Screen>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(16),
    paddingBottom: moderateScale(130),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(12),
    marginBottom: moderateScale(26),
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.subtleBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCopy: {
    flex: 1,
    gap: 3,
  },
  ink: {
    color: Colors.ink,
  },
  muted: {
    color: Colors.muted,
  },
  creditsChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    height: 40,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.subtleBorder,
  },
  creditsDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.coral,
  },
  creditsNumber: {
    color: Colors.ink,
    fontSize: moderateScale(15),
  },
  creditsLabel: {
    color: Colors.muted,
  },
  heroWrap: {
    marginBottom: moderateScale(24),
  },
  heroCard: {
    paddingTop: moderateScale(24),
  },
  heroIllustration: {
    position: 'absolute',
    right: 8,
    top: -18,
  },
  heroCopy: {
    gap: 8,
    maxWidth: moderateScale(210),
    paddingHorizontal: moderateScale(22),
  },
  heroDivider: {
    height: 1,
    backgroundColor: Colors.subtleBorder,
    marginTop: moderateScale(20),
    marginHorizontal: moderateScale(22),
  },
  heroAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(22),
    paddingTop: 14,
    paddingBottom: 16,
  },
  quickRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: moderateScale(32),
  },
  quickItem: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  quickBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.badgeBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    color: Colors.ink,
    marginBottom: moderateScale(16),
  },
  quizRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(14),
  },
  quizIconSlot: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.badgeBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quizCopy: {
    flex: 1,
    gap: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(16),
    paddingHorizontal: moderateScale(24),
    paddingTop: moderateScale(20),
  },
  emptyText: {
    textAlign: 'center',
  },
});
