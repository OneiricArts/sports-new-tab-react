import * as React from 'react';
import { Button, Table } from 'reactstrap';
import { NFLGame } from '../SportsDataAccessors/types';

const FootballEmoji = () =>
  <span role="img" aria-label="has posession" className="d-none d-md-inline d-lg-inline">
    &nbsp;🏈
  </span>;

const GameRow = ({ game, removeGame }: { game: NFLGame, removeGame: (id: number) => void }) => {
  const handleClick = () => removeGame(game.id);

  return (
    <tr>
      <td className="align-middle">{game.status}</td>

      <td className={`align-middle ${game.awayTeamWinning ? 'winning_team' : ''} ${game.awayTeamHasPosession ? 'has_posession' : ''}`}>
        {game.awayTeam}
        {true && <FootballEmoji />}
      </td>

      <td className={`align-middle ${game.homeTeamWinning && 'winning_team'} ${game.homeTeamHasPosession ? 'has_posession' : ''}`}>
        {game.homeTeam}
        {game.homeTeamHasPosession && <FootballEmoji />}
      </td>

      <td className="align-middle text-right">{game.awayTeamScore}</td>
      <td className="align-middle text-right">{game.homeTeamScore}</td>

      <td className="align-middle text-right">
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
      <th className="text-right">a</th>
      <th className="text-right">h</th>
      <th className="text-right"/>{/* X */}
    </tr>
  </thead>
);

const GameTable = ({ games, removeGame }: { games: NFLGame[], removeGame: (id: number) => void }) => (
  <Table responsive size="sm">
    <TableHeader />
    <tbody>
      {
        games
          .filter(game => !game.hidden)
          .map((game, index) => <GameRow key={index} game={game} removeGame={removeGame} />)
      }
    </tbody>
  </Table>
);

export default GameTable;
