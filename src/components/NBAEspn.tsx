import { useEffect, useReducer, useState } from 'react';
import { Spinner } from 'reactstrap';
import ErrorCard from '../ErrorCard';
import { useThrowForErrorBoundary } from '../hooks/useErrorBoundary';
import useVisibilityHandlers from '../hooks/useVisibilityHandlers';
import { Card } from '../simpleui';
import { dateInPT, isSameDate } from '../SportsDataAccessors/helpers';
import { EspnNbaStandings } from '../SportsDataAccessors/nba/espnRankings';
import getEspnNbaData from '../SportsDataAccessors/nba/getEspnNbaData';
import { Game, Schedule } from '../SportsDataAccessors/types';
import createScheduleReducer from './createScheduleReducer';
import { ErrorBoundary } from './ErrorBoundary';
import GameTable from './GameTable';
import { ChangeDate } from './NBA';
import { NBAFavTeams } from './FavTeams';
import { StandingsEspn } from './NBAStandingsEspn';
import { widgetOnError } from './widgetCatchError';
import { Loader } from './Loader';
import { Pill, TitlePill } from './UI/TitlePill';
import { Button } from './UI/Button';

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

const today = () => dateInPT();

const NBASchedule = () => {
  const [throwFcError] = useThrowForErrorBoundary();

  const [visibleCount] = useVisibilityHandlers();

  const [standings, setStandings] = useState<EspnNbaStandings | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    setIsLoading(true);

    getEspnNbaData(date)
      .then(data => {
        nbaScheduleDispatch({ type: 'SET_NEW', newState: data.schedule });
        setStandings(data.standings);
      })
      .catch(e => throwFcError(e))
      .finally(() => setIsLoading(false));
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
        <StandingsEspn
          onClose={() => setShowStandings(false)}
          standings={standings}
        />
      )}
      <Card
        title={
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>
              <TitlePill title="NBA" />

              <Pill style={{ marginLeft: '5px' }}>
                {nbaSchedule.displayDate}
              </Pill>
            </div>

            <div style={{ display: 'flex', marginTop: '5px' }}>
              <ChangeDate
                changeDate={changeDate}
                isToday={isSameDate(today(), date)}
              />

              <Button
                style={{ marginLeft: 'auto' }}
                onClick={() => {
                  setShowFavs(true);
                }}
              >
                Fav Team
              </Button>

              <Button
                style={{
                  marginLeft: '5px',
                  width: '78.64px'
                }}
                onClick={() => {
                  setShowStandings(true);
                }}
                disabled={!standings}
              >
                <Loader
                  isLoading={isLoading}
                  wait={350}
                  minimum={1200}
                  spinner={<Spinner size="sm" color="primary" type="grow" />}
                >
                  Standings
                </Loader>
              </Button>
            </div>
          </div>
        }
      >
        {(nbaSchedule.games?.length ?? 0) > 0 ? (
          <GameTable
            games={nbaSchedule.games as Game[]}
            sport="nba"
            isLoading={isLoading}
          />
        ) : (
          <div className="p-3">No games today.</div>
        )}
      </Card>
    </>
  );
};

const NBAEspn = () => (
  <ErrorBoundary
    onError={widgetOnError('NBA', 'NBA_DATA_v1')}
    message={<ErrorCard name="NBA" />}
  >
    <NBASchedule />
  </ErrorBoundary>
);

export { NBAEspn };
