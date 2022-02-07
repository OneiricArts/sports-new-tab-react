import React, { useEffect, useReducer, useState } from 'react';
import { Card } from '../simpleui';
import getNBAData from '../SportsDataAccessors/nba/getNBAData';
import createScheduleReducer from './createScheduleReducer';
import GameTable, { ExpandedContentWrapper } from './GameTable';
import { useThrowForErrorBoundary } from '../hooks/useErrorBoundary';
import ErrorCard from '../ErrorCard';
import { ErrorBoundary } from './ErrorBoundary';
import { widgetOnError } from './widgetCatchError';
import useVisibilityHandlers from '../hooks/useVisibilityHandlers';
import { Game, Schedule } from '../SportsDataAccessors/types';
import { Button } from 'reactstrap';
import { Standings } from './NBAStandings';

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

  const [showStandings, setShowStandings] = useState(false);

  return (
    <>
      {showStandings && <Standings onClose={() => setShowStandings(false)} />}
      <Card
        title={
          <div style={{ display: 'flex' }}>
            <span className="font-weight-bold">NBA</span>
            <span className="pl-2 font-weight-light font-italic text-lowercase text-muted">
              {nbaSchedule.displayDate}
            </span>

            <Button
              style={{ marginLeft: 'auto' }}
              outline
              size="sm"
              onClick={() => {
                setShowStandings(true);
              }}
            >
              Standings
            </Button>
          </div>
        }
      >
        {(nbaSchedule.games?.length ?? 0) > 0 ? (
          <GameTable games={nbaSchedule.games as Game[]} sport="nba" />
        ) : (
          <div className="p-3">No games today.</div>
        )}
      </Card>
    </>
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

export const getExpandedContent = (
  broadcaster?: string,
  teamRecords?: string
) => () => {
  return (
    <ExpandedContentWrapper>
      {teamRecords && <h6 style={{ textAlign: 'center' }}>{teamRecords}</h6>}
      {broadcaster && (
        <div style={{ textAlign: 'center' }}>{`📺 ${broadcaster}`}</div>
      )}
    </ExpandedContentWrapper>
  );
};

export default NBA;
