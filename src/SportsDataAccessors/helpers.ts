import { GameStatus } from './types';

/**
 * Formatting Dates for API helpers
 *
 */

const twoDigits = (n: number) => (n < 10 ? `0${n}` : `${n}`);

type DateFormatter = (p: { yyyy: string; mm: string; dd: string }) => string;

export function formatDate(date: Date, func: DateFormatter) {
  const yyyy = date.getFullYear().toString();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();

  return func({ yyyy, mm: twoDigits(mm), dd: twoDigits(dd) });
}

/**
 * Convert gameStatus to a string for the UI
 *
 */
export const displayGameStatus = (status: GameStatus): string => {
  if (status.type === 'GAMESTATUS_STRING') return status.value;
  if (status.type === 'DATE_STRING') return status.value;

  let date: Date;
  if (status.type === 'UTC_TIME') {
    date = new Date(status.value);
  } else if (status.type === 'TIME_STRING') {
    const utc = Date.parse(status.value);
    date = new Date(utc);
  } else {
    // something went seriously wrong -- e.g. localStorage has different type
    return 'ERROR';
  }

  const time = date.toLocaleTimeString();

  const [h, m] = time.split(' ')[0].split(':');
  const statusString = `${h}:${m} ${time.split(' ')[1]}`;

  return statusString;
};

/**
 * @param {Date} [date=(new Date())] - date on which to determine if DST is on
 * @returns {boolean} isDaylightSavingsOn
 *
 * https://stackoverflow.com/questions/11887934/how-to-check-if-the-dst-daylight-saving-time-is-in-effect-and-if-it-is-whats
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset
 */
export const isDaylightSavingsTimeOn = (date = new Date()) => {
  const jan = new Date(date.getFullYear(), 0, 1);
  const jul = new Date(date.getFullYear(), 6, 1);

  const stdTimezoneOffset = Math.max(
    jan.getTimezoneOffset(),
    jul.getTimezoneOffset()
  );
  const dalightSavingsTime = date.getTimezoneOffset() < stdTimezoneOffset;

  return dalightSavingsTime;
};
