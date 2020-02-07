import { useState } from 'react';
import { Schedule } from '../SportsDataAccessors/types';

export interface UserDataI {
  removedGames: {
    date?: string;
    games?: { // wanted to use Set but its a pain to stringify and store
      [key: number]: boolean;
    }
  }
}

function useUserPreferences<T extends UserDataI>(
  USER_DATA_LOCAL_STORAGE_KEY: string,
  defaultUserData: T,
): [T, (id: number, schedule: Schedule) => void, () => void] {

  const [userData, setUserData] = useState<T>(() => {
    console.log('using cache')
    try {
      let cachedUserData: T | undefined;
      const cachedUserDataString = localStorage.getItem(USER_DATA_LOCAL_STORAGE_KEY);
      if (cachedUserDataString) cachedUserData = JSON.parse(cachedUserDataString);

      return cachedUserData || { ...defaultUserData };
    } catch {
      return { ...defaultUserData };
    }
  });

  const removeGame = (id: number, schedule: Schedule) => {
    const newUserData = { ...userData };

    // current removedGames points to older date
    if (newUserData.removedGames.date !== schedule.displayDate) {
      newUserData.removedGames.date = schedule.displayDate;
      newUserData.removedGames.games = {};
    }

    if (!newUserData.removedGames.games) newUserData.removedGames.games = {};
    newUserData.removedGames.games[id] = true;

    setUserData(newUserData);
    localStorage.setItem(USER_DATA_LOCAL_STORAGE_KEY, JSON.stringify(newUserData));
  }

  const resetGames = () => {
    setUserData(e => {
      const newUserData = {
        ...e,
        removedGames: {}
      };

      localStorage.setItem(USER_DATA_LOCAL_STORAGE_KEY, JSON.stringify(newUserData));
      return newUserData;
    });
  }

  return [userData, removeGame, resetGames];
}

export default useUserPreferences;
