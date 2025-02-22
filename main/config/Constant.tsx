export const API_URL = 'http://163.44.196.216:8081/api/';

export const API_KEY_PRODUCION = 'ApiKey 4d7259a0-506f-11ee-be56-0242ac120002';
export const API_KEY_TESTING = 'ApiKey f90f76d2-f70d-11ed-b67e-0242ac120002';

export const ALBUM_TITLE = 'Albums';
export const LYRICS_TITLE = 'သီချင်းစားသားများ';
export const SINGER_TITLE = 'အဆိုတော်များ';
export const BOOKS_TITLE = 'စာအုပ်များ';
export const BOOKS_AUTHOR_TITLE = 'စာရေးဆရာများ';
export const BOOK_AUTHOR_TITLE = 'စာရေးဆရာ';
export const PLAY_MODE_TITLE = `PlayMode`;

export const APP_NAME = 'Sar Oak Sin';

export const PENDING = 'PENDING';
export const ACTIVATED = 'ACTIVATED';

export const ROW_COUNT = 12;

export const STORAGE_KEYS = {
  USER_EMAIL: '@com.zote.mobile.search.AUTH.email',
  USER_PASSWORD: '@com.zote.mobile.search.AUTH.Password',
  KEEP_LOGIN: '@com.zote.mobile.search.AUTH.keep_login',
};

import {Platform} from 'react-native';
import {TestIds} from 'react-native-google-mobile-ads';

export const SET_ADS_DURATION = 120000; //2minutes;

export const ADS_BANNER_UNIT_ID =
  Platform.OS == 'ios'
    ? 'ca-app-pub-5673291811584669/8492635513'
    : 'ca-app-pub-5673291811584669/8679255893'; //TestIds.BANNER
export const ADS_INTERSTITIAL_UNIT_ID =
  Platform.OS == 'ios'
    ? 'ca-app-pub-5673291811584669/7366475852'
    : 'ca-app-pub-5673291811584669/8704140774'; //TestIds.INTERSTITIAL

export const dummyData = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}];

export const generateRandomNumber = () => {
  const min = 1000;
  const max = 9999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
};
