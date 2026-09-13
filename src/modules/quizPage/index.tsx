import React, { useEffect, useRef, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Alert, ScrollView, StatusBar, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import Screen from '../../components/ui/Screen'
import Card from '../../components/ui/Card'
import PillButton from '../../components/ui/PillButton'
import { Colors } from '../../theme/colors'
import { FontFamily, Typography } from '../../theme/typography'
import { moderateScale } from '../../utils/responsive'
import { ArrowRightIcon, CheckCircleIcon, ChevronLeftIcon, ClockIcon, FlagIcon, QuestionMarkIcon, XCircleIcon } from '../../components/icons'
import { CreateStackNavigationType, QuizAttempt } from '../../utils/types'
import { useT } from '../../i18n'

type Nav = NativeStackNavigationProp<CreateStackNavigationType, 'QuizTaking'>;

const formatTime = (totalSeconds: number) => {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

const QuizPageScreen = () => {
  const route = useRoute<RouteProp<CreateStackNavigationType, 'QuizTaking'>>();
  const navigation = useNavigation<Nav>();
  const { quiz } = route.params;
  const t = useT();

  const limitSeconds = quiz.settings.timeLimitMinutes
    ? quiz.settings.timeLimitMinutes * 60
    : null;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(() =>
    quiz.questions.map(() => null),
  );
  const [flagged, setFlagged] = useState<number[]>([]);
  const [elapsed, setElapsed] = useState(0);
  const finished = useRef(false);
  // The timer fires outside render, so it reads answers/flags from refs.
  const answersRef = useRef(answers);
  const flaggedRef = useRef(flagged);
  answersRef.current = answers;
  flaggedRef.current = flagged;

  const question = quiz.questions[currentIndex];
  const selected = answers[currentIndex];
  const isLast = currentIndex === quiz.questions.length - 1;

  const finish = (finalAnswers: (string | null)[], seconds: number) => {
    if (finished.current) return;
    finished.current = true;
    const correctCount = finalAnswers.reduce(
      (total, answer, index) => (answer === quiz.questions[index].answer ? total + 1 : total),
      0,
    );
    const attempt: QuizAttempt = {
      quiz,
      answers: finalAnswers,
      flagged: flaggedRef.current,
      correctCount,
      secondsTaken: seconds,
    };
    navigation.replace('QuizResults', { attempt });
  };

  useEffect(() => {
    const started = Date.now();
    const timer = setInterval(() => {
      const seconds = Math.floor((Date.now() - started) / 1000);
      setElapsed(seconds);
      if (limitSeconds && seconds >= limitSeconds) {
        clearInterval(timer);
        // Time is up — hand over whatever has been answered so far.
        finish(answersRef.current, limitSeconds);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [limitSeconds]);

  if (!question) {
    return (
      <Screen background={Colors.bg}>
        <View style={styles.loading}>
          <Text style={[Typography.body, styles.muted]}>{t('noQuestions')}</Text>
        </View>
      </Screen>
    );
  }

  const handleSelect = (option: string) => {
    if (selected) return;
    setAnswers(previous => {
      const next = [...previous];
      next[currentIndex] = option;
      return next;
    });
  };

  const handleNext = () => {
    if (isLast) {
      finish(answers, elapsed);
      return;
    }
    setCurrentIndex(index => index + 1);
  };

  const toggleFlag = () => {
    setFlagged(previous =>
      previous.includes(currentIndex)
        ? previous.filter(index => index !== currentIndex)
        : [...previous, currentIndex],
    );
  };

  const confirmQuit = () => {
    Alert.alert(t('leaveTitle'), t('leaveBody'), [
      { text: t('keepGoing'), style: 'cancel' },
      { text: t('leave'), style: 'destructive', onPress: () => navigation.goBack() },
    ]);
  };

  const isFlagged = flagged.includes(currentIndex);
  const timeDisplay = limitSeconds ? formatTime(Math.max(0, limitSeconds - elapsed)) : formatTime(elapsed);
  const runningLow = limitSeconds !== null && limitSeconds - elapsed <= 30;

  return (
    <Screen background={Colors.bg}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerArea}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.iconButton} onPress={confirmQuit}>
            <ChevronLeftIcon size={20} />
          </TouchableOpacity>
          <Text style={[Typography.h2, styles.ink]}>{t('quiz')}</Text>
          <View style={[styles.timerPill, runningLow && styles.timerPillLow]}>
            <ClockIcon size={15} color={runningLow ? Colors.red : Colors.ink} />
            <Text style={[Typography.h2, styles.timerText, runningLow && styles.timerTextLow]}>
              {timeDisplay}
            </Text>
          </View>
        </View>
        <View style={styles.progressRow}>
          <Text style={[Typography.caption, styles.muted]}>
            {t('progressOf', { current: currentIndex + 1, total: quiz.questions.length })}
          </Text>
          <View style={styles.progressTrack}>
            {quiz.questions.map((_, index) => (
              <View
                key={index}
                style={[styles.progressSegment, index <= currentIndex && styles.progressSegmentFilled]}
              />
            ))}
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        <Card style={styles.questionCard} radius={26} padding={0}>
          <View style={styles.questionArt}>
            <QuestionMarkIcon size={72} />
          </View>
          <View style={styles.questionTextWrap}>
            <Text style={[Typography.h1, styles.ink]}>{question.question}</Text>
          </View>
        </Card>

        <View style={styles.options}>
          {question.options.map((option, index) => {
            const isSelected = selected === option;
            const isCorrectOption = option === question.answer;
            const showState = selected !== null;

            let cardStyle: ViewStyle = styles.optionDefault;
            let textColor: TextStyle = styles.ink;
            if (showState && isCorrectOption) {
              cardStyle = styles.optionCorrect;
              textColor = styles.surface;
            } else if (showState && isSelected && !isCorrectOption) {
              cardStyle = styles.optionWrong;
            } else if (showState) {
              cardStyle = styles.optionDim;
            }

            return (
              <TouchableOpacity
                key={option}
                activeOpacity={0.85}
                onPress={() => handleSelect(option)}
                disabled={showState}
              >
                <View style={[styles.optionRow, cardStyle]}>
                  <View
                    style={[
                      styles.optionBadge,
                      showState && isCorrectOption && styles.optionBadgeOnDark,
                      showState && isSelected && !isCorrectOption && styles.optionBadgeWrong,
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionBadgeText,
                        showState && (isCorrectOption || (isSelected && !isCorrectOption)) && styles.surface,
                      ]}
                    >
                      {String.fromCharCode(65 + index)}
                    </Text>
                  </View>
                  <View style={styles.optionCopy}>
                    <Text style={[Typography.bodyMedium, textColor]}>{option}</Text>
                    {showState && isSelected && !isCorrectOption && (
                      <Text style={[Typography.caption, styles.wrongLabel]}>{t('yourAnswer')}</Text>
                    )}
                  </View>
                  {showState && isCorrectOption && <CheckCircleIcon size={22} />}
                  {showState && isSelected && !isCorrectOption && <XCircleIcon size={22} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {selected !== null && (
          <>
            {question.explanation && (
              <Card style={styles.explanationCard}>
                <Text style={[Typography.caption, styles.muted]}>{t('why')}</Text>
                <Text style={[Typography.body, styles.ink]}>{question.explanation}</Text>
              </Card>
            )}
            <TouchableOpacity style={styles.flagRow} onPress={toggleFlag}>
              <FlagIcon size={16} color={isFlagged ? Colors.coral : Colors.muted} />
              <Text style={[Typography.bodyMedium, isFlagged ? styles.coral : styles.muted]}>
                {isFlagged ? t('flaggedRecheck') : t('flagIt')}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <PillButton
          label={isLast ? t('seeResults') : t('next')}
          icon={<ArrowRightIcon size={20} />}
          disabled={selected === null}
          onPress={handleNext}
        />
      </View>
    </Screen>
  );
};

export default QuizPageScreen;

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ink: { color: Colors.ink },
  muted: { color: Colors.muted },
  surface: { color: Colors.surface },
  coral: { color: Colors.coral },
  wrongLabel: { color: Colors.red },
  headerArea: {
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(16),
    gap: moderateScale(14),
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
  timerPill: {
    height: 36,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: Colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timerPillLow: {
    backgroundColor: `${Colors.red}1A`,
  },
  timerText: {
    fontSize: moderateScale(14),
    color: Colors.ink,
  },
  timerTextLow: {
    color: Colors.red,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressTrack: {
    flex: 1,
    flexDirection: 'row',
    gap: 4,
  },
  progressSegment: {
    flex: 1,
    height: 5,
    borderRadius: 999,
    backgroundColor: `${Colors.ink}1A`,
  },
  progressSegmentFilled: {
    backgroundColor: Colors.ink,
  },
  body: {
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(14),
    paddingBottom: moderateScale(16),
    gap: moderateScale(14),
  },
  questionCard: {
    overflow: 'hidden',
  },
  questionArt: {
    height: moderateScale(104),
    backgroundColor: Colors.cardBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionTextWrap: {
    padding: moderateScale(20),
  },
  options: {
    gap: moderateScale(8),
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(14),
    minHeight: 54,
    borderRadius: 18,
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(10),
  },
  optionDefault: {
    backgroundColor: Colors.surface,
  },
  optionDim: {
    backgroundColor: Colors.surface,
    opacity: 0.55,
  },
  optionCorrect: {
    backgroundColor: Colors.green,
  },
  optionWrong: {
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderColor: Colors.red,
  },
  optionBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: `${Colors.ink}40`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionBadgeOnDark: {
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderColor: 'transparent',
  },
  optionBadgeWrong: {
    backgroundColor: Colors.red,
    borderColor: 'transparent',
  },
  optionBadgeText: {
    fontFamily: FontFamily.bodyBold,
    fontSize: 12,
    color: Colors.ink,
  },
  optionCopy: {
    flex: 1,
    gap: 1,
  },
  explanationCard: {
    gap: 6,
  },
  flagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 44,
  },
  footer: {
    paddingHorizontal: moderateScale(20),
    paddingBottom: moderateScale(28),
    paddingTop: moderateScale(10),
  },
});
