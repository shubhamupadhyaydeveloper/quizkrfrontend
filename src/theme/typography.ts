import { TextStyle } from 'react-native';
import { moderateScale } from '../utils/responsive';

// Two families only: Fraunces for headline-scale text, Inter for every
// other role (section titles, numbers, body) — one sans, like the reference apps.
export const FontFamily = {
  serifBold: 'Fraunces24pt-Bold',
  serifItalic: 'Fraunces24pt-Italic',
  body: 'Inter_18pt-Regular',
  bodyMedium: 'Inter_18pt-SemiBold',
  bodyBold: 'Inter_18pt-Bold',
} as const;

type NamedStyle = TextStyle & { fontFamily: string };

export const Typography: Record<
  'display' | 'h1' | 'h2' | 'body' | 'bodyMedium' | 'caption' | 'button' | 'accentItalic',
  NamedStyle
> = {
  display: {
    fontFamily: FontFamily.serifBold,
    fontSize: moderateScale(36),
    lineHeight: moderateScale(40),
    letterSpacing: -0.5,
  },
  h1: {
    fontFamily: FontFamily.serifBold,
    fontSize: moderateScale(27),
    lineHeight: moderateScale(31),
    letterSpacing: -0.3,
  },
  h2: {
    fontFamily: FontFamily.bodyBold,
    fontSize: moderateScale(18),
    lineHeight: moderateScale(22),
    letterSpacing: -0.3,
  },
  body: {
    fontFamily: FontFamily.body,
    fontSize: moderateScale(15),
    lineHeight: moderateScale(21),
  },
  bodyMedium: {
    fontFamily: FontFamily.bodyMedium,
    fontSize: moderateScale(15),
    lineHeight: moderateScale(21),
  },
  caption: {
    fontFamily: FontFamily.bodyMedium,
    fontSize: moderateScale(12.5),
    lineHeight: moderateScale(17),
  },
  button: {
    fontFamily: FontFamily.bodyBold,
    fontSize: moderateScale(15.5),
    lineHeight: moderateScale(19),
  },
  accentItalic: {
    fontFamily: FontFamily.serifItalic,
    fontSize: moderateScale(17),
    lineHeight: moderateScale(23),
  },
};
