import React from 'react'
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Screen from '../../../components/ui/Screen'
import Card from '../../../components/ui/Card'
import { Colors } from '../../../theme/colors'
import { Typography } from '../../../theme/typography'
import { moderateScale } from '../../../utils/responsive'
import { CheckIcon, ChevronLeftIcon } from '../../../components/icons'
import { useAppStore } from '../../../store/AppStore'
import { LANGUAGES, useT } from '../../../i18n'

const LanguageScreen = () => {
  const navigation = useNavigation();
  const t = useT();
  const { language, setLanguage } = useAppStore();

  return (
    <Screen background={Colors.bg}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size={20} />
          </TouchableOpacity>
          <Text style={[Typography.h2, styles.ink]}>{t('language')}</Text>
          <View style={styles.iconButton} />
        </View>

        <View style={styles.copy}>
          <Text style={[Typography.h1, styles.ink]}>{t('chooseLanguage')}</Text>
          <Text style={[Typography.body, styles.muted]}>{t('chooseLanguageBody')}</Text>
        </View>

        <Card padding={0} style={styles.list}>
          {LANGUAGES.map((item, index) => {
            const active = item.code === language;
            return (
              <View key={item.code}>
                <TouchableOpacity style={styles.row} onPress={() => setLanguage(item.code)}>
                  <View style={styles.rowCopy}>
                    <Text style={[Typography.bodyMedium, styles.ink]}>{item.native}</Text>
                    <Text style={[Typography.caption, styles.muted]}>{item.english}</Text>
                  </View>
                  <View style={[styles.radio, active && styles.radioActive]}>
                    {active && <CheckIcon size={14} />}
                  </View>
                </TouchableOpacity>
                {index < LANGUAGES.length - 1 && <View style={styles.divider} />}
              </View>
            );
          })}
        </Card>

        <Text style={[Typography.caption, styles.muted, styles.note]}>{t('languageNote')}</Text>
      </View>
    </Screen>
  )
}

export default LanguageScreen;

const styles = StyleSheet.create({
  content: {
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
  copy: { gap: 6 },
  list: { overflow: 'hidden' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 18,
    paddingVertical: 16,
    minHeight: 64,
  },
  rowCopy: { flex: 1, gap: 3 },
  radio: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: `${Colors.ink}33`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: {
    backgroundColor: Colors.ink,
    borderColor: Colors.ink,
  },
  divider: {
    height: 1,
    backgroundColor: `${Colors.ink}14`,
    marginHorizontal: 18,
  },
  note: {
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
