export const APP_CONSTANTS = {
  REDIRECT_URL: 'redirect_url',
  SUPPORT_EMAIL: 'info@calopad.com'
};

export const REGEX_CONSTANTS = {
  EMAIL_REGEX: /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/,
  PASSWORD_REGEX: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$%^&*-]).{8,}$/,
  WEB_URL_REGEX: /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/,
  INTEGER_REGEX: /^\d*$/,
  DECIMAL_REGEX: /^\d*\.?\d*$/,
  ZIP_REGEX: /^[0-9]{4,6}$/
};

export enum MessageType {
  info = 'info',
  error = 'error',
  warning = 'warning',
  success = 'success',
}

export const LANGUAGE_CONSTANTS = {
  en: 'en_US',
  de: 'de_CH',
};

export const DEFAULT_LANGUAGE = LANGUAGE_CONSTANTS.en;

export const PAGE_SIZE = [
  10, 25, 50, 100
];

export const DEFAULT_MAT_DIALOG_CONFIG = {
  panelClass: 'vc-generic-dialog-box',
  maxWidth: 'calc(100% - 24px)',
  minHeight: '250px',
  hasBackdrop: true,
  disableClose: true
};

export const COUNTRY_LIST = [
  { value: '63f3818f7ad52cc9f404f645', label: 'switzerland' },
  { value: '63f3818f7ad52cc9f404f5a7', label: 'austria' },
  { value: '63f3818f7ad52cc9f404f5de', label: 'germany' }
];

export const CURRENCY_LIST = [
  { value: 'CHF', label: 'CHF' },
  { value: 'EUR', label: 'EUR' }
];

export const LANGUAGE_LIST = [
  { value: 'en_US', label: 'English' },
  { value: 'de_CH', label: 'German' }
];

export const ROUTE_PATH = {
  dashboard: '/admin/dashboard',
  partner: '/admin/partner'
};

export const LANGUAGE_CONSTANTS_LIST = [
  {
    value: 'en_US',
    src: '/assets/images/flags/en.svg',
    alt: 'UK flag',
    viewValue: 'EN'
  },
  {
    value: 'de_CH',
    src: '/assets/images/flags/de.svg',
    alt: 'German flag',
    viewValue: 'DE'
  }
];

export enum HttpMethod {
  post = 'POST',
  get = 'GET'
}

export const SORT_OPTIONS = [
  { value: 'oldest', label: 'oldestEntries' },
  { value: 'newest', label: 'latestEntries' }
];

export enum RegexType {
  decimal = 'decimal',
  integer = 'integer'
}

export enum AccountingStatus {
  billed = 'billed',
  paid = 'paid',
  redeem = 'redeem',
  buy = 'buy',
  open = 'open'
}

export const SVG_ICON_LIST = [{
  name: 'list',
  path: 'assets/images/list.svg'
},
{
  name: 'logout',
  path: 'assets/images/logout.svg'
}];

export enum PositionEnum {
  left = 'left',
  right = 'right',
}

export enum Months {
  January, February, March, April, May, June, July, August, September, October, November, December
}

export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE_INDEX = 1;
export const DEBOUNCE_TIME = 500;
export const LOGOUT = 'logout';
