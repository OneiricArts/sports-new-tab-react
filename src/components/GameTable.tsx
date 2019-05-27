import * as React from 'react';
import { Button, Table } from 'reactstrap';
import { Game } from '../SportsDataAccessors/types';

const GameRow = ({ game, removeGame }: { game: Game, removeGame: (id: number) => void }) => {
  const handleClick = () => removeGame(game.id);

  return (
    <tr>
      <td>{game.status}</td>

      <td className={game.awayTeamWinning ? 'winning_team' : ''}>
        {game.awayTeam}
      </td>

      <td className={game.homeTeamWinning ? 'winning_team' : ''}>
        {game.homeTeam}
      </td>

      <td>{game.awayTeamScore}</td>
      <td>{game.homeTeamScore}</td>

      <td>
        <Button outline={true} color="secondary" size="sm" onClick={handleClick}>&#9587;</Button>
      </td>
    </tr>
  );
}

const TableHeader = () => (
  <thead>
    <tr>
      <th/>{/* status */}
      <th>away</th>
      <th>@home</th>
      <th>a</th>
      <th>h</th>
      <th/>{/* X */}
    </tr>
  </thead>
);

const GameTable = ({ games, removeGame }: { games: Game[], removeGame: (id: number) => void }) => (
  <Table>
    <TableHeader />
    <tbody>
      {games
        .filter(game => !game.hidden)
        .map((game, index) => <GameRow key={index} game={game} removeGame={removeGame} />)}
    </tbody>
  </Table>
);

export default GameTable;
