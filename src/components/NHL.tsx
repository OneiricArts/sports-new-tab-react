import React, { useEffect, useReducer } from 'react';
import { Card } from '../simpleui';
import createScheduleReducer from './createScheduleReducer';
import GameTable from './GameTable';
import { useThrowForErrorBoundary } from '../hooks/useErrorBoundary';
import ErrorCard from '../ErrorCard';
import { ErrorBoundary } from './ErrorBoundary';
import { widgetOnError } from './widgetCatchError';
import { Game, Schedule } from '../SportsDataAccessors/types';
import getNhlData from '../SportsDataAccessors/nhl/getNhlData';

const initFromCache = (init: Schedule): Schedule => {
  try {
    const data = localStorage.getItem('NHL_DATA_v1');
    if (!data) return init;

    const json = JSON.parse(data) as Schedule;
    if (json.displayDate && json.games) return json;

    return init;
  } catch {
    return init;
  }
};

const NHLSchedule = () => {
  const [throwFcError] = useThrowForErrorBoundary();

  useEffect(() => {
    getNhlData()
      .then(data => scheduleDispatch({ type: 'SET_NEW', newState: data }))
      .catch(e => throwFcError(e));
  }, [throwFcError]);

  const [schedule, scheduleDispatch] = useReducer(
    createScheduleReducer<Schedule>('NHL_DATA_v1'),
    {
      displayDate: '',
      games: []
    },
    initFromCache
  );

  return (
    <Card
      title={
        <span>
          <span className="font-weight-bold">NHL</span>
          <span className="pl-2 font-weight-light font-italic text-lowercase text-muted">
            {schedule.displayDate}
          </span>
        </span>
      }
    >
      {(schedule.games?.length ?? 0) > 0 ? (
        <GameTable games={schedule.games as Game[]} />
      ) : (
        <div className="p-3">No games today.</div>
      )}
    </Card>
  );
};

const NHL = () => (
  <ErrorBoundary
    onError={widgetOnError('NHL', 'NHL_DATA_v1')}
    message={<ErrorCard name="NHL" />}
  >
    <NHLSchedule />
  </ErrorBoundary>
);

export default NHL;
