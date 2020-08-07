import * as React from 'react';
import { Table } from 'reactstrap';
import { Game } from '../SportsDataAccessors/types';

const GameRow = ({ game }: { game: Game }) => {
  return (
    <tr>
      <td className="align-middle">{game.status}</td>

      <td
        className={`align-middle ${game.awayTeamWinning ? 'winning_team' : ''}`}
      >
        {game.awayTeam}
      </td>

      <td
        className={`align-middle ${game.homeTeamWinning ? 'winning_team' : ''}`}
      >
        {game.homeTeam}
      </td>

      <td className="align-middle text-right">{game.awayTeamScore}</td>
      <td className="align-middle text-right">{game.homeTeamScore}</td>
    </tr>
  );
};

const TableHeader = () => (
  <thead>
    <tr>
      <th />
      {/* status */}
      <th>away</th>
      <th>@home</th>
      <th className="text-right">a</th>
      <th className="text-right">h</th>
    </tr>
  </thead>
);

const GameTable = ({ games }: { games: Game[] }) => (
  <Table responsive size="sm">
    <TableHeader />
    <tbody>
      {games
        .filter(game => !game.hidden)
        .map((game, index) => (
          <GameRow key={index} game={game} />
        ))}
    </tbody>
  </Table>
);

export default GameTable;
