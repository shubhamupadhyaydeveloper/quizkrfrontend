import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Screen from '../../../components/ui/Screen'
import Card from '../../../components/ui/Card'
import { Colors } from '../../../theme/colors'
import { FontFamily, Typography } from '../../../theme/typography'
import { moderateScale } from '../../../utils/responsive'
import { CheckIcon, ChevronLeftIcon, FlagIcon, RetryIcon } from '../../../components/icons'
import { CreateStackNavigationType } from '../../../utils/types'
import { useT } from '../../../i18n'

type Nav = NativeStackNavigationProp<CreateStackNavigationType, 'FlaggedQuestions'>;

type CheckState = 'idle' | 'checking' | 'confirmed';

const FlaggedQuestionsScreen = () => {
  const navigation = useNavigation<Nav>();
  const { attempt } = useRoute<RouteProp<CreateStackNavigationType, 'FlaggedQuestions'>>().params;
  const { quiz, answers } = attempt;
  const t = useT();

  const [flagged, setFlagged] = useState<number[]>(attempt.flagged);
  const [checks, setChecks] = useState<Record<number, CheckState>>({});
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const checkAgain = (index: number) => {
    setChecks(previous => ({ ...previous, [index]: 'checking' }));
    // Stands in for asking the model to look at the question again.
    timers.current.push(
      setTimeout(() => {
        setChecks(previous => ({ ...previous, [index]: 'confirmed' }));
      }, 1600),
    );
  };

  const unflag = (index: number) => setFlagged(previous => previous.filter(item => item !== index));

  return (
    <Screen background={Colors.bg}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size={20} />
          </TouchableOpacity>
          <Text style={[Typography.h2, styles.ink]}>{t('flaggedTitle')}</Text>
          <View style={styles.iconButton} />
        </View>

        <Text style={[Typography.body, styles.muted]}>
          {t('flaggedIntro')}
        </Text>

        {flagged.length === 0 && (
          <Card style={styles.emptyCard}>
            <CheckIcon size={20} color={Colors.green} />
            <Text style={[Typography.bodyMedium, styles.ink]}>{t('nothingFlagged')}</Text>
            <Text style={[Typography.caption, styles.muted, styles.center]}>
              {t('nothingFlaggedBody')}
            </Text>
          </Card>
        )}

        {flagged.map(index => {
          const question = quiz.questions[index];
          if (!question) return null;
          const yourAnswer = answers[index];
          const state = checks[index] ?? 'idle';

          return (
            <Card key={question.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={[Typography.caption, styles.muted]}>{t('questionN', { n: index + 1 })}</Text>
                {state === 'confirmed' ? (
                  <View style={styles.statusPillChecked}>
                    <CheckIcon size={12} />
                    <Text style={[Typography.caption, styles.surfaceBold]}>{t('checked')}</Text>
                  </View>
                ) : (
                  <View style={styles.statusPillFlagged}>
                    <FlagIcon size={12} color={Colors.ink} />
                    <Text style={[Typography.caption, styles.ink]}>{t('flagged')}</Text>
                  </View>
                )}
              </View>

              <Text style={[Typography.h2, styles.ink]}>{question.question}</Text>

              <View style={styles.options}>
                {question.options.map((option, optionIndex) => {
                  const isAnswer = option === question.answer;
                  const isYours = option === yourAnswer;
                  return (
                    <View
                      key={option}
                      style={[
                        styles.optionRow,
                        isAnswer && styles.optionCorrect,
                        !isAnswer && isYours && styles.optionOutline,
                        !isAnswer && !isYours && styles.optionMuted,
                      ]}
                    >
                      <Text style={[styles.optionLetter, isAnswer && styles.surface]}>
                        {String.fromCharCode(65 + optionIndex)}
                      </Text>
                      <View style={styles.optionCopy}>
                        <Text style={[Typography.bodyMedium, isAnswer ? styles.surface : styles.ink]}>
                          {option}
                        </Text>
                      </View>
                      {(isAnswer || isYours) && (
                        <Text
                          style={[Typography.caption, isAnswer ? styles.surfaceMuted : styles.muted]}
                        >
                          {isAnswer ? t('markedCorrect') : t('yourAnswer')}
                        </Text>
                      )}
                    </View>
                  );
                })}
              </View>

              {state === 'confirmed' ? (
                <>
                  {question.explanation && (
                    <View style={styles.updatedRow}>
                      <CheckIcon size={14} color={Colors.green} />
                      <Text style={[Typography.caption, styles.muted, styles.explanation]}>
                        {question.explanation}
                      </Text>
                    </View>
                  )}
                  <TouchableOpacity style={styles.clearButton} onPress={() => unflag(index)}>
                    <Text style={[Typography.button, styles.ink]}>{t('clearFlag')}</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <View style={styles.rowActions}>
                  <TouchableOpacity
                    style={styles.checkAgainButton}
                    onPress={() => checkAgain(index)}
                    disabled={state === 'checking'}
                  >
                    {state === 'checking' ? (
                      <ActivityIndicator color={Colors.surface} />
                    ) : (
                      <>
                        <RetryIcon size={18} />
                        <Text style={[Typography.button, styles.surface]}>{t('checkAgain')}</Text>
                      </>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.unflagButton} onPress={() => unflag(index)}>
                    <Text style={[Typography.button, styles.ink]}>{t('unflag')}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Card>
          );
        })}

        <TouchableOpacity
          style={styles.regenerateRow}
          onPress={() =>
            navigation.replace('Generating', { source: quiz.source, settings: quiz.settings })
          }
        >
          <RetryIcon size={16} color={Colors.ink} />
          <Text style={[Typography.bodyMedium, styles.ink]}>{t('regenerate')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </Screen>
  )
}

export default FlaggedQuestionsScreen;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(16),
    paddingBottom: moderateScale(40),
    gap: moderateScale(20),
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
  surface: { color: Colors.surface },
  surfaceMuted: { color: Colors.surface, opacity: 0.75 },
  surfaceBold: { color: Colors.surface, fontWeight: '700' },
  center: { textAlign: 'center' },
  emptyCard: {
    alignItems: 'center',
    gap: 8,
    paddingVertical: moderateScale(28),
  },
  card: {
    gap: moderateScale(14),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusPillChecked: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    height: 26,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: Colors.green,
  },
  statusPillFlagged: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    height: 26,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: Colors.bg,
  },
  options: {
    gap: 8,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 46,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: Colors.bg,
  },
  optionMuted: {
    opacity: 0.6,
  },
  optionOutline: {
    borderWidth: 1.5,
    borderColor: `${Colors.ink}40`,
  },
  optionCorrect: {
    backgroundColor: Colors.green,
  },
  optionLetter: {
    width: 18,
    fontFamily: FontFamily.bodyBold,
    fontSize: 12,
    color: Colors.ink,
  },
  optionCopy: {
    flex: 1,
  },
  updatedRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  explanation: {
    flex: 1,
  },
  rowActions: {
    flexDirection: 'row',
    gap: 8,
  },
  checkAgainButton: {
    flex: 1,
    height: 48,
    borderRadius: 999,
    backgroundColor: Colors.ink,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  unflagButton: {
    height: 48,
    paddingHorizontal: 18,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: `${Colors.ink}26`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButton: {
    height: 48,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: `${Colors.ink}26`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  regenerateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 44,
  },
});
