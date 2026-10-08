/**
 * Programmer / hacker-terminal inspired palette.
 * Dark editor surfaces + neon syntax-highlight accents.
 * (Key names are stable so every screen picks the theme up automatically.)
 */
export const COLORS = {
  // Core surfaces
  background: '#0B0E14', // editor background
  card: '#11151D', // panel
  surface: '#171C26', // raised surface (chips, title bars)
  border: '#1E2733', // subtle 1px border
  borderBright: '#2C3745', // highlighted border
  shadow: '#000000',

  // Text
  textPrimary: '#E6EDF3',
  textSecondary: '#7D8590',
  textMuted: '#4B5563',
  textOnPrimary: '#04140D', // dark text on neon buttons

  // Accents (syntax-highlight inspired)
  primary: '#00E58B', // neon terminal green
  primaryDim: '#00E58B1A', // 10% green wash
  accent: '#00B8D9', // cyan
  accentPink: '#FF79C6', // pink
  comment: '#5C6370', // // comments
  keyword: '#C678DD', // purple
  string: '#98C379', // green string
  number: '#E5C07B', // amber

  // Status
  warning: '#FFB86B',
  success: '#00E58B',
  danger: '#FF5F56',
} as const;