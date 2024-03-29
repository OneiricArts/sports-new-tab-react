import React, { useEffect, useReducer } from 'react';
import { Card } from '../simpleui';
import createScheduleReducer from './createScheduleReducer';
import GameTable from './GameTable';
import { useThrowForErrorBoundary } from '../hooks/useErrorBoundary';
import ErrorCard from '../ErrorCard';
import { ErrorBoundary } from './ErrorBoundary';
import { widgetOnError } from './widgetCatchError';
import { Game, Schedule } from '../SportsDataAccessors/types';
import getMlbData from '../SportsDataAccessors/mlb/getMlbData';
import useVisibilityHandlers from '../hooks/useVisibilityHandlers';

const initFromCache = (init: Schedule): Schedule => {
  try {
    const data = localStorage.getItem('MLB_DATA_v1');
    if (!data) return init;

    const json = JSON.parse(data) as Schedule;
    if (json.displayDate && json.games) return json;

    return init;
  } catch {
    return init;
  }
};

const MLBSchedule = () => {
  const [throwFcError] = useThrowForErrorBoundary();

  const [visibleCount] = useVisibilityHandlers();

  useEffect(() => {
    getMlbData()
      .then(s => scheduleDispatch({ type: 'SET_NEW', newState: s }))
      .catch(e => throwFcError(e));
  }, [throwFcError, visibleCount]);

  const [schedule, scheduleDispatch] = useReducer(
    createScheduleReducer<Schedule>('MLB_DATA_v1'),
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
          <span className="font-weight-bold">MLB</span>
          <span className="pl-2 font-weight-light font-italic text-lowercase text-muted">
            {schedule.displayDate}
          </span>
        </span>
      }
    >
      {(schedule.games?.length ?? 0) > 0 ? (
        <GameTable games={schedule.games as Game[]} sport="mlb" />
      ) : (
        <div className="p-3">No games today.</div>
      )}
    </Card>
  );
};

const MLB = () => (
  <ErrorBoundary
    onError={widgetOnError('MLB', 'MLB_DATA_v1')}
    message={<ErrorCard name="MLB" />}
  >
    <MLBSchedule />
  </ErrorBoundary>
);

export default MLB;
