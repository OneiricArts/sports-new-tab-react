import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { Schedule } from '../SportsDataAccessors/types';

function useFetchSchedule(
  SCHEDULE_LOCAL_STORAGE_KEY: string,
  scheduleFetcher: (_: any) => Promise<Schedule>,
  reRun: number
): [Schedule, boolean, () => void] {
  const [data, setData] = useState<Schedule>(() => {
    console.log('using cache')
    try {
      let cachedSchedule: Schedule | undefined;
      const cachedScheduleString = localStorage.getItem(SCHEDULE_LOCAL_STORAGE_KEY);
      if (cachedScheduleString) cachedSchedule = JSON.parse(cachedScheduleString)

      return cachedSchedule || { displayDate: '', games: [] };
    } catch {
      return { displayDate: '', games: [] };
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('<updating>');
    setIsLoading(true);
    async function update() {
      try {
        const newSchedule = await scheduleFetcher(undefined);
        ReactDOM.unstable_batchedUpdates(() => {
          setData(newSchedule);
          setIsLoading(false);
        });
        localStorage.setItem(SCHEDULE_LOCAL_STORAGE_KEY, JSON.stringify(newSchedule));
      } catch {
        setIsLoading(false);
      }
    }

    update();
  }, [SCHEDULE_LOCAL_STORAGE_KEY, scheduleFetcher, reRun]);

  const resetLocalData = () => localStorage.removeItem(SCHEDULE_LOCAL_STORAGE_KEY);

  return [data, isLoading, resetLocalData];
}

export default useFetchSchedule;
