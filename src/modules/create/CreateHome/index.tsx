import React, { useState } from 'react'
import { ActivityIndicator, Alert, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { errorCodes, isErrorWithCode, pick, types } from '@react-native-documents/picker'
import Screen from '../../../components/ui/Screen'
import Card from '../../../components/ui/Card'
import PillButton from '../../../components/ui/PillButton'
import { Colors } from '../../../theme/colors'
import { Typography } from '../../../theme/typography'
import { moderateScale } from '../../../utils/responsive'
import { ArrowRightIcon, CameraIcon, CheckIcon, ChevronLeftIcon, ChevronRightIcon, CloseIcon, PasteTextIcon, PdfIcon } from '../../../components/icons'
import { CreateStackNavigationType, QuizSource } from '../../../utils/types'
import { detectTopic } from '../../../data/questionBank'
import { useT } from '../../../i18n'

type Nav = NativeStackNavigationProp<CreateStackNavigationType, 'CreateHome'>;

type PickedPdf = { name: string; size: number | null; uri: string };

const formatSize = (bytes: number | null) => {
  if (!bytes) return 'PDF';
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const CreateHomeScreen = () => {
  const navigation = useNavigation<Nav>();
  const [pdf, setPdf] = useState<PickedPdf | null>(null);
  const [picking, setPicking] = useState(false);
  const t = useT();

  const pickPdf = async () => {
    if (picking) return;
    setPicking(true);
    try {
      const [file] = await pick({ type: [types.pdf] });
      setPdf({ name: file.name ?? 'document.pdf', size: file.size, uri: file.uri });
    } catch (error) {
      if (isErrorWithCode(error) && error.code === errorCodes.OPERATION_CANCELED) return;
      Alert.alert(t('pdfErrorTitle'), t('pdfErrorBody'));
    } finally {
      setPicking(false);
    }
  };

  const continueWithPdf = () => {
    if (!pdf) return;
    const source: QuizSource = {
      kind: 'pdf',
      title: pdf.name,
      detail: `${formatSize(pdf.size)} · PDF`,
      topicId: detectTopic(pdf.name).id,
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
          <Text style={[Typography.h2, styles.ink]}>{t('newQuiz')}</Text>
          <View style={styles.iconButton} />
        </View>

        <View style={styles.copy}>
          <Text style={[Typography.h1, styles.ink]}>{t('whereNotes')}</Text>
          <Text style={[Typography.body, styles.muted]}>{t('pickSource')}</Text>
        </View>

        <View style={styles.options}>
          <TouchableOpacity onPress={() => navigation.navigate('CreateScan')} activeOpacity={0.85}>
            <Card style={styles.optionRow}>
              <View style={styles.optionIconSlot}>
                <CameraIcon size={24} color={Colors.ink} />
              </View>
              <View style={styles.optionCopy}>
                <Text style={[Typography.bodyMedium, styles.ink]}>{t('scanPage')}</Text>
                <Text style={[Typography.caption, styles.muted]}>
                  {t('scanPageBody')}
                </Text>
              </View>
              <ChevronRightIcon size={18} color={`${Colors.ink}66`} />
            </Card>
          </TouchableOpacity>

          <TouchableOpacity onPress={pickPdf} activeOpacity={0.85} disabled={picking}>
            <Card style={pdf ? styles.pdfCard : styles.optionRow} radius={22}>
              {pdf ? (
                <>
                  <View style={styles.optionRow}>
                    <View style={[styles.optionIconSlot, styles.optionIconSlotActive]}>
                      <PdfIcon size={24} color={Colors.surface} />
                    </View>
                    <View style={styles.optionCopy}>
                      <Text style={[Typography.bodyMedium, styles.ink]}>{t('uploadPdf')}</Text>
                      <Text style={[Typography.caption, styles.muted]}>{t('pdfChange')}</Text>
                    </View>
                    <CheckIcon size={22} color={Colors.green} />
                  </View>
                  <View style={styles.pdfPreview}>
                    <View style={styles.pdfThumb}>
                      <View style={styles.pdfLine} />
                      <View style={[styles.pdfLine, styles.pdfLineDim]} />
                      <View style={[styles.pdfLine, styles.pdfLineDim]} />
                      <View style={[styles.pdfLine, styles.pdfLineDim, styles.pdfLineShort]} />
                    </View>
                    <View style={styles.pdfMeta}>
                      <Text style={[Typography.bodyMedium, styles.ink]} numberOfLines={1}>
                        {pdf.name}
                      </Text>
                      <Text style={[Typography.caption, styles.muted]}>{formatSize(pdf.size)} · PDF</Text>
                    </View>
                    <TouchableOpacity onPress={() => setPdf(null)} style={styles.pdfRemove}>
                      <CloseIcon size={16} color={Colors.muted} />
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.optionIconSlot}>
                    {picking ? (
                      <ActivityIndicator color={Colors.ink} />
                    ) : (
                      <PdfIcon size={24} color={Colors.ink} />
                    )}
                  </View>
                  <View style={styles.optionCopy}>
                    <Text style={[Typography.bodyMedium, styles.ink]}>{t('uploadPdf')}</Text>
                    <Text style={[Typography.caption, styles.muted]}>{t('uploadPdfBody')}</Text>
                  </View>
                  <ChevronRightIcon size={18} color={`${Colors.ink}66`} />
                </>
              )}
            </Card>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('CreatePasteText')} activeOpacity={0.85}>
            <Card style={styles.optionRow}>
              <View style={styles.optionIconSlot}>
                <PasteTextIcon size={24} color={Colors.ink} />
              </View>
              <View style={styles.optionCopy}>
                <Text style={[Typography.bodyMedium, styles.ink]}>{t('pasteText')}</Text>
                <Text style={[Typography.caption, styles.muted]}>{t('pasteTextBody')}</Text>
              </View>
              <ChevronRightIcon size={18} color={`${Colors.ink}66`} />
            </Card>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <PillButton
          label={t('continue')}
          icon={<ArrowRightIcon size={20} />}
          disabled={!pdf}
          onPress={continueWithPdf}
        />
      </View>
    </Screen>
  )
}

export default CreateHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(16),
    gap: moderateScale(22),
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
  copy: {
    gap: 6,
  },
  options: {
    gap: moderateScale(10),
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(14),
  },
  optionIconSlot: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.badgeBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionIconSlotActive: {
    backgroundColor: Colors.ink,
    borderColor: Colors.ink,
  },
  optionCopy: {
    flex: 1,
    gap: 3,
  },
  pdfCard: {
    borderWidth: 2,
    borderColor: Colors.ink,
    gap: moderateScale(14),
  },
  pdfPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.bg,
    borderRadius: 16,
    padding: 12,
  },
  pdfThumb: {
    width: 40,
    height: 48,
    borderRadius: 8,
    backgroundColor: Colors.surface,
    padding: 8,
    justifyContent: 'space-between',
  },
  pdfLine: {
    height: 3,
    borderRadius: 2,
    backgroundColor: Colors.ink,
  },
  pdfLineDim: {
    opacity: 0.25,
  },
  pdfLineShort: {
    width: '60%',
  },
  pdfMeta: {
    flex: 1,
    gap: 4,
    minWidth: 0,
  },
  pdfRemove: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    paddingHorizontal: moderateScale(20),
    paddingBottom: moderateScale(28),
    paddingTop: moderateScale(12),
  },
});
