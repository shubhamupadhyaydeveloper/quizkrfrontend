import React from 'react';
import Svg, { Path, Circle, Rect, G } from 'react-native-svg';
import { Colors } from '../../theme/colors';

export type IconProps = {
  size?: number;
  color?: string;
  strokeWidth?: number;
};

const base = (size: number) => ({ width: size, height: size, viewBox: '0 0 24 24' });

export const ChevronLeftIcon = ({ size = 20, color = Colors.ink, strokeWidth = 2.2 }: IconProps) => (
  <Svg {...base(size)} fill="none">
    <Path d="M15 6l-6 6 6 6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const ChevronRightIcon = ({ size = 18, color = Colors.ink, strokeWidth = 2.2 }: IconProps) => (
  <Svg {...base(size)} fill="none">
    <Path d="M9 6l6 6-6 6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const ArrowRightIcon = ({ size = 20, color = Colors.surface, strokeWidth = 2.4 }: IconProps) => (
  <Svg {...base(size)} fill="none">
    <Path d="M5 12h14" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M13 6l6 6-6 6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const CloseIcon = ({ size = 20, color = Colors.ink, strokeWidth = 2.2 }: IconProps) => (
  <Svg {...base(size)} fill="none">
    <Path d="M6 6l12 12M18 6L6 18" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const CameraIcon = ({ size = 24, color = Colors.ink, strokeWidth = 1.8 }: IconProps) => (
  <Svg {...base(size)} fill="none">
    <Path
      d="M4 8.5A2.5 2.5 0 016.5 6H8l1.5-2h5L16 6h1.5A2.5 2.5 0 0120 8.5v8a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 014 16.5v-8z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx={12} cy={12.5} r={3.2} stroke={color} strokeWidth={strokeWidth} />
  </Svg>
);

export const PdfIcon = ({ size = 24, color = Colors.ink, strokeWidth = 1.8 }: IconProps) => (
  <Svg {...base(size)} fill="none">
    <Path d="M7 3h7l5 5v11a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M14 3v5h5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M9 13h6M9 17h4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const PasteTextIcon = ({ size = 24, color = Colors.ink, strokeWidth = 1.8 }: IconProps) => (
  <Svg {...base(size)} fill="none">
    <Path d="M5 7h14M5 12h9M5 17h11" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M19 15v6M16 18h6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const ClockIcon = ({ size = 16, color = Colors.coral, strokeWidth = 2.4 }: IconProps) => (
  <Svg {...base(size)} fill="none">
    <Circle cx={12} cy={12} r={8.5} stroke={color} strokeWidth={strokeWidth} />
    <Path d="M12 7.5V12l3 2" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const FlagIcon = ({ size = 16, color = Colors.muted, strokeWidth = 2.2 }: IconProps) => (
  <Svg {...base(size)} fill="none">
    <Path d="M6 4v16" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <Path d="M6 5h9l-2 3.5L15 12H6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const CheckCircleIcon = ({ size = 22, color = Colors.surface, strokeWidth = 2.6 }: IconProps) => (
  <Svg {...base(size)} fill="none">
    <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={strokeWidth} />
    <Path d="M8 12.5l2.8 2.8L16.5 9.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const CheckIcon = ({ size = 14, color = Colors.surface, strokeWidth = 3 }: IconProps) => (
  <Svg {...base(size)} fill="none">
    <Path d="M5 12.5l4.5 4.5L19 7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const XCircleIcon = ({ size = 22, color = Colors.red, strokeWidth = 2.6 }: IconProps) => (
  <Svg {...base(size)} fill="none">
    <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={strokeWidth} />
    <Path d="M9 9l6 6M15 9l-6 6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const HomeIcon = ({ size = 22, color = Colors.muted, strokeWidth = 2 }: IconProps) => (
  <Svg {...base(size)} fill="none">
    <Path d="M4 11l8-6 8 6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M6 10v9h12v-9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const CreateIcon = ({ size = 22, color = Colors.muted, strokeWidth = 2 }: IconProps) => (
  <Svg {...base(size)} fill="none">
    <Rect x={3.5} y={3.5} width={17} height={17} rx={5} stroke={color} strokeWidth={strokeWidth} />
    <Path d="M12 8v8M8 12h8" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const BookmarkIcon = ({ size = 22, color = Colors.muted, strokeWidth = 2 }: IconProps) => (
  <Svg {...base(size)} fill="none">
    <Path d="M7 4h10v16l-5-4-5 4V4z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const BookmarkFilledIcon = ({ size = 22, color = Colors.ink }: IconProps) => (
  <Svg {...base(size)} fill={color}>
    <Path d="M7 4h10v16l-5-4-5 4V4z" />
  </Svg>
);

export const UserIcon = ({ size = 22, color = Colors.muted, strokeWidth = 2 }: IconProps) => (
  <Svg {...base(size)} fill="none">
    <Circle cx={12} cy={8} r={3.5} stroke={color} strokeWidth={strokeWidth} />
    <Path d="M5 20c1-4 4-6 7-6s6 2 7 6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const BellIcon = ({ size = 22, color = Colors.ink, strokeWidth = 1.8 }: IconProps) => (
  <Svg {...base(size)} fill="none">
    <Path d="M6 9a6 6 0 0112 0c0 4 1.5 5.5 2 6.5H4c.5-1 2-2.5 2-6.5z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M10 19a2 2 0 004 0" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const TrashIcon = ({ size = 18, color = Colors.muted, strokeWidth = 1.9 }: IconProps) => (
  <Svg {...base(size)} fill="none">
    <Path d="M5 7h14M9 7V4h6v3M7 7l1 13h8l1-13M10 11v6M14 11v6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const MailIcon = ({ size = 20, color = Colors.ink, strokeWidth = 1.8 }: IconProps) => (
  <Svg {...base(size)} fill="none">
    <Path d="M4 6h16v12H4z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M4 7l8 6 8-6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const ShieldIcon = ({ size = 20, color = Colors.ink, strokeWidth = 1.8 }: IconProps) => (
  <Svg {...base(size)} fill="none">
    <Path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const DocIcon = ({ size = 20, color = Colors.ink, strokeWidth = 1.8 }: IconProps) => (
  <Svg {...base(size)} fill="none">
    <Path d="M7 3h7l5 5v11a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M14 3v5h5M9 13h6M9 17h4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const StarIcon = ({ size = 20, color = Colors.ink, strokeWidth = 1.8 }: IconProps) => (
  <Svg {...base(size)} fill="none">
    <Path
      d="M12 3l2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9L6.7 19.5l1.1-6L3.4 9.3l6-.8z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const LogoutIcon = ({ size = 20, color = Colors.red, strokeWidth = 1.8 }: IconProps) => (
  <Svg {...base(size)} fill="none">
    <Path d="M10 4H6a2 2 0 00-2 2v12a2 2 0 002 2h4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M15 8l4 4-4 4M19 12H9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const SparkleIcon = ({ size = 18, color = Colors.coral }: IconProps) => (
  <Svg {...base(size)} fill="none">
    <Path d="M12 3l1.8 4.6L18.5 9.5l-4.7 1.9L12 16l-1.8-4.6L5.5 9.5l4.7-1.9z" fill={color} />
  </Svg>
);

export const RetryIcon = ({ size = 18, color = Colors.surface, strokeWidth = 2.2 }: IconProps) => (
  <Svg {...base(size)} fill="none">
    <Path d="M20 12a8 8 0 01-14.5 4.6M4 12a8 8 0 0114.5-4.6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M18.5 3.5v4h-4M5.5 20.5v-4h4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const GoogleLogoIcon = ({ size = 18 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.4c-.2 1.2-.9 2.3-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.4z" fill="#4285F4" />
    <Path d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6C4.8 19.8 8.2 22 12 22z" fill="#34A853" />
    <Path d="M6.4 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.4H3.1C2.4 8.8 2 10.4 2 12s.4 3.2 1.1 4.6L6.4 14z" fill="#FBBC05" />
    <Path d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.9-2.9C17 2.9 14.7 2 12 2 8.2 2 4.8 4.2 3.1 7.4L6.4 10c.8-2.3 3-4.1 5.6-4.1z" fill="#EA4335" />
  </Svg>
);

export const QuestionMarkIcon = ({ size = 72, color = Colors.ink }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 72 72" fill="none">
    <Circle cx={36} cy={36} r={34} fill={Colors.surface} />
    <Path
      d="M26 28c0-6 4.5-10 10-10s10 3.5 10 9c0 7-10 7-10 16"
      stroke={color}
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx={36} cy={52} r={2.8} fill={color} />
  </Svg>
);

export const GlobeIcon = ({ size = 20, color = Colors.ink, strokeWidth = 1.8 }: IconProps) => (
  <Svg {...base(size)} fill="none">
    <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={strokeWidth} />
    <Path d="M3 12h18" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <Path d="M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </Svg>
);
