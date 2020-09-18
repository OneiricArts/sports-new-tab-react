import { GameStatus } from './types';

/**
 * Convert gameStatus to a string for the UI
 *
 */
export const displayGameStatus = (status: GameStatus): string => {
  if (status.type === 'GAMESTATUS_STRING') return status.value;

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
