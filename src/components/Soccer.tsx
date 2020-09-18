import React, { useEffect, useReducer, Fragment } from 'react';
import { Card } from '../simpleui';
import GameTableNba from './GameTableNba';
import getChampionsLeagueData, {
  ChampionsLeagueScoreboardI
} from '../SportsDataAccessors/soccer/getChampionsLeagueData';
import createScheduleReducer from './createScheduleReducer';
import { CardHeader, Table } from 'reactstrap';

const initFromCache = (
  init: ChampionsLeagueScoreboardI
): ChampionsLeagueScoreboardI => {
  try {
    const data = localStorage.getItem('SOCCER_DATA_v1');
    if (!data) return init;

    const json = JSON.parse(data) as ChampionsLeagueScoreboardI;
    if (Object.keys(json).length > 1) return json;

    return init;
  } catch {
    return init;
  }
};

const Soccer = () => {
  useEffect(() => {
    getChampionsLeagueData().then(data =>
      scheduleDispatch({ type: 'SET_NEW', newState: data })
    );
  }, []);

  const [schedule, scheduleDispatch] = useReducer(
    createScheduleReducer<ChampionsLeagueScoreboardI>('SOCCER_DATA_v1'),
    {},
    initFromCache
  );

  return (
    <Card title={<span className="font-weight-bold">Champions League</span>}>
      <Table responsive size="sm">
        {Object.entries(schedule)
          .sort()
          .slice(0, 3)
          .map(([displayDate, games]) => (
            <Fragment key={displayDate}>
              <CardHeader className="border-top">
                <span className="font-weight-light text-muted">
                  {displayDate}
                </span>
              </CardHeader>
              <GameTableNba games={games} />
            </Fragment>
          ))}

        {Object.entries(schedule).length === 0 && <div>No Games</div>}
      </Table>
    </Card>
  );
};

export default Soccer;
