import * as React from 'react';
import { Table } from 'reactstrap';
import { Game, Schedule } from '../SportsDataAccessors/types';

const removeGame = () => {
  console.log('test');
};

const GameRow = ({ game, handlers }: {game:Game, handlers: any}) => (
  <tr>
    {console.log(game)}

    <td>{game.clock}</td>

    <td className={game.awayTeamWinning ? 'winning_team' : ''}>
      {game.awayTeam}
    </td>

    <td className={game.homeTeamWinning ? 'winning_team' : ''}>
      { game.awayTeam &&
        <span> 🏈  &nbsp;</span>
      }
      {game.homeTeam}
    </td>

    <td>{game.awayTeamScore}</td>
    <td>{game.homeTeamScore}</td>

    <td onClick={handlers.removeGame}> X </td>
  </tr>
);

const TableHeader = () => (
  <thead>
    <tr>
      <th>time</th>
      <th>away</th>
      <th>@home</th>
      <th>score</th>
      <th>score</th>
      <th> X </th>
    </tr>
  </thead>
);

const GameTable = ({games, handlers}: {games:Game[], handlers: Object}) => (
  <Table>
    <TableHeader />
    <tbody>
    {games.map((game, index: number) => <GameRow key={index} game={game} handlers={handlers}/>)}
  </tbody>
  </Table>
);

export default GameTable;
