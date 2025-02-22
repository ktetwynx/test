export const BEARER_TOKEN = 'BEARER_TOKEN';
export const PROFILE = 'PROFILE';
export const FAV_BOOK_COUNT = 'FAV_BOOK_COUNT';
export const FAV_LYRIC_COUNT = 'FAV_LYRIC_COUNT';
export const APP_LANG = 'APP_LANGUAGE';
export const APP_THEME = 'APP_THEME';
export const PLAYMODE_FONTSIZE = 'PLAYMODE_FONTSIZE';
export const PLAYMODE_SCROLLSPEED = 'PLAYMODE_SCROLLSPEED';
export const ADS_SHOW_TIME = 'ADS_SHOW_TIME';
export const NOTIFICATION_DATA = 'NOTIFICATION_DATA';
export interface Profile {
  id: 0;
  username: '';
  email: '';
  bookCollectionId: 0;
  lyricCollectionId: 0;
}
export function setToken(token: any) {
  return {type: BEARER_TOKEN, token};
}

export function setProfile(profile?: Profile) {
  return {type: PROFILE, profile};
}

export function setFavBookCount(count: number) {
  return {type: FAV_BOOK_COUNT, count};
}

export function setFavLyricCount(count: number) {
  return {type: FAV_LYRIC_COUNT, count};
}

export function setAppLanguage(app_language: string) {
  return {type: APP_LANG, app_language};
}

export function setAppTheme(app_theme: string) {
  return {type: APP_THEME, app_theme};
}

export function setPlayModeFontSize(playmode_fontsize: string) {
  return {type: PLAYMODE_FONTSIZE, playmode_fontsize};
}

export function setPlayModeScrolSpeed(playmode_scrollSpeed: number) {
  return {type: PLAYMODE_SCROLLSPEED, playmode_scrollSpeed};
}

export function setAdsShowTime(ads_show_time: number) {
  return {type: ADS_SHOW_TIME, ads_show_time};
}

export function setNotificationData(notification_data: []) {
  return {type: NOTIFICATION_DATA, notification_data};
}
