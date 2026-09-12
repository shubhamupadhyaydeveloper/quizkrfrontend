import React, { useEffect, useMemo, useRef, useState } from 'react'
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'
import Svg, { Circle } from 'react-native-svg'
import Screen from '../../../components/ui/Screen'
import Card from '../../../components/ui/Card'
import { Colors } from '../../../theme/colors'
import { Typography } from '../../../theme/typography'
import { moderateScale } from '../../../utils/responsive'
import { CheckIcon, ClockIcon } from '../../../components/icons'
import { WritingIllustration } from '../../../components/illustrations'
import { CreateStackNavigationType } from '../../../utils/types'
import { buildQuiz } from '../../../data/questionBank'
import { useAppStore } from '../../../store/AppStore'
import { useT } from '../../../i18n'

type Nav = NativeStackNavigationProp<CreateStackNavigationType, 'Generating'>;

const STEP_MS = 950;

const GeneratingScreen = () => {
  const navigation = useNavigation<Nav>();
  const { source, settings } = useRoute<RouteProp<CreateStackNavigationType, 'Generating'>>().params;
  const { spendCredit, credits, plan } = useAppStore();
  const t = useT();

  const [activeStep, setActiveStep] = useState(0);
  const spin = useSharedValue(0);
  const float = useSharedValue(0);
  // The quiz is built once up front; the steps below just pace the reveal.
  const [quiz] = useState(() => buildQuiz(source, settings));
  // Spending the credit updates the store, which would otherwise restart the
  // effect below and charge a second time.
  const handedOver = useRef(false);

  const steps = useMemo(() => {
    const pageCount = source.imageUris?.length ?? 1;
    const readingStep =
      source.kind === 'pdf'
        ? t('readingFile', { name: source.title })
        : source.kind === 'scan'
          ? t('readingPages', { pages: pageCount === 1 ? t('pageOne') : t('pageMany', { count: pageCount }) })
          : t('readingNotes');
    return [
      readingStep,
      t('findingIdeas'),
      t('writingQuestions', { count: quiz.questions.length }),
      t('checkingAnswers'),
    ];
  }, [source, quiz.questions.length, t]);

  useEffect(() => {
    spin.value = withRepeat(withTiming(1, { duration: 2400, easing: Easing.linear }), -1);
    float.value = withRepeat(
      withTiming(1, { duration: 1400, easing: Easing.inOut(Easing.quad) }),
      -1,
      true,
    );
  }, []);

  useEffect(() => {
    if (handedOver.current) return;

    const advance = setInterval(() => {
      setActiveStep(step => Math.min(step + 1, steps.length - 1));
    }, STEP_MS);

    const done = setTimeout(() => {
      handedOver.current = true;
      spendCredit();
      navigation.replace('QuizTaking', { quiz });
    }, STEP_MS * steps.length + 400);

    return () => {
      clearInterval(advance);
      clearTimeout(done);
    };
  }, [navigation, quiz, steps.length, spendCredit]);

  const spinStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spin.value * 360}deg` }],
  }));
  const floatStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -6 * Math.sin(float.value * Math.PI) }],
  }));

  return (
    <Screen background={Colors.bg}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.bg} />
      <View style={styles.container}>
        <View style={styles.topRow}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
            <Text style={[Typography.button, styles.ink]}>{t('cancel')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.middle}>
          <View style={styles.ringWrap}>
            <View style={styles.ringBg} />
            <Animated.View style={[StyleSheet.absoluteFill, spinStyle]}>
              <Svg width={180} height={180} viewBox="0 0 180 180">
                <Circle
                  cx={90}
                  cy={90}
                  r={84}
                  stroke={Colors.ink}
                  strokeWidth={4}
                  strokeLinecap="round"
                  strokeDasharray="120 408"
                  fill="none"
                />
              </Svg>
            </Animated.View>
            <Animated.View style={floatStyle}>
              <WritingIllustration width={120} height={111} />
            </Animated.View>
          </View>

          <View style={styles.copy}>
            <Text style={[Typography.h1, styles.ink]}>{t('writingQuiz')}</Text>
            <Text style={[Typography.body, styles.muted]}>{t('underMinute')}</Text>
          </View>

          <Card style={styles.stepsCard} padding={0}>
            {steps.map((step, index) => (
              <View key={step}>
                <View style={styles.stepRow}>
                  {index < activeStep ? (
                    <View style={styles.stepDone}>
                      <CheckIcon size={12} />
                    </View>
                  ) : index === activeStep ? (
                    <View style={styles.stepSpinner} />
                  ) : (
                    <View style={styles.stepPending} />
                  )}
                  <Text
                    style={[
                      index === activeStep ? Typography.bodyMedium : Typography.body,
                      index > activeStep ? styles.muted : styles.ink,
                      styles.stepLabel,
                    ]}
                    numberOfLines={1}
                  >
                    {step}
                  </Text>
                </View>
                {index < steps.length - 1 && <View style={styles.stepDivider} />}
              </View>
            ))}
          </Card>
        </View>

        <View style={styles.footerHint}>
          <ClockIcon size={16} color={Colors.muted} />
          <Text style={[Typography.caption, styles.muted]}>
            {plan === 'pro' ? t('proUnlimited') : t('creditWhenReady', { count: credits })}
          </Text>
        </View>
      </View>
    </Screen>
  )
}

export default GeneratingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(28),
    paddingTop: moderateScale(16),
    paddingBottom: moderateScale(28),
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ink: { color: Colors.ink },
  muted: { color: Colors.muted },
  middle: {
    alignItems: 'center',
    gap: moderateScale(26),
  },
  ringWrap: {
    width: 180,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringBg: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 90,
    borderWidth: 3,
    borderColor: Colors.badgeBorder,
  },
  copy: {
    alignItems: 'center',
    gap: 6,
  },
  stepsCard: {
    width: '100%',
    overflow: 'hidden',
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 18,
    height: 50,
  },
  stepLabel: {
    flex: 1,
  },
  stepDone: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepSpinner: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2.5,
    borderColor: Colors.ink,
    borderRightColor: 'transparent',
  },
  stepPending: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2.5,
    borderColor: `${Colors.ink}26`,
  },
  stepDivider: {
    height: 1,
    backgroundColor: `${Colors.ink}14`,
    marginHorizontal: 18,
  },
  footerHint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
});
