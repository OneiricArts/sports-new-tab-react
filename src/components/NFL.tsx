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

  const upDateSchedule = async () => {
    try {
      const schedule = await fetchNFLDataAsync(undefined);
      setSchedule(schedule);
    } catch {}
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
      <GameTable games={schedule.games} removeGame={removeGame} />
    </Card>
  );
}
