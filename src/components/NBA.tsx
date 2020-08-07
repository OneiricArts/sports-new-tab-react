import React, { useEffect, useReducer } from 'react';
import { Card } from '../simpleui';
import getNBAData from '../SportsDataAccessors/nba/getNBAData';
import { NBADataI } from '../SportsDataAccessors/nba/NbaDatatypes';
import GameTableNba from './GameTableNba';

type nbaScheduleActionI = { type: 'SET_NEW'; newState: NBADataI };

type nbaScheduleReducerI = (
  prevState: NBADataI,
  action: nbaScheduleActionI
) => NBADataI;

const nbaScheduleReducer: nbaScheduleReducerI = (prevState, action) => {
  let newState: NBADataI;

  switch (action.type) {
    case 'SET_NEW':
      newState = { ...action.newState };
      break;

    default:
      newState = { ...prevState };
  }

  localStorage.setItem('NBA_DATA_v1', JSON.stringify(newState));
  return newState;
};

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
    nbaScheduleReducer,
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
      {nbaSchedule.games && (
        <GameTableNba
          games={nbaSchedule.games.map(g => {
            let time: string;
            if (g.status.type === 'UTC_TIME') {
              const date = new Date(g.status.value);
              const timeString = date.toLocaleTimeString();

              const [h, m] = timeString.split(' ')[0].split(':');
              time = `${h}:${m}`;
            } else {
              time = g.status.value;
            }

            return { ...g, status: time };
          })}
        />
      )}
    </Card>
  );
};

export default NBA;
