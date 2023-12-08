import { Status } from "./interfaces";

export const LOGIN_ROUTE: string = '/login';
export const CHAT_ROUTE: string = '/chat';
export const REVIEWS_ROUTE: string = '/reviews';

export const MESSAGES_COLLECTION: string = 'supportMessages/';
export const PROFILES_COLLECTION: string = 'profiles';
export const APP_REVIEWS_COLLECTION: string = 'appReviews';

export const NUMBER_REGEXP: RegExp = /^\d+$/;

export const ChatStatuses: Status[] = [
  {
    eng: 'new',
    rus: 'Новые'
  },
  {
    eng: 'seen',
    rus: 'Прочитанные'
  },
  {
    eng: 'completed',
    rus: 'Завершенные'
  }
];

export const userDefaultProfile = require('../assets/img/ava-default.png');