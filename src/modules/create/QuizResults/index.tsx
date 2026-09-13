import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Screen from '../../../components/ui/Screen'
import Card from '../../../components/ui/Card'
import { CheckIllustration } from '../../../components/illustrations'
import { Colors } from '../../../theme/colors'
import { FontFamily, Typography } from '../../../theme/typography'
import { moderateScale } from '../../../utils/responsive'
import { BookmarkIcon, CheckIcon, ChevronRightIcon, CloseIcon, FlagIcon, XCircleIcon } from '../../../components/icons'
import { CreateStackNavigationType } from '../../../utils/types'
import { useAppStore } from '../../../store/AppStore'
import { useT } from '../../../i18n'

type Nav = NativeStackNavigationProp<CreateStackNavigationType, 'QuizResults'>;

const formatDuration = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

const QuizResultsScreen = () => {
  const navigation = useNavigation<Nav>();
  const { attempt } = useRoute<RouteProp<CreateStackNavigationType, 'QuizResults'>>().params;
  const { recordAttempt, saveQuiz } = useAppStore();
  const [saved, setSaved] = useState(false);
  const t = useT();
  const recorded = useRef(false);

  const { quiz, answers, flagged, correctCount, secondsTaken } = attempt;
  const total = quiz.questions.length;
  const wrongCount = total - correctCount;
  const scorePercent = total ? Math.round((correctCount / total) * 100) : 0;

  useEffect(() => {
    if (recorded.current) return;
    recorded.current = true;
    recordAttempt(attempt);
  }, [attempt, recordAttempt]);

  const handleSave = () => {
    if (saved) return;
    saveQuiz({ ...quiz, id: `${quiz.id}-saved` });
    setSaved(true);
  };

  const goHome = () => navigation.getParent()?.navigate('Home' as never);

  return (
    <Screen background={Colors.bg}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.iconButton} onPress={goHome}>
            <CloseIcon size={20} />
          </TouchableOpacity>
          <Text style={[Typography.h2, styles.ink]}>{t('quizResults')}</Text>
          <TouchableOpacity style={styles.iconButton} onPress={handleSave}>
            <BookmarkIcon size={18} color={saved ? Colors.coral : Colors.ink} />
          </TouchableOpacity>
        </View>

        <Card mesh radius={28} style={styles.scoreCard}>
          <CheckIllustration />
          <View style={styles.scoreCopy}>
            <View style={styles.scoreRow}>
              <Text style={styles.scoreNumber}>{scorePercent}</Text>
              <Text style={styles.scorePercent}>%</Text>
            </View>
            <Text style={[Typography.bodyMedium, styles.muted]}>
              {t('ofCorrect', { correct: correctCount, total })}
            </Text>
          </View>
          <View style={styles.hairline} />
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={[Typography.h2, styles.green]}>{correctCount}</Text>
              <Text style={[Typography.caption, styles.muted]}>{t('correct')}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[Typography.h2, styles.red]}>{wrongCount}</Text>
              <Text style={[Typography.caption, styles.muted]}>{t('wrong')}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[Typography.h2, styles.ink]}>{formatDuration(secondsTaken)}</Text>
              <Text style={[Typography.caption, styles.muted]}>{t('time')}</Text>
            </View>
          </View>
        </Card>

        <View style={styles.reviewHeader}>
          <Text style={[Typography.h2, styles.ink]}>{t('review')}</Text>
          {flagged.length > 0 && (
            <TouchableOpacity
              style={styles.flaggedPill}
              onPress={() => navigation.navigate('FlaggedQuestions', { attempt })}
            >
              <FlagIcon size={14} color={Colors.ink} />
              <Text style={[Typography.bodyMedium, styles.ink]}>{t('flaggedCount', { count: flagged.length })}</Text>
              <ChevronRightIcon size={16} color={Colors.ink} />
            </TouchableOpacity>
          )}
        </View>

        {quiz.questions.map((question, index) => {
          const answer = answers[index];
          const isFlagged = flagged.includes(index);
          const isCorrect = answer === question.answer;

          return (
            <TouchableOpacity
              key={question.id}
              activeOpacity={isFlagged ? 0.85 : 1}
              onPress={() => isFlagged && navigation.navigate('FlaggedQuestions', { attempt })}
            >
              <Card style={styles.reviewRow}>
                <View
                  style={[
                    styles.reviewDot,
                    isFlagged
                      ? styles.reviewDotFlagged
                      : isCorrect
                        ? styles.reviewDotCorrect
                        : styles.reviewDotWrong,
                  ]}
                >
                  {isFlagged ? (
                    <FlagIcon size={12} color={Colors.surface} />
                  ) : isCorrect ? (
                    <CheckIcon size={13} />
                  ) : (
                    <XCircleIcon size={13} color={Colors.surface} />
                  )}
                </View>
                <View style={styles.reviewCopy}>
                  <Text style={[Typography.bodyMedium, styles.ink]} numberOfLines={1}>
                    {question.question}
                  </Text>
                  <Text style={[Typography.caption, styles.muted]} numberOfLines={1}>
                    {isFlagged
                      ? t('flaggedTap')
                      : isCorrect
                        ? t('correctAnswer', { answer: question.answer })
                        : answer
                          ? t('youSaid', { answer, correct: question.answer })
                          : t('skipped', { answer: question.answer })}
                  </Text>
                </View>
                {isFlagged && <ChevronRightIcon size={18} color={`${Colors.ink}66`} />}
              </Card>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.homeButton} onPress={goHome}>
          <Text style={[Typography.button, styles.surface]}>{t('backHome')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.replace('Generating', { source: quiz.source, settings: quiz.settings })
          }
        >
          <Text style={[Typography.bodyMedium, styles.ink, styles.retakeText]}>{t('retakeQuiz')}</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  )
}

export default QuizResultsScreen;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(16),
    paddingBottom: moderateScale(150),
    gap: moderateScale(12),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: moderateScale(6),
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
  surface: { color: Colors.surface },
  green: { color: Colors.green },
  red: { color: Colors.red },
  scoreCard: {
    alignItems: 'center',
    gap: moderateScale(14),
    paddingVertical: moderateScale(26),
  },
  scoreCopy: {
    alignItems: 'center',
    gap: 4,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  scoreNumber: {
    fontFamily: FontFamily.bodyBold,
    fontVariant: ['tabular-nums'],
    fontSize: moderateScale(56),
    color: Colors.ink,
  },
  scorePercent: {
    fontFamily: FontFamily.bodyBold,
    fontVariant: ['tabular-nums'],
    fontSize: moderateScale(28),
    color: Colors.muted,
  },
  hairline: {
    width: '100%',
    height: 1,
    backgroundColor: `${Colors.ink}14`,
  },
  statsRow: {
    flexDirection: 'row',
    width: '100%',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: moderateScale(10),
    minHeight: 36,
  },
  flaggedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 34,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: Colors.surface,
  },
  reviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(12),
  },
  reviewDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewDotCorrect: {
    backgroundColor: Colors.green,
  },
  reviewDotWrong: {
    backgroundColor: Colors.red,
  },
  reviewDotFlagged: {
    backgroundColor: Colors.coral,
  },
  reviewCopy: {
    flex: 1,
    gap: 2,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(16),
    paddingBottom: moderateScale(28),
    backgroundColor: Colors.bg,
    borderTopWidth: 1,
    borderTopColor: `${Colors.ink}14`,
    gap: 10,
  },
  homeButton: {
    height: moderateScale(58),
    borderRadius: 999,
    backgroundColor: Colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  retakeText: {
    textAlign: 'center',
  },
});
