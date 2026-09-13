import React, { useMemo, useState } from 'react'
import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Screen from '../../../components/ui/Screen'
import Card from '../../../components/ui/Card'
import PillButton from '../../../components/ui/PillButton'
import { Colors } from '../../../theme/colors'
import { Typography } from '../../../theme/typography'
import { moderateScale } from '../../../utils/responsive'
import { ArrowRightIcon, CheckIcon, ChevronLeftIcon } from '../../../components/icons'
import { CreateStackNavigationType, QuizSource } from '../../../utils/types'
import { detectTopic } from '../../../data/questionBank'
import { useT } from '../../../i18n'

type Nav = NativeStackNavigationProp<CreateStackNavigationType, 'CreatePasteText'>;

const CreatePasteTextScreen = () => {
  const navigation = useNavigation<Nav>();
  const [text, setText] = useState('');
  const t = useT();

  const wordCount = useMemo(
    () => (text.trim().length ? text.trim().split(/\s+/).length : 0),
    [text],
  );
  const estimatedQuestions = Math.max(1, Math.min(20, Math.round(wordCount / 30)));

  const continueWithText = () => {
    const source: QuizSource = {
      kind: 'text',
      title: t('pastedNotes'),
      detail: t('textDetail', { count: wordCount }),
      topicId: detectTopic(text).id,
      text,
    };
    navigation.navigate('QuizSetup', { source });
  };

  return (
    <Screen background={Colors.bg}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size={20} />
          </TouchableOpacity>
          <Text style={[Typography.h2, styles.ink]}>{t('pasteText')}</Text>
          <TouchableOpacity style={styles.clearButton} onPress={() => setText('')}>
            <Text style={[Typography.button, styles.ink]}>{t('clear')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.copy}>
          <Text style={[Typography.h1, styles.ink]}>{t('dropNotes')}</Text>
          <Text style={[Typography.body, styles.muted]}>
            {t('dropNotesBody')}
          </Text>
        </View>

        <Card style={styles.editorCard} radius={24}>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder={t('pastePlaceholder')}
            placeholderTextColor={Colors.muted}
            multiline
            style={styles.input}
            textAlignVertical="top"
          />
          <View style={styles.editorFooter}>
            <Text style={[Typography.caption, styles.muted]}>{t('wordsCount', { count: wordCount })}</Text>
            {wordCount > 0 && (
              <View style={styles.hint}>
                <CheckIcon size={14} color={Colors.green} />
                <Text style={[Typography.caption, styles.green]}>
                  {t('enoughFor', { count: estimatedQuestions })}
                </Text>
              </View>
            )}
          </View>
        </Card>
      </View>

      <View style={styles.footer}>
        <PillButton
          label={t('continue')}
          icon={<ArrowRightIcon size={20} />}
          disabled={wordCount === 0}
          onPress={continueWithText}
        />
      </View>
    </Screen>
  )
}

export default CreatePasteTextScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(16),
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
  clearButton: {
    height: 36,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ink: { color: Colors.ink },
  muted: { color: Colors.muted },
  green: { color: Colors.green, fontWeight: '700' },
  copy: {
    gap: 6,
  },
  editorCard: {
    flex: 1,
    borderWidth: 2,
    borderColor: Colors.ink,
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: moderateScale(15),
    fontFamily: 'Inter_18pt-Regular',
    color: Colors.ink,
    lineHeight: moderateScale(22),
  },
  editorFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: `${Colors.ink}14`,
  },
  hint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footer: {
    paddingHorizontal: moderateScale(20),
    paddingBottom: moderateScale(28),
    paddingTop: moderateScale(12),
  },
});
