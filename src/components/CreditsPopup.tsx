import React from 'react';
import { Modal, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientMesh from './ui/GradientMesh';
import PillButton from './ui/PillButton';
import { CreditsIllustration } from './illustrations';
import { CloseIcon } from './icons';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { moderateScale } from '../utils/responsive';
import { useT } from '../i18n';

type CreditsPopupProps = {
  visible: boolean;
  credits: number;
  onClose: () => void;
  onSeePlans: () => void;
};

const CreditsPopup = ({ visible, credits, onClose, onSeePlans }: CreditsPopupProps) => {
  const t = useT();

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="fullScreen" onRequestClose={onClose}>
      <View style={styles.root}>
        <GradientMesh intensity={0.7} />
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.safe}>
          <View style={styles.topRow}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <CloseIcon size={20} color={Colors.ink} />
            </TouchableOpacity>
          </View>

          <View style={styles.middle}>
            <CreditsIllustration />
            <View style={styles.copy}>
              <Text style={[Typography.display, styles.title]}>{t('popupTitle', { count: credits })}</Text>
              <Text style={[Typography.body, styles.body]}>{t('popupBody')}</Text>
            </View>
          </View>

          <View style={styles.footer}>
            <PillButton label={t('seePlans')} onPress={onSeePlans} />
            <TouchableOpacity style={styles.laterButton} onPress={onClose}>
              <Text style={[Typography.bodyMedium, styles.ink]}>{t('maybeLater')}</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

export default CreditsPopup;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  safe: {
    flex: 1,
    paddingHorizontal: moderateScale(28),
    paddingBottom: moderateScale(16),
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: moderateScale(8),
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  middle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(28),
    paddingBottom: moderateScale(40),
  },
  copy: {
    alignItems: 'center',
    gap: 12,
  },
  title: {
    color: Colors.ink,
    textAlign: 'center',
    fontSize: moderateScale(32),
    lineHeight: moderateScale(36),
  },
  body: {
    color: Colors.ink,
    opacity: 0.7,
    textAlign: 'center',
    maxWidth: 300,
  },
  ink: { color: Colors.ink },
  footer: {
    gap: 6,
  },
  laterButton: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
