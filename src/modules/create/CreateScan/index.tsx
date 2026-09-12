import React, { useState } from 'react'
import { Alert, Image, PermissionsAndroid, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import Screen from '../../../components/ui/Screen'
import PillButton from '../../../components/ui/PillButton'
import { Colors } from '../../../theme/colors'
import { Typography } from '../../../theme/typography'
import { moderateScale } from '../../../utils/responsive'
import { ArrowRightIcon, CheckIcon, CloseIcon, PdfIcon } from '../../../components/icons'
import { CreateStackNavigationType, QuizSource } from '../../../utils/types'
import { detectTopic } from '../../../data/questionBank'
import { useT } from '../../../i18n'

type Nav = NativeStackNavigationProp<CreateStackNavigationType, 'CreateScan'>;

const Corner = ({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) => {
  const style: any = {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: Colors.coral,
    ...(position === 'tl' && { top: 20, left: 20, borderTopWidth: 4, borderLeftWidth: 4 }),
    ...(position === 'tr' && { top: 20, right: 20, borderTopWidth: 4, borderRightWidth: 4 }),
    ...(position === 'bl' && { bottom: 20, left: 20, borderBottomWidth: 4, borderLeftWidth: 4 }),
    ...(position === 'br' && { bottom: 20, right: 20, borderBottomWidth: 4, borderRightWidth: 4 }),
  };
  return <View style={style} />;
};

const requestCameraAccess = async () => {
  if (Platform.OS !== 'android') return true;
  const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
    title: 'Camera access',
    message: 'Quizkr needs the camera to scan your notes.',
    buttonPositive: 'Allow',
    buttonNegative: 'Not now',
  });
  return granted === PermissionsAndroid.RESULTS.GRANTED;
};

const CreateScanScreen = () => {
  const navigation = useNavigation<Nav>();
  const [pages, setPages] = useState<string[]>([]);
  const t = useT();
  const pagesLabel = pages.length === 1 ? t('pageOne') : t('pageMany', { count: pages.length });

  const addPages = (uris: string[]) => setPages(previous => [...previous, ...uris]);

  const capture = async () => {
    const allowed = await requestCameraAccess();
    if (!allowed) {
      Alert.alert(t('cameraOffTitle'), t('cameraOffBody'));
      return;
    }
    const result = await launchCamera({ mediaType: 'photo', quality: 0.8, saveToPhotos: false });
    if (result.didCancel) return;
    if (result.errorCode) {
      Alert.alert(t('cameraUnavailable'), result.errorMessage ?? t('cameraFallback'));
      return;
    }
    const uris = (result.assets ?? []).map(asset => asset.uri).filter((uri): uri is string => !!uri);
    addPages(uris);
  };

  const pickFromPhotos = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo', selectionLimit: 0, quality: 0.8 });
    if (result.didCancel) return;
    const uris = (result.assets ?? []).map(asset => asset.uri).filter((uri): uri is string => !!uri);
    addPages(uris);
  };

  const removeLast = () => setPages(previous => previous.slice(0, -1));

  const usePages = () => {
    if (!pages.length) return;
    const source: QuizSource = {
      kind: 'scan',
      title: pages.length === 1 ? t('scannedPage') : t('scannedPages', { count: pages.length }),
      detail: t('photoDetail', { pages: pagesLabel }),
      topicId: detectTopic('').id,
      imageUris: pages,
    };
    navigation.navigate('QuizSetup', { source });
  };

  const latest = pages[pages.length - 1];

  return (
    <Screen background={Colors.ink} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.ink} />
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <CloseIcon size={20} color={Colors.surface} />
        </TouchableOpacity>
        <Text style={[Typography.h2, styles.surface]}>{t('scanPage')}</Text>
        <View style={styles.iconButton} />
      </View>

      <View style={styles.viewfinder}>
        {latest ? (
          <Image source={{ uri: latest }} style={styles.capturedPage} resizeMode="cover" />
        ) : (
          <View style={styles.emptyHint}>
            <PdfIcon size={40} color={`${Colors.surface}80`} />
            <Text style={[Typography.body, styles.surfaceMuted, styles.emptyText]}>
              {t('scanHint')}
            </Text>
          </View>
        )}
        <Corner position="tl" />
        <Corner position="tr" />
        <Corner position="bl" />
        <Corner position="br" />
        <View style={styles.statusPill}>
          <Text style={[Typography.caption, styles.surface]}>
            {pages.length ? t('scanCaptured', { count: pages.length }) : t('scanReady')}
          </Text>
        </View>
      </View>

      <View style={styles.controls}>
        <View style={styles.thumbRow}>
          {pages.length ? (
            <>
              <View style={styles.thumbGroup}>
                {pages.slice(-2).map(uri => (
                  <View key={uri} style={styles.thumb}>
                    <Image source={{ uri }} style={styles.thumbImage} resizeMode="cover" />
                    <View style={styles.thumbCheck}>
                      <CheckIcon size={10} />
                    </View>
                  </View>
                ))}
                <View>
                  <Text style={[Typography.bodyMedium, styles.surface]}>
                    {pagesLabel}
                  </Text>
                  <Text style={[Typography.caption, styles.surfaceMuted]}>{t('readyToRead')}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={removeLast}>
                <Text style={[Typography.button, styles.surfaceMuted]}>{t('retake')}</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={[Typography.caption, styles.surfaceMuted]}>{t('noPagesYet')}</Text>
          )}
        </View>

        <View style={styles.shutterRow}>
          <TouchableOpacity style={styles.sideButton} onPress={pickFromPhotos}>
            <Text style={[Typography.caption, styles.surfaceMuted]}>{t('photos')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shutterOuter} onPress={capture} activeOpacity={0.8}>
            <View style={styles.shutterInner} />
          </TouchableOpacity>
          <View style={styles.sideButton} />
        </View>

        <PillButton
          label={pages.length ? t('usePages', { pages: pagesLabel }) : t('captureFirst')}
          icon={<ArrowRightIcon size={18} />}
          disabled={!pages.length}
          onPress={usePages}
        />
      </View>
    </Screen>
  )
}

export default CreateScanScreen;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(8),
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: `${Colors.surface}1F`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  surface: { color: Colors.surface },
  surfaceMuted: { color: Colors.surface, opacity: 0.65 },
  viewfinder: {
    flex: 1,
    margin: moderateScale(20),
    borderRadius: 12,
    backgroundColor: '#2B2A31',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  capturedPage: {
    ...StyleSheet.absoluteFillObject,
  },
  emptyHint: {
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 40,
  },
  emptyText: {
    textAlign: 'center',
  },
  statusPill: {
    position: 'absolute',
    bottom: 20,
    height: 32,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: `${Colors.ink}B3`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controls: {
    paddingHorizontal: moderateScale(20),
    paddingBottom: moderateScale(28),
    gap: moderateScale(20),
  },
  thumbRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 56,
  },
  thumbGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  thumb: {
    width: 44,
    height: 56,
    borderRadius: 8,
    backgroundColor: '#F4F1EA',
    borderWidth: 2,
    borderColor: `${Colors.surface}4D`,
    overflow: 'visible',
  },
  thumbImage: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  thumbCheck: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  sideButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterOuter: {
    width: 78,
    height: 78,
    borderRadius: 39,
    borderWidth: 4,
    borderColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterInner: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: Colors.surface,
  },
});
