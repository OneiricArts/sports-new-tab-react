import React, { useEffect, useReducer } from 'react';
import { Card } from '../simpleui';
import getNBAData from '../SportsDataAccessors/nba/getNBAData';
import { NBADataI, NBAGameI } from '../SportsDataAccessors/nba/NbaDatatypes';
import createScheduleReducer from './createScheduleReducer';
import GameTableNba from './GameTableNba';
import { useThrowForErrorBoundary } from '../hooks/useErrorBoundary';
import ErrorCard from '../ErrorCard';
import { ErrorBoundary } from './ErrorBoundary';
import { widgetOnError } from './widgetCatchError';

const initFromCache = (init: NBADataI): NBADataI => {
  try {
    const data = localStorage.getItem('NBA_DATA_v1');
    if (!data) return init;

    const json = JSON.parse(data) as NBADataI;
    if (json.displayDate && json.games) return json;

    return init;
  } catch {
    return init;
  }
};

const NBASchedule = () => {
  const [throwFcError] = useThrowForErrorBoundary();

  useEffect(() => {
    getNBAData()
      .then(data => nbaScheduleDispatch({ type: 'SET_NEW', newState: data }))
      .catch(e => throwFcError(e));
  }, [throwFcError]);

  const [nbaSchedule, nbaScheduleDispatch] = useReducer(
    createScheduleReducer<NBADataI>('NBA_DATA_v1'),
    {
      displayDate: ''
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
        <GameTableNba games={nbaSchedule.games as NBAGameI[]} />
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
