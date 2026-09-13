import React, { useState } from 'react'
import { Alert, FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Screen from '../../components/ui/Screen'
import Card from '../../components/ui/Card'
import { Colors } from '../../theme/colors'
import { Typography } from '../../theme/typography'
import { moderateScale } from '../../utils/responsive'
import { CameraIcon, PasteTextIcon, PdfIcon, TrashIcon } from '../../components/icons'
import { BottomTabNavigationType, SavedQuiz } from '../../utils/types'
import { useAppStore } from '../../store/AppStore'
import { useT } from '../../i18n'

type Nav = NativeStackNavigationProp<BottomTabNavigationType, 'Saved'>;

const SOURCE_ICONS = {
  scan: CameraIcon,
  pdf: PdfIcon,
  text: PasteTextIcon,
};

const SavedScreen = () => {
  const navigation = useNavigation<Nav>();
  const { toAttemptQuizzes, completedQuizzes, removeQuiz } = useAppStore();
  const [tab, setTab] = useState<'toAttempt' | 'completed'>('toAttempt');
  const t = useT();

  const visible = tab === 'toAttempt' ? toAttemptQuizzes : completedQuizzes;

  const openQuiz = (entry: SavedQuiz) => {
    navigation.navigate('Create', {
      screen: 'QuizTaking',
      params: { quiz: entry.quiz },
    } as any);
  };

  const confirmDelete = (entry: SavedQuiz) => {
    Alert.alert(t('deleteQuizTitle'), entry.quiz.title, [
      { text: t('cancel'), style: 'cancel' },
      { text: t('delete'), style: 'destructive', onPress: () => removeQuiz(entry.quiz.id) },
    ]);
  };

  return (
    <Screen background={Colors.bg}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={visible}
        keyExtractor={item => item.quiz.id}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Text style={[Typography.h1, styles.ink]}>{t('saved')}</Text>
              <Text style={[Typography.body, styles.muted]}>{t('savedBody')}</Text>
            </View>
            <View style={styles.segmented}>
              {(['toAttempt', 'completed'] as const).map(key => (
                <TouchableOpacity
                  key={key}
                  style={[styles.segment, tab === key && styles.segmentActive]}
                  onPress={() => setTab(key)}
                >
                  <Text style={[Typography.bodyMedium, tab === key ? styles.surface : styles.muted]}>
                    {key === 'toAttempt' ? t('toAttempt') : t('completed')}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        }
        renderItem={({ item }) => {
          const Icon = SOURCE_ICONS[item.quiz.source.kind];
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
                    {t(item.quiz.settings.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard')}
                    {item.status === 'completed' ? t('scoredPct', { score: item.scorePercent ?? 0 }) : ''}
                  </Text>
                </View>
                <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDelete(item)}>
                  <TrashIcon size={16} color={Colors.red} />
                </TouchableOpacity>
              </Card>
            </TouchableOpacity>
          );
        }}
        ItemSeparatorComponent={() => <View style={{ height: moderateScale(10) }} />}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={[Typography.body, styles.muted, styles.center]}>
              {tab === 'toAttempt'
                ? t('emptyToAttempt')
                : t('emptyCompleted')}
            </Text>
          </View>
        }
      />
    </Screen>
  )
}

export default SavedScreen;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(16),
    paddingBottom: moderateScale(130),
  },
  header: {
    gap: 4,
    marginBottom: moderateScale(24),
  },
  ink: { color: Colors.ink },
  muted: { color: Colors.muted },
  surface: { color: Colors.surface },
  center: { textAlign: 'center' },
  segmented: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 999,
    padding: 5,
    gap: 4,
    marginBottom: moderateScale(24),
  },
  segment: {
    flex: 1,
    height: 42,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentActive: {
    backgroundColor: Colors.ink,
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
  deleteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: `${Colors.red}59`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyState: {
    paddingTop: moderateScale(40),
    paddingHorizontal: moderateScale(20),
    alignItems: 'center',
  },
});
