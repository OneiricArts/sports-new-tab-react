import React, { useEffect, useState, Fragment } from 'react';
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
    <Fragment>
      <h1>NFL</h1>
      <h3>Week {schedule.displayDate}</h3>
      <GameTable games={schedule.games} removeGame={removeGame} />
    </Fragment>
  );
}
