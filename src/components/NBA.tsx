import React, { useEffect, useReducer } from 'react';
import { Card } from '../simpleui';
import getNBAData from '../SportsDataAccessors/nba/getNBAData';
import createScheduleReducer from './createScheduleReducer';
import GameTable from './GameTable';
import { useThrowForErrorBoundary } from '../hooks/useErrorBoundary';
import ErrorCard from '../ErrorCard';
import { ErrorBoundary } from './ErrorBoundary';
import { widgetOnError } from './widgetCatchError';
import useVisibilityHandlers from '../hooks/useVisibilityHandlers';
import { Game, Schedule } from '../SportsDataAccessors/types';

const initFromCache = (init: Schedule): Schedule => {
  try {
    const data = localStorage.getItem('NBA_DATA_v1');
    if (!data) return init;

    const json = JSON.parse(data) as Schedule;
    if (json.displayDate && json.games) return json;

    return init;
  } catch {
    return init;
  }
};

const NBASchedule = () => {
  const [throwFcError] = useThrowForErrorBoundary();

  const [visibleCount] = useVisibilityHandlers();

  useEffect(() => {
    getNBAData()
      .then(data => nbaScheduleDispatch({ type: 'SET_NEW', newState: data }))
      .catch(e => throwFcError(e));
  }, [throwFcError, visibleCount]);

  const [nbaSchedule, nbaScheduleDispatch] = useReducer(
    createScheduleReducer<Schedule>('NBA_DATA_v1'),
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
          <span className="font-weight-bold">NBA</span>
          <span className="pl-2 font-weight-light font-italic text-lowercase text-muted">
            {nbaSchedule.displayDate}
          </span>
        </span>
      }
    >
      {(nbaSchedule.games?.length ?? 0) > 0 ? (
        <GameTable games={nbaSchedule.games as Game[]} />
      ) : (
        <div className="p-3">No games today.</div>
      )}
    </Card>
  );
};

const NBA = () => (
  <ErrorBoundary
    onError={widgetOnError('NBA', 'NBA_DATA_v1')}
    message={<ErrorCard name="NBA" />}
  >
    <NBASchedule />
  </ErrorBoundary>
);

export default NBA;
