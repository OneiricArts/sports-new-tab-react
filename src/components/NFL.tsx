import React, { useEffect, useState } from 'react';
import { Progress } from 'reactstrap';
import { Card } from '../simpleui';
import { fetchNFLDataAsync } from '../SportsDataAccessors/NFLHelper';
import { Schedule } from '../SportsDataAccessors/types';
import GameTable from './GameTable';

export default function NFL() {
  const [schedule, setSchedule] = useState<Schedule>({
    displayDate: '',
    games: [],
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const upDateSchedule = async () => {
    setIsLoading(true);

    try {
      const schedule = await fetchNFLDataAsync(undefined);
      setSchedule(schedule);
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
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
  }

  console.log('rendering...');
  return (
    <Card
      title={
        <span>
          <span className="font-weight-bold">NFL</span>
          <span className="pl-2 font-weight-light font-italic text-lowercase text-muted">{schedule.displayDate}</span>
        </span>
      }
    >
      {isLoading && <Progress animated style={{height: '5px'}} color="info" value={100} />}

      <GameTable games={schedule.games} removeGame={removeGame} />
    </Card>
  );
}
