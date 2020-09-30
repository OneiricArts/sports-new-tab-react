import React, { useEffect, useReducer, Fragment } from 'react';
import { Card } from '../simpleui';
import GameTable from './GameTable';
import getChampionsLeagueData, {
  ChampionsLeagueScoreboardI
} from '../SportsDataAccessors/soccer/getChampionsLeagueData';
import createScheduleReducer from './createScheduleReducer';
import { CardHeader, Table } from 'reactstrap';
import ErrorCard from '../ErrorCard';
import { ErrorBoundary } from './ErrorBoundary';
import { widgetOnError } from './widgetCatchError';
import { useThrowForErrorBoundary } from '../hooks/useErrorBoundary';
import useVisibilityHandlers from '../hooks/useVisibilityHandlers';

const initFromCache = (
  init: ChampionsLeagueScoreboardI
): ChampionsLeagueScoreboardI => {
  try {
    const data = localStorage.getItem('SOCCER_DATA_v1');
    if (!data) return init;

    const json = JSON.parse(data) as ChampionsLeagueScoreboardI;
    if (Object.keys(json).length > 1) return json;

    return init;
  } catch {
    return init;
  }
};

const SoccerSchedule = () => {
  const [throwFcError] = useThrowForErrorBoundary();

  const [visibleCount] = useVisibilityHandlers();

  useEffect(() => {
    getChampionsLeagueData()
      .then(data => scheduleDispatch({ type: 'SET_NEW', newState: data }))
      .catch(e => throwFcError(e));
  }, [throwFcError, visibleCount]);

  const [schedule, scheduleDispatch] = useReducer(
    createScheduleReducer<ChampionsLeagueScoreboardI>('SOCCER_DATA_v1'),
    {},
    initFromCache
  );

  return (
    <Card title={<span className="font-weight-bold">Champions League</span>}>
      <Table responsive size="sm">
        {Object.entries(schedule)
          .sort()
          .slice(0, 3)
          .map(([displayDate, games]) => (
            <Fragment key={displayDate}>
              <CardHeader className="border-top">
                <span className="font-weight-light text-muted">
                  {displayDate}
                </span>
              </CardHeader>
              <GameTable games={games} />
            </Fragment>
          ))}

        {Object.entries(schedule).length === 0 && (
          <div className="p-3">No games today.</div>
        )}
      </Table>
    </Card>
  );
};

const Soccer = () => (
  <ErrorBoundary
    onError={widgetOnError('Soccer', 'SOCCER_DATA_v1')}
    message={<ErrorCard name="Soccer" />}
  >
    <SoccerSchedule />
  </ErrorBoundary>
);
export default Soccer;
