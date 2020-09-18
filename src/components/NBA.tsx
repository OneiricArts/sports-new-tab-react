import React, { useEffect, useReducer } from 'react';
import { Card } from '../simpleui';
import getNBAData from '../SportsDataAccessors/nba/getNBAData';
import { NBADataI } from '../SportsDataAccessors/nba/NbaDatatypes';
import createScheduleReducer from './createScheduleReducer';
import GameTableNba from './GameTableNba';

const initFromCache = (init: NBADataI): NBADataI => {
  try {
    const data = localStorage.getItem('NBA_DATA_v1');
    if (!data) return init;

    const json = JSON.parse(data) as NBADataI;
    if (json.displayDate && json.games) return json;

    return init;
  } catch {
    return init;
  }
};

const NBA = () => {
  useEffect(() => {
    getNBAData().then(data =>
      nbaScheduleDispatch({ type: 'SET_NEW', newState: data })
    );
  }, []);

  const [nbaSchedule, nbaScheduleDispatch] = useReducer(
    createScheduleReducer<NBADataI>('NBA_DATA_v1'),
    {
      displayDate: ''
    },
    initFromCache
  );

  return (
    <Card
      title={
        <span>
          <span className="font-weight-bold">NBA</span>
          <span className="pl-2 font-weight-light font-italic text-lowercase text-muted">
            {nbaSchedule.displayDate}
          </span>
        </span>
      }
    >
      {nbaSchedule.games && <GameTableNba games={nbaSchedule.games} />}
    </Card>
  );
};

export default NBA;
