import React, { FC, useEffect, useReducer, useState } from 'react';
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
import { Button } from 'reactstrap';
import { Standings } from './NBAStandings';
import { INbaStandings } from './INbaStandings';
import { NBAFavTeams } from './NBAFavTeams';
import { isSameDate } from '../SportsDataAccessors/helpers';

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

type ChangeDateP = 'up' | 'down' | 'today';

const today = () => new Date();

const NBASchedule = () => {
  const [throwFcError] = useThrowForErrorBoundary();

  const [visibleCount] = useVisibilityHandlers();

  const [standings, setStandings] = useState<INbaStandings | undefined>();
  const [date, setDate] = useState(today());

  const changeDate = (opt: ChangeDateP) => {
    if (opt === 'today') {
      setDate(today());
      return;
    }

    const change = opt === 'down' ? -1 : 1;

    const newDate = new Date(date);
    newDate.setDate(date.getDate() + change);
    setDate(newDate);
  };

  useEffect(() => {
    getNBAData(date)
      .then(data => {
        nbaScheduleDispatch({ type: 'SET_NEW', newState: data.schedule });
        setStandings(data.standings);
      })
      .catch(e => throwFcError(e));
  }, [throwFcError, visibleCount, date]);

  const [nbaSchedule, nbaScheduleDispatch] = useReducer(
    createScheduleReducer<Schedule>('NBA_DATA_v1'),
    {
      displayDate: '',
      games: []
    },
    initFromCache
  );

  const [showStandings, setShowStandings] = useState(false);
  const [showFavs, setShowFavs] = useState(false);

  return (
    <>
      {showFavs && <NBAFavTeams onClose={() => setShowFavs(false)} />}

      {showStandings && standings && (
        <Standings
          onClose={() => setShowStandings(false)}
          standings={standings}
        />
      )}
      <Card
        title={
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>
              <span className="font-weight-bold">NBA</span>
              <span className="pl-2 font-weight-light font-italic text-lowercase text-muted">
                {nbaSchedule.displayDate}
              </span>
            </div>

            <div style={{ display: 'flex', marginTop: '5px' }}>
              <ChangeDate
                changeDate={changeDate}
                isToday={isSameDate(today(), date)}
              />

              <Button
                style={{ marginLeft: 'auto' }}
                outline
                size="sm"
                color="success"
                onClick={() => {
                  setShowFavs(true);
                }}
              >
                Fav Team
              </Button>

              <Button
                style={{ marginLeft: '5px' }}
                outline
                size="sm"
                color="primary"
                onClick={() => {
                  setShowStandings(true);
                }}
                disabled={!standings}
              >
                Standings
              </Button>
            </div>
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

const ChangeDate: FC<{
  changeDate: (opt: ChangeDateP) => void;
  isToday: boolean;
}> = ({ changeDate, isToday }) => (
  <>
    <Button
      outline
      size="sm"
      className="mx-1"
      onClick={() => changeDate('down')}
    >
      {'<'}
    </Button>
    <Button
      outline
      size="sm"
      onClick={() => changeDate('today')}
      disabled={isToday}
    >
      Today
    </Button>
    <Button outline size="sm" className="mx-1" onClick={() => changeDate('up')}>
      {'>'}
    </Button>
  </>
);

const NBA = () => (
  <ErrorBoundary
    onError={widgetOnError('NBA', 'NBA_DATA_v1')}
    message={<ErrorCard name="NBA" />}
  >
    <NBASchedule />
  </ErrorBoundary>
);

export default NBA;
