import { Platform } from 'react-native';

/**
 * System monospace stack — no font loading required, so it works
 * out of the box on iOS, Android and web.
 */
export const MONO_FONT =
  Platform.select({
    ios: 'Menlo',
    android: 'monospace',
    web: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    default: 'monospace',
  }) ?? 'monospace';

/** Sharp-ish radius for that code/UI-panel look. */
export const RADIUS = 8;

/** Small radius used by badges, chips and inline code. */
export const RADIUS_SM = 4;