/*
 * Default theme settings for the Theme Customizer.
 *
 * These are the fallback values used when no settings cookie exists. The cookie takes
 * priority, so changing a value here only takes effect after the cookie is reset
 * (use the reset button in the customizer, or clear the `settingsCookieName` cookie).
 */

const themeConfig = {
  settingsCookieName: 'mrmg-settings',
  mode: 'dark', // 'system' | 'light' | 'dark'
  themePreset: 'default', // 'default' | any key from src/utils/theme-presets.ts
  headingFont: 'bebas-neue', // any key from FONT_CONFIG in src/utils/fonts.ts
  bodyFont: 'dm-sans', // any key from FONT_CONFIG in src/utils/fonts.ts
  monoFont: 'dm-mono', // any key from FONT_CONFIG in src/utils/fonts.ts
  radius: 'md', // 'none' | 'sm' | 'md' | 'lg'
  scale: 'md', // 'sm' | 'md' | 'lg'
  sidebarOpen: true // dashboard sidebar expanded by default
} as const

export default themeConfig
