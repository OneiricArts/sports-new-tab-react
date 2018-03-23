import * as React from 'react';
import { Table } from 'reactstrap';

const removeGame = () => {
  console.log('test');
};

const GameRow = ({ game, handlers }: any) => (
  <tr>
    {console.log(game)}
    {/* clock */}
    <td>{game.clock}</td>
    {/* away team name */}
    <td className={game.awayTeamWinning ? 'winning_team' : ''}>
      {game.awayTeam}
    </td>

    {/* home team name */}
    <td className={game.homeTeamWinning ? 'winning_team' : ''}>
      { game.awayTeam &&
        <span> 🏈  &nbsp;</span>
      }
      {game.homeTeam}
    </td>

    {/* scores */}
    <td>{game.awayTeamScore}</td>
    <td>{game.homeTeamScore}</td>

    {/* remove game */}
    <td onClick={handlers.removeGame}> X </td>
  </tr>
);

const GameTable = ({games, handlers}: any) => (
  <Table>
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
    <tbody>
    {games.map((game: any, index: number) => <GameRow key={index} game={game.cnt} handlers={handlers}/>)}
  </tbody>
  </Table>
);

export default GameTable;
