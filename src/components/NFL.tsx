import React, { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Button, Progress, Spinner } from 'reactstrap';
import ErrorCard from '../ErrorCard';
import { useThrowForErrorBoundary } from '../hooks/useErrorBoundary';
import useVisibilityHandlers from '../hooks/useVisibilityHandlers';
import { Card } from '../simpleui';
import getNFLData from '../SportsDataAccessors/nfl/getNflData';
import { NFLSchedule } from '../SportsDataAccessors/types';
import { ErrorBoundary } from './ErrorBoundary';
import { Expandable } from './Expandable';
import GameTable, { ExpandedContentWrapper } from './GameTable';
import { SubredditCard, SubredditTitle } from './Subreddit';
import { widgetOnError } from './widgetCatchError';

function carryOverHiddenGames(
  schedule: NFLSchedule,
  cachedSchedule: NFLSchedule
) {
  if (schedule.displayDate !== cachedSchedule.displayDate) return schedule;

  schedule.games.map(g => {
    const cachedGame = cachedSchedule.games.find(cg => cg.id === g.id);
    if (cachedGame) g.hidden = cachedGame.hidden;

    return g;
  });

  return schedule;
}

const LOCAL_STORAGE_KEY = 'nfl-schedule-data';

function NFLScheduleCard() {
  const [schedule, setSchedule] = useState<NFLSchedule>(() => {
    const cachedScheduleString = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (cachedScheduleString) {
      return JSON.parse(cachedScheduleString);
    }

    return {
      displayDate: '',
      games: []
    };
  });

  const [throwFcError] = useThrowForErrorBoundary();

  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const isLoading = false;

  const upDateSchedule = useCallback(async () => {
    let cachedSchedule: NFLSchedule | undefined;

    // TODO only look at cache when needed
    // console.log('using cache');
    const cachedScheduleString = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (cachedScheduleString) {
      cachedSchedule = JSON.parse(cachedScheduleString);
    }
    //...//

    ReactDOM.unstable_batchedUpdates(() => {
      if (cachedSchedule) setSchedule(cachedSchedule);
      // setIsLoading(true);
    });

    try {
      let schedule = await getNFLData();
      if (cachedSchedule) {
        schedule = carryOverHiddenGames(schedule, cachedSchedule);
      }
      // console.log(schedule);
      ReactDOM.unstable_batchedUpdates(() => {
        setSchedule(schedule);
        // setIsLoading(false);
      });
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(schedule));
    } catch (e: any) {
      // setIsLoading(false);
      throwFcError(e);
    }
  }, [throwFcError]);

  const resetSchedule = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    upDateSchedule();
  };

  useEffect(() => {
    upDateSchedule();
  }, [upDateSchedule]);

  useVisibilityHandlers(upDateSchedule);

  const removeGame = (id: number | string) => {
    const newGames = schedule.games.map(game => {
      if (game.id === id) {
        game.hidden = true;
      }
      return game;
    });

    setSchedule({ displayDate: schedule.displayDate, games: newGames });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(schedule));
  };

  // console.log('rendering...');
  return (
    <Card
      title={
        <span>
          <span className="font-weight-bold">NFL</span>
          <span className="pl-2 font-weight-light font-italic text-lowercase text-muted">
            {schedule.displayDate}
          </span>
          <Button
            outline
            size="sm"
            className="float-right"
            onClick={resetSchedule}
            disabled={isLoading}
            style={{ width: '50px' }}
          >
            {isLoading ? (
              <Spinner size="sm" color="primary" type="grow" />
            ) : (
              'Reset'
            )}
          </Button>
        </span>
      }
    >
      {isLoading && (
        <Progress animated style={{ height: '5px' }} color="info" value={100} />
      )}

      {schedule.games.length === 0 ? (
        <div className="p-3">No games today.</div>
      ) : (
        <GameTable games={schedule.games} removeGame={removeGame} sport="nfl" />
      )}

      <NewsCard />
    </Card>
  );
}

const NFL = () => (
  <ErrorBoundary
    onError={widgetOnError('NFL', LOCAL_STORAGE_KEY)}
    message={<ErrorCard name="NFL" />}
  >
    <NFLScheduleCard />
  </ErrorBoundary>
);

const NewsCard = () => {
  return (
    <div>
      <Expandable
        rememberKey="r/nfl-news"
        title={(expanded, toggle) => (
          <SubredditTitle subreddit="nfl" expanded={expanded} toggle={toggle} />
        )}
      >
        <SubredditCard subreddit="nfl" />
      </Expandable>
    </div>
  );
};

export const getExpandedContent =
  (broadcaster?: string, status?: string) => () => {
    return (
      <ExpandedContentWrapper>
        {broadcaster && <div>{`📺 ${broadcaster}`}</div>}
        {status && <div>{status}</div>}
      </ExpandedContentWrapper>
    );
  };

export default NFL;
