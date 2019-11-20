import React, { useEffect, useState } from 'react';
import { Card } from '../simpleui';
import { fetchNFLDataAsync } from '../SportsDataAccessors/NFLHelper';
import { Schedule } from '../SportsDataAccessors/types';
import GameTable from './GameTable';

export default function NFL() {
  const [schedule, setSchedule] = useState<Schedule>({
    displayDate: '',
    games: [],
  });

  useEffect(() => {
    fetchNFLDataAsync().then(schedule => setSchedule(schedule));
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
  if (!schedule.games) return(<p>Error...</p>)
  return (
    <Card
      title={
        <span>
          <span className="font-weight-bold">NFL</span>
          <span className="pl-2 font-weight-light font-italic text-lowercase text-muted">{schedule.displayDate}</span>
        </span>
      }
    >
      <GameTable games={schedule.games} removeGame={removeGame} />
    </Card>
  );
}
