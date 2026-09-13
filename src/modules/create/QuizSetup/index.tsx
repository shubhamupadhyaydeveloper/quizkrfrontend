import React, { useMemo, useState } from 'react'
import { Alert, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Screen from '../../../components/ui/Screen'
import Card from '../../../components/ui/Card'
import PillButton from '../../../components/ui/PillButton'
import { Colors } from '../../../theme/colors'
import { FontFamily, Typography } from '../../../theme/typography'
import { moderateScale } from '../../../utils/responsive'
import { CameraIcon, ChevronLeftIcon, DocIcon, PasteTextIcon, SparkleIcon } from '../../../components/icons'
import { CreateStackNavigationType, Difficulty, QuizSettings } from '../../../utils/types'
import { availableQuestionCount } from '../../../data/questionBank'
import { useAppStore } from '../../../store/AppStore'
import { useT } from '../../../i18n'

type Nav = NativeStackNavigationProp<CreateStackNavigationType, 'QuizSetup'>;

const DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard'];
const TIME_LIMITS = ['None', '10 min', '15 min', '20 min'] as const;

const SOURCE_ICONS = {
  scan: CameraIcon,
  pdf: DocIcon,
  text: PasteTextIcon,
};

const QuizSetupScreen = () => {
  const navigation = useNavigation<Nav>();
  const { source } = useRoute<RouteProp<CreateStackNavigationType, 'QuizSetup'>>().params;
  const { credits, plan } = useAppStore();
  const t = useT();

  const [questionCount, setQuestionCount] = useState(10);
  const [difficulty, setDifficulty] = useState<Difficulty>('Medium');
  const [multipleChoice, setMultipleChoice] = useState(true);
  const [trueFalse, setTrueFalse] = useState(true);
  const [timeLimit, setTimeLimit] = useState<typeof TIME_LIMITS[number]>('15 min');

  const SourceIcon = SOURCE_ICONS[source.kind];

  // Never offer more questions than the generator can actually produce.
  const maxQuestions = useMemo(
    () =>
      Math.min(
        30,
        availableQuestionCount(source.topicId, {
          questionCount: 30,
          difficulty,
          multipleChoice,
          trueFalse,
          timeLimitMinutes: null,
        }),
      ),
    [source.topicId, difficulty, multipleChoice, trueFalse],
  );

  const effectiveCount = Math.min(questionCount, Math.max(4, maxQuestions));
  const noTypesPicked = !multipleChoice && !trueFalse;

  const generate = () => {
    if (noTypesPicked) {
      Alert.alert(t('pickTypeTitle'), t('pickTypeBody'));
      return;
    }
    if (plan === 'free' && credits <= 0) {
      Alert.alert(t('outOfCreditsTitle'), t('outOfCreditsBody'));
      return;
    }
    const settings: QuizSettings = {
      questionCount: effectiveCount,
      difficulty,
      multipleChoice,
      trueFalse,
      timeLimitMinutes: timeLimit === 'None' ? null : parseInt(timeLimit, 10),
    };
    navigation.navigate('Generating', { source, settings });
  };

  return (
    <Screen background={Colors.bg}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size={20} />
          </TouchableOpacity>
          <Text style={[Typography.h2, styles.ink]}>{t('setupTitle')}</Text>
          <View style={styles.iconButton} />
        </View>

        <Card style={styles.sourceRow}>
          <View style={styles.sourceIconSlot}>
            <SourceIcon size={18} color={Colors.ink} />
          </View>
          <View style={styles.sourceCopy}>
            <Text style={[Typography.bodyMedium, styles.ink]} numberOfLines={1}>
              {source.title}
            </Text>
            <Text style={[Typography.caption, styles.muted]}>{source.detail}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={[Typography.caption, styles.mutedBold]}>{t('change')}</Text>
          </TouchableOpacity>
        </Card>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[Typography.h2, styles.ink]}>{t('questions')}</Text>
            <Text style={[Typography.caption, styles.muted]}>{t('upTo', { count: maxQuestions })}</Text>
          </View>
          <Card style={styles.stepper} radius={22} padding={10}>
            <TouchableOpacity
              style={styles.stepperButton}
              onPress={() => setQuestionCount(c => Math.max(4, Math.min(c, maxQuestions) - 1))}
            >
              <Text style={styles.stepperGlyph}>–</Text>
            </TouchableOpacity>
            <Text style={styles.stepperValue}>{effectiveCount}</Text>
            <TouchableOpacity
              style={[styles.stepperButton, styles.stepperButtonActive]}
              onPress={() => setQuestionCount(c => Math.min(maxQuestions, c + 1))}
            >
              <Text style={[styles.stepperGlyph, styles.stepperGlyphActive]}>+</Text>
            </TouchableOpacity>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={[Typography.h2, styles.ink]}>{t('difficulty')}</Text>
          <View style={styles.segmented}>
            {DIFFICULTIES.map(level => (
              <TouchableOpacity
                key={level}
                style={[styles.segment, difficulty === level && styles.segmentActive]}
                onPress={() => setDifficulty(level)}
              >
                <Text style={[Typography.bodyMedium, difficulty === level ? styles.surface : styles.muted]}>
                  {t(level.toLowerCase() as 'easy' | 'medium' | 'hard')}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[Typography.h2, styles.ink]}>{t('questionTypes')}</Text>
          <Card padding={0} style={styles.toggleList}>
            <View style={styles.toggleRow}>
              <View style={styles.toggleCopy}>
                <Text style={[Typography.bodyMedium, styles.ink]}>{t('multipleChoice')}</Text>
                <Text style={[Typography.caption, styles.muted]}>{t('multipleChoiceBody')}</Text>
              </View>
              <ToggleSwitch value={multipleChoice} onChange={setMultipleChoice} />
            </View>
            <View style={styles.divider} />
            <View style={styles.toggleRow}>
              <View style={styles.toggleCopy}>
                <Text style={[Typography.bodyMedium, styles.ink]}>{t('trueFalse')}</Text>
                <Text style={[Typography.caption, styles.muted]}>{t('trueFalseBody')}</Text>
              </View>
              <ToggleSwitch value={trueFalse} onChange={setTrueFalse} />
            </View>
          </Card>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[Typography.h2, styles.ink]}>{t('timeLimit')}</Text>
            <Text style={[Typography.caption, styles.muted]}>{t('wholeQuiz')}</Text>
          </View>
          <View style={styles.timeRow}>
            {TIME_LIMITS.map(limit => (
              <TouchableOpacity
                key={limit}
                style={[styles.timeChip, timeLimit === limit && styles.timeChipActive]}
                onPress={() => setTimeLimit(limit)}
              >
                <Text style={[Typography.caption, timeLimit === limit ? styles.surface : styles.muted]}>
                  {limit === 'None' ? t('none') : limit}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PillButton
          label={t('generateQuiz')}
          variant="gradient"
          icon={<SparkleIcon size={18} color={Colors.ink} />}
          iconPosition="left"
          disabled={noTypesPicked}
          onPress={generate}
        />
        <Text style={[Typography.caption, styles.footerNote]}>
          {plan === 'pro' ? t('proUnlimited') : t('usesCredit', { count: credits })}
        </Text>
      </View>
    </Screen>
  )
}

const ToggleSwitch = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
  <TouchableOpacity
    style={[styles.toggleTrack, value && styles.toggleTrackActive]}
    onPress={() => onChange(!value)}
  >
    <View style={[styles.toggleThumb, value && styles.toggleThumbActive]} />
  </TouchableOpacity>
);

export default QuizSetupScreen;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(16),
    paddingBottom: moderateScale(16),
    gap: moderateScale(24),
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
  mutedBold: { color: Colors.muted, fontWeight: '700' },
  surface: { color: Colors.surface },
  sourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sourceIconSlot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.badgeBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sourceCopy: {
    flex: 1,
    gap: 2,
  },
  section: {
    gap: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepperButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.badgeBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperButtonActive: {
    backgroundColor: Colors.ink,
  },
  stepperGlyph: {
    fontSize: 22,
    fontFamily: 'Inter_18pt-SemiBold',
    color: Colors.ink,
  },
  stepperGlyphActive: {
    color: Colors.surface,
  },
  stepperValue: {
    fontSize: moderateScale(32),
    fontFamily: FontFamily.bodyBold,
    fontVariant: ['tabular-nums'],
    color: Colors.ink,
  },
  segmented: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 999,
    padding: 5,
    gap: 4,
  },
  segment: {
    flex: 1,
    height: 44,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentActive: {
    backgroundColor: Colors.ink,
  },
  toggleList: {
    overflow: 'hidden',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  toggleCopy: {
    gap: 2,
  },
  divider: {
    height: 1,
    backgroundColor: `${Colors.ink}14`,
    marginHorizontal: 18,
  },
  toggleTrack: {
    width: 50,
    height: 30,
    borderRadius: 999,
    backgroundColor: `${Colors.ink}1F`,
    padding: 3,
    justifyContent: 'center',
  },
  toggleTrackActive: {
    backgroundColor: Colors.ink,
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.surface,
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  timeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  timeChip: {
    flex: 1,
    height: 48,
    borderRadius: 999,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeChipActive: {
    backgroundColor: Colors.ink,
  },
  footerNote: {
    textAlign: 'center',
    color: Colors.muted,
    marginTop: 8,
  },
  footer: {
    paddingHorizontal: moderateScale(20),
    paddingBottom: moderateScale(28),
    paddingTop: moderateScale(12),
    borderTopWidth: 1,
    borderTopColor: `${Colors.ink}14`,
    backgroundColor: Colors.bg,
  },
});
