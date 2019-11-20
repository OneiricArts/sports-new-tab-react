import React, { useEffect, useState } from 'react';
import { Button, Progress, Spinner } from 'reactstrap';
import { Card } from '../simpleui';
import { fetchNFLDataAsync } from '../SportsDataAccessors/NFLHelper';
import { Schedule } from '../SportsDataAccessors/types';
import GameTable from './GameTable';

export default function NFL() {
  const LOCAL_STORAGE_KEY = 'nfl-schedule-data';

  const [schedule, setSchedule] = useState<Schedule>({
    displayDate: '',
    games: [],
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const upDateSchedule = async () => {
    let cachedSchedule: Schedule | undefined;

    // TODO only look at cache when needed
    console.log('using cache')
    const cachedScheduleString = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (cachedScheduleString) {
      cachedSchedule = JSON.parse(cachedScheduleString);
    }
    //...//

    if (cachedSchedule) setSchedule(cachedSchedule);

    setIsLoading(true);

    try {
      const schedule = await fetchNFLDataAsync(cachedSchedule);
      setSchedule(schedule);
      setIsLoading(false);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(schedule));
    } catch {
      setIsLoading(false);
    }
  }

  const resetSchedule = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    upDateSchedule();
  }

  useEffect(() => {
    upDateSchedule();
  }, []);

  const removeGame = (id: number) => {
    const newGames = schedule.games.map(game => {
      if (game.id === id) {
        game.hidden = true;
      }
      return game;
    });

    setSchedule({ displayDate: schedule.displayDate, games: newGames });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(schedule));
  }

  console.log('rendering...');
  return (
    <Card
      title={
        <span>
          <span className="font-weight-bold">NFL</span>
          <span className="pl-2 font-weight-light font-italic text-lowercase text-muted">{schedule.displayDate}</span>
          <Button
            outline
            size="sm"
            className="float-right"
            onClick={resetSchedule}
            disabled={isLoading}
            style={{width:'50px'}}
          >
            {isLoading ? <Spinner size="sm" color="primary" type="grow" /> : 'Reset'}
          </Button>
        </span>
      }
    >
      {isLoading && <Progress animated style={{height: '5px'}} color="info" value={100} />}

      <GameTable games={schedule.games} removeGame={removeGame} />
    </Card>
  );
}
