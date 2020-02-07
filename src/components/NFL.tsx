import React, { useState } from 'react';
import { Button, Progress, Spinner } from 'reactstrap';
import useVisibilityHandlers from '../hooks/useVisibilityHandlers';
import { Card } from '../simpleui';
import GameTable from './GameTable';
import useFetchSchedule from '../hooks/useFetchSchedule';
import { fetchNFLDataAsync } from '../SportsDataAccessors/NFLHelper';
import useUserPreferences, { UserDataI } from '../hooks/useUserPreferences';

interface NflUserDataI extends UserDataI { };
const userPreferencesDefault: NflUserDataI = { removedGames: { date: '', games: {} } };

export default function NFL() {
  const LOCAL_STORAGE_KEY = 'nfl-schedule-data';
  const USER_DATA_LOCAL_STORAGE_KEY = 'nfl-user-data';

  const [userData, removeGame, resetUserRemovedGames] = useUserPreferences<NflUserDataI>(
    USER_DATA_LOCAL_STORAGE_KEY,
    userPreferencesDefault
  );

  const [resetCounter, setResetCounter] = useState<number>(0);

  const [onVisibleCtr] = useVisibilityHandlers();

  const [schedule, isLoading, resetScheduleCache] = useFetchSchedule(
    LOCAL_STORAGE_KEY,
    fetchNFLDataAsync,
    resetCounter + onVisibleCtr
  );

  const resetSchedule = () => {
    console.log('>>> reseting');
    resetScheduleCache();
    resetUserRemovedGames();
    setResetCounter(resetCounter + 1);
  }

  const removeGameClick = (id: number) => removeGame(id, schedule);

  /// TODO Change && why is ...games?.[game.id] not suppored in current cra??
  schedule.games.forEach(game => game.hidden = false);
  if (schedule.displayDate === userData.removedGames.date) {
    schedule.games.forEach(game => {
      if (userData.removedGames.games && userData.removedGames.games[game.id]) game.hidden = true;
    });
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
            style={{ width: '50px' }}
          >
            {isLoading ? <Spinner size="sm" color="primary" type="grow" /> : 'Reset'}
          </Button>
        </span>
      }
    >
      {isLoading && <Progress animated style={{ height: '5px' }} color="info" value={100} />}

      <GameTable games={schedule.games} removeGame={removeGameClick} />
    </Card>
  );
}
