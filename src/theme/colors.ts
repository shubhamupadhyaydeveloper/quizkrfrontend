export const Colors = {
  ink: '#21212B',
  muted: '#6E6E78',
  surface: '#FFFFFF', // flat white cards on the gray canvas
  bg: '#F5F4F1', // near-neutral light warm-gray canvas — lighter/less saturated than a candy-cream tint
  subtleBorder: 'rgba(33,33,43,0.08)', // hairline card/button border
  badgeBorder: 'rgba(33,33,43,0.12)', // hairline ring for icon badges (outline instead of a tinted fill)
  coral: '#E2825B', // one accent, used sparingly
  cardBlue: '#DCE4F2', // quiz question-card header fill
  green: '#4FAE72', // correct / verified only
  red: '#CC5347', // wrong / destructive only
  // Gradient-mesh hero background (Splash, Onboarding) — tuned near the coral accent
  meshPurple: '#8C7FE0',
  meshPink: '#E39BC9',
  meshBlue: '#7FA6E0',
} as const;

export type ColorToken = keyof typeof Colors;
